#!/usr/bin/env node
// Google Search Console MCP server for Claude Code.
//
// Gives Claude read access to Search Console data for albuquerquestuccopro.com
// (search queries, clicks, rankings, indexing status, sitemaps) and lets it
// submit the sitemap. Runs locally over stdio; nothing is hosted anywhere.
//
// Auth (pick one, see README.md):
//   1. Service account key file  → GSC_KEY_FILE=/path/to/key.json  (recommended)
//   2. Your own Google login     → gcloud auth application-default login (ADC)
//
// Env:
//   GSC_KEY_FILE   path to a service-account JSON key (optional if using ADC)
//   GSC_SITE_URL   default property, e.g. sc-domain:albuquerquestuccopro.com
//   GSC_READONLY   "1" = read-only scope; disables sitemap submission
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GoogleAuth } from 'google-auth-library';
import { z } from 'zod';

const READONLY = process.env.GSC_READONLY === '1';
const DEFAULT_SITE = process.env.GSC_SITE_URL || 'sc-domain:albuquerquestuccopro.com';
const SCOPE = READONLY
  ? 'https://www.googleapis.com/auth/webmasters.readonly'
  : 'https://www.googleapis.com/auth/webmasters';

const auth = new GoogleAuth({
  scopes: [SCOPE],
  ...(process.env.GSC_KEY_FILE ? { keyFile: process.env.GSC_KEY_FILE } : {}),
});

const WEBMASTERS = 'https://www.googleapis.com/webmasters/v3';
const INSPECT = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';

async function api(method, url, body) {
  let client;
  try {
    client = await auth.getClient();
  } catch (e) {
    throw new Error(
      `Google auth failed: ${e.message}. Set GSC_KEY_FILE to a service-account key, ` +
        'or run `gcloud auth application-default login` (see tools/gsc-mcp/README.md).',
    );
  }
  const res = await client.request({ url, method, data: body, validateStatus: () => true });
  if (res.status >= 400) {
    const msg = res.data?.error?.message || JSON.stringify(res.data).slice(0, 500);
    const hint =
      res.status === 403
        ? ' (403: the account has no access to this property. Add it under Search Console → Settings → Users and permissions, and enable the Search Console API in its Google Cloud project.)'
        : '';
    throw new Error(`Search Console API ${res.status}: ${msg}${hint}`);
  }
  return res.data;
}

const site = (s) => encodeURIComponent(s || DEFAULT_SITE);
const isoDaysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const ok = (data) => ({ content: [{ type: 'text', text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }] });
const fail = (e) => ({ content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true });
const wrap = (fn) => async (args) => {
  try {
    return ok(await fn(args ?? {}));
  } catch (e) {
    return fail(e);
  }
};

const server = new McpServer({ name: 'google-search-console', version: '1.0.0' });

const siteUrlArg = z
  .string()
  .optional()
  .describe(`Property, e.g. "sc-domain:albuquerquestuccopro.com" or "https://albuquerquestuccopro.com/". Default: ${DEFAULT_SITE}`);

server.registerTool(
  'gsc_list_sites',
  {
    title: 'List Search Console properties',
    description: 'List every Search Console property this account can access, with its permission level.',
    annotations: { readOnlyHint: true },
  },
  wrap(async () => (await api('GET', `${WEBMASTERS}/sites`)).siteEntry ?? []),
);

const DIMENSIONS = ['query', 'page', 'country', 'device', 'date', 'searchAppearance'];
const FILTER_DIMS = ['query', 'page', 'country', 'device', 'searchAppearance'];

server.registerTool(
  'gsc_search_analytics',
  {
    title: 'Search performance',
    description:
      'Clicks, impressions, CTR and average position from Google Search, grouped by any of: query, page, country, device, date, searchAppearance. ' +
      'Data lags 2-3 days. Defaults to the last 28 days of complete data, grouped by query.',
    inputSchema: {
      siteUrl: siteUrlArg,
      startDate: z.string().optional().describe('YYYY-MM-DD. Default: 30 days ago.'),
      endDate: z.string().optional().describe('YYYY-MM-DD. Default: 3 days ago.'),
      dimensions: z.array(z.enum(DIMENSIONS)).optional().describe('Group by these. Default: ["query"].'),
      filters: z
        .array(
          z.object({
            dimension: z.enum(FILTER_DIMS),
            operator: z.enum(['contains', 'equals', 'notContains', 'notEquals', 'includingRegex', 'excludingRegex']).default('contains'),
            expression: z.string(),
          }),
        )
        .optional()
        .describe('e.g. [{dimension:"page", operator:"contains", expression:"/service-areas/rio-rancho/"}]'),
      searchType: z.enum(['web', 'image', 'video', 'news', 'discover', 'googleNews']).optional().describe('Default: web.'),
      rowLimit: z.number().int().min(1).max(25000).optional().describe('Default: 50.'),
      startRow: z.number().int().min(0).optional(),
    },
    annotations: { readOnlyHint: true },
  },
  wrap(async (a) => {
    const body = {
      startDate: a.startDate || isoDaysAgo(30),
      endDate: a.endDate || isoDaysAgo(3),
      dimensions: a.dimensions?.length ? a.dimensions : ['query'],
      type: a.searchType || 'web',
      rowLimit: a.rowLimit || 50,
      startRow: a.startRow || 0,
      ...(a.filters?.length ? { dimensionFilterGroups: [{ groupType: 'and', filters: a.filters }] } : {}),
    };
    const data = await api('POST', `${WEBMASTERS}/sites/${site(a.siteUrl)}/searchAnalytics/query`, body);
    const rows = (data.rows ?? []).map((r) => ({
      ...Object.fromEntries(body.dimensions.map((d, i) => [d, r.keys[i]])),
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Math.round(r.ctr * 10000) / 100,
      position: Math.round(r.position * 10) / 10,
    }));
    return {
      property: decodeURIComponent(site(a.siteUrl)),
      range: `${body.startDate} to ${body.endDate}`,
      groupedBy: body.dimensions,
      rowCount: rows.length,
      note: rows.length ? 'ctr is a percentage; position is the average ranking (1 = top).' : 'No data for this range yet. New sites can take days to weeks to show data.',
      rows,
    };
  }),
);

server.registerTool(
  'gsc_inspect_url',
  {
    title: 'Inspect a URL',
    description:
      "Google's index status for one URL: whether it's indexed, coverage state, last crawl, Google-selected vs declared canonical, robots/indexing allowed, mobile usability and rich results detected.",
    inputSchema: {
      url: z.string().url().describe('Full URL, e.g. https://albuquerquestuccopro.com/service-areas/rio-rancho/'),
      siteUrl: siteUrlArg,
    },
    annotations: { readOnlyHint: true },
  },
  wrap(async (a) => {
    const data = await api('POST', INSPECT, { inspectionUrl: a.url, siteUrl: a.siteUrl || DEFAULT_SITE, languageCode: 'en-US' });
    const r = data.inspectionResult ?? {};
    const idx = r.indexStatusResult ?? {};
    return {
      url: a.url,
      verdict: idx.verdict,
      coverageState: idx.coverageState,
      indexingState: idx.indexingState,
      robotsTxtState: idx.robotsTxtState,
      pageFetchState: idx.pageFetchState,
      lastCrawlTime: idx.lastCrawlTime,
      crawledAs: idx.crawledAs,
      googleCanonical: idx.googleCanonical,
      userCanonical: idx.userCanonical,
      canonicalMatches: idx.googleCanonical && idx.userCanonical ? idx.googleCanonical === idx.userCanonical : undefined,
      referringUrls: idx.referringUrls,
      sitemaps: idx.sitemap,
      mobileUsability: r.mobileUsabilityResult?.verdict,
      richResults: r.richResultsResult?.detectedItems?.map((d) => ({ type: d.richResultType, items: d.items?.length })),
      inspectionLink: r.inspectionResultLink,
    };
  }),
);

server.registerTool(
  'gsc_list_sitemaps',
  {
    title: 'List sitemaps',
    description: 'Sitemaps submitted for the property, with last download time, warnings, errors and URL counts.',
    inputSchema: { siteUrl: siteUrlArg },
    annotations: { readOnlyHint: true },
  },
  wrap(async (a) => (await api('GET', `${WEBMASTERS}/sites/${site(a.siteUrl)}/sitemaps`)).sitemap ?? []),
);

server.registerTool(
  'gsc_submit_sitemap',
  {
    title: 'Submit a sitemap',
    description: 'Submit (or resubmit) a sitemap URL to Google. Needs Full permission on the property. Disabled when GSC_READONLY=1.',
    inputSchema: {
      sitemapUrl: z.string().url().optional().describe('Default: https://albuquerquestuccopro.com/sitemap.xml'),
      siteUrl: siteUrlArg,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  wrap(async (a) => {
    if (READONLY) throw new Error('Read-only mode (GSC_READONLY=1). Sitemap submission is disabled.');
    const feed = a.sitemapUrl || 'https://albuquerquestuccopro.com/sitemap.xml';
    await api('PUT', `${WEBMASTERS}/sites/${site(a.siteUrl)}/sitemaps/${encodeURIComponent(feed)}`);
    return `Submitted ${feed}. Check status with gsc_list_sitemaps in a few minutes.`;
  }),
);

await server.connect(new StdioServerTransport());
