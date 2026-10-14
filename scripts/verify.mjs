// Post-build guard. Runs at the end of `npm run build` (so Netlify refuses to
// deploy a broken build) and on its own via `npm run verify`.
//
// FAILS the build on anything that hurts SEO, tracking or honesty rules.
// WARNS (doesn't fail) about placeholders that still need real values.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr/entry-server.js');

if (!existsSync(DIST) || !existsSync(SSR)) {
  console.error('[verify] dist/ or dist-ssr/ missing. Run `npm run build` first.');
  process.exit(1);
}

const { routes, SITE_URL, FORM_ENDPOINT, placeholderReport } = await import(pathToFileURL(SSR).href);

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const one = (html, re) => html.match(re)?.[1] ?? null;
// Everything inside <div id="root">: from the opening tag to the last </div>.
const body = (html) => {
  const start = html.indexOf('<div id="root">');
  const end = html.lastIndexOf('</div>');
  return start === -1 || end < start ? '' : html.slice(start + 15, end);
};
const text = (html) => decode(body(html).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

const routePaths = new Set(routes.map((r) => r.path));
const fileFor = (p) => (p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, p, 'index.html'));
const titles = new Map();
const descs = new Map();

// Things that must never appear in what we ship (see CLAUDE.md).
const FORBIDDEN = [
  [/subcontract/i, 'mentions subcontractors'],
  [/sub-contract/i, 'mentions subcontractors'],
  [/\breferral/i, 'mentions referrals'],
  [/\bour network\b|\bnetwork of (installers|contractors|pros)/i, 'mentions an installer network'],
  [/\bpartner(s|ed|ing)?\b/i, 'mentions partners'],
  [/\b(licensing|license) (agreement|arrangement)/i, 'mentions licensing arrangements'],
  [/sandia ?window/i, 'contains Sandia Window Cleaning content or IDs'],
  [/houston|patio screen|sugar land/i, 'contains leftover Houston Patio Screens content'],
];

// ── Per-route checks ─────────────────────────────────────────────────────────
for (const r of routes) {
  const p = r.path;
  const where = p;
  if (p !== '/' && !p.endsWith('/')) fail(`${where}: route path must end with "/"`);

  const file = fileFor(p);
  if (!existsSync(file)) { fail(`${where}: not prerendered (${path.relative(ROOT, file)} missing)`); continue; }
  const html = readFileSync(file, 'utf-8');

  // Title
  const titleTags = all(html, /<title>([\s\S]*?)<\/title>/g);
  if (titleTags.length !== 1) fail(`${where}: expected 1 <title>, found ${titleTags.length}`);
  const title = titleTags[0] ? decode(titleTags[0]).trim() : '';
  if (!title) fail(`${where}: empty <title>`);
  else if (title.length > 60) fail(`${where}: title is ${title.length} chars (max 60): "${title}"`);
  if (title) (titles.get(title) ?? titles.set(title, []).get(title)).push(p);

  // Description
  const descTags = all(html, /<meta name="description" content="([^"]*)"/g);
  if (descTags.length !== 1) fail(`${where}: expected 1 meta description, found ${descTags.length}`);
  const desc = descTags[0] ? decode(descTags[0]).trim() : '';
  if (!desc) fail(`${where}: empty meta description`);
  else if (desc.length > 155) fail(`${where}: description is ${desc.length} chars (max 155)`);
  else if (desc.length < 70) warn(`${where}: short description (${desc.length} chars)`);
  if (desc) (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(p);

  // Canonical + OG. Routes deliberately marked noindex (e.g. the gallery while
  // it only has placeholders) must carry the noindex tag and no canonical.
  const canonicals = all(html, /<link rel="canonical" href="([^"]*)"/g);
  const expected = `${SITE_URL}${p}`;
  const hasNoindex = /<meta name="robots" content="noindex/.test(html);
  if (r.noindex) {
    if (!hasNoindex) fail(`${where}: route is marked noindex but the page has no robots noindex tag`);
    if (canonicals.length) fail(`${where}: noindex page must not have a canonical`);
  } else {
    if (canonicals.length !== 1) fail(`${where}: expected 1 canonical, found ${canonicals.length}`);
    else if (canonicals[0] !== expected) fail(`${where}: canonical "${canonicals[0]}" should be "${expected}"`);
    if (hasNoindex) fail(`${where}: indexable route is marked noindex`);
  }
  if (one(html, /<meta property="og:url" content="([^"]*)"/) !== expected) fail(`${where}: og:url doesn't match the page URL`);
  for (const prop of ['og:title', 'og:description', 'og:image']) {
    if (!one(html, new RegExp(`<meta property="${prop}" content="([^"]+)"`))) fail(`${where}: missing ${prop}`);
  }
  const ogImg = one(html, /<meta property="og:image" content="([^"]+)"/);
  if (ogImg && ogImg.startsWith(SITE_URL) && !existsSync(path.join(DIST, ogImg.slice(SITE_URL.length)))) {
    fail(`${where}: og:image file not found in dist: ${ogImg}`);
  }

  // Headings
  const h1s = (body(html).match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(`${where}: expected exactly 1 <h1>, found ${h1s}`);

  // Content actually rendered
  const words = text(html).split(' ').filter(Boolean).length;
  if (words < 80) fail(`${where}: only ${words} words prerendered. SSR looks broken`);

  // JSON-LD
  const blocks = all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  if (!blocks.length) fail(`${where}: no JSON-LD`);
  const types = [];
  for (const raw of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch { fail(`${where}: malformed JSON-LD`); continue; }
    if (data['@context'] !== 'https://schema.org' || !data['@type']) fail(`${where}: JSON-LD block missing @context/@type`);
    types.push(...[].concat(data['@type']));
    if (/"(aggregateRating|review|ratingValue|reviewCount)"/.test(raw)) {
      fail(`${where}: rating/review schema found. Not allowed until real reviews exist`);
    }
    if (/PLACEHOLDER|\+10000000000/.test(raw)) fail(`${where}: placeholder value leaked into JSON-LD`);
    // Every URL inside schema must be canonical form too.
    for (const u of raw.match(/https:\/\/albuquerquestuccopro\.com[^"]*/g) ?? []) {
      const pth = u.slice(SITE_URL.length) || '/';
      if (!/\.[a-z0-9]+$/i.test(pth) && !pth.includes('#') && !pth.endsWith('/')) fail(`${where}: schema URL without trailing slash: ${u}`);
    }
    if (data['@type'] === 'FAQPage') {
      const bodyText = text(html);
      for (const q of data.mainEntity ?? []) {
        if (!bodyText.includes(q.name)) fail(`${where}: FAQPage question not visible on page: "${q.name}"`);
      }
    }
  }
  if (!types.includes('HomeAndConstructionBusiness')) fail(`${where}: missing LocalBusiness/HomeAndConstructionBusiness JSON-LD`);
  if (p !== '/' && !types.includes('BreadcrumbList')) fail(`${where}: missing BreadcrumbList JSON-LD`);
  if (p.startsWith('/services/') && p !== '/services/' && !types.includes('Service')) fail(`${where}: missing Service JSON-LD`);
  if (body(html).includes('<details') && !types.includes('FAQPage')) fail(`${where}: has an FAQ block but no FAQPage JSON-LD`);

  // Internal links: trailing slash + must resolve
  for (const href of all(body(html), /<a [^>]*href="([^"]*)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (/\.[a-z0-9]+$/i.test(clean)) {
      if (!existsSync(path.join(DIST, clean))) fail(`${where}: link to missing file ${href}`);
      continue;
    }
    if (clean !== '/' && !clean.endsWith('/')) fail(`${where}: internal link without trailing slash: ${href}`);
    else if (!routePaths.has(clean)) fail(`${where}: internal link to unknown route: ${href}`);
  }

  // Honesty: no prices on the page
  if (/\$\s?\d/.test(text(html))) fail(`${where}: page text contains a dollar amount`);
}

for (const [t, ps] of titles) if (ps.length > 1) fail(`duplicate title "${t}" on ${ps.join(', ')}`);
for (const [d, ps] of descs) if (ps.length > 1) fail(`duplicate description on ${ps.join(', ')}`);

// ── Sitemap + robots ────────────────────────────────────────────────────────
const sitemapFile = path.join(DIST, 'sitemap.xml');
if (!existsSync(sitemapFile)) fail('sitemap.xml missing');
else {
  const locs = all(readFileSync(sitemapFile, 'utf-8'), /<loc>([^<]+)<\/loc>/g);
  const expected = new Set(routes.filter((r) => !r.noindex).map((r) => `${SITE_URL}${r.path}`));
  for (const l of locs) {
    if (!l.endsWith('/')) fail(`sitemap: URL without trailing slash: ${l}`);
    if (!expected.has(l)) fail(`sitemap: URL is not an indexable route canonical: ${l}`);
  }
  for (const e of expected) if (!locs.includes(e)) fail(`sitemap: missing ${e}`);
  if (new Set(locs).size !== locs.length) fail('sitemap: duplicate URLs');
}
const robotsFile = path.join(DIST, 'robots.txt');
if (!existsSync(robotsFile)) fail('robots.txt missing');
else if (!readFileSync(robotsFile, 'utf-8').includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail('robots.txt: no Sitemap line');

// ── 404, redirects, forms ───────────────────────────────────────────────────
const nf = path.join(DIST, '404.html');
if (!existsSync(nf)) fail('404.html missing');
else {
  const html = readFileSync(nf, 'utf-8');
  if (!/<meta name="robots" content="noindex/.test(html)) fail('404.html: missing noindex');
  if (/<link rel="canonical"/.test(html)) fail('404.html: must not have a canonical');
  if ((body(html).match(/<h1[\s>]/g) ?? []).length !== 1) fail('404.html: expected exactly 1 <h1>');
}
const redirects = path.join(DIST, '_redirects');
if (!existsSync(redirects)) fail('_redirects missing from dist');
else {
  const r = readFileSync(redirects, 'utf-8');
  if (!/^\/\*\s+\/404\.html\s+404/m.test(r)) fail('_redirects: missing 404 catch-all');
  if (!new RegExp(`^https://[a-z0-9-]+\\.netlify\\.app/\\*\\s+${SITE_URL.replace(/\./g, '\\.')}/:splat\\s+301!`, 'm').test(r)) {
    fail('_redirects: missing 301 from the *.netlify.app URL to the custom domain');
  }
}

// Leads go to Formspree (src/lib/submitLead.ts). Make sure the endpoint and
// the field names the inbox depends on actually made it into the bundle.
{
  const js = readdirSync(path.join(DIST, 'assets')).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(path.join(DIST, 'assets', f), 'utf-8')).join('\n');
  if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(FORM_ENDPOINT)) fail(`form endpoint is not a Formspree form URL: ${FORM_ENDPOINT}`);
  if (!js.includes(FORM_ENDPOINT)) fail('form endpoint missing from the client bundle');
  for (const key of ['_subject', 'form_source', 'page_url', '_gotcha', 'service_type', 'preferred_contact']) {
    if (!js.includes(key)) fail(`lead field "${key}" missing from the client bundle`);
  }
}

// ── Tracking snippet sanity ─────────────────────────────────────────────────
const home = readFileSync(fileFor('/'), 'utf-8');
if (!home.includes('function gtag(){dataLayer.push(arguments);}')) fail('index.html: gtag stub missing or malformed');
const gtagIdx = home.indexOf('function gtag(');
const bootIdx = home.indexOf('function boot()');
if (gtagIdx === -1 || bootIdx === -1 || gtagIdx > bootIdx) fail('index.html: gtag must be defined before the app bundle loader');
if (/<script type="module"/.test(home)) fail('index.html: app bundle should be loaded by the deferred loader, not a <script type="module"> tag');
if (!/closest\('a\[href\^="tel:"\]'\)/.test(home)) fail('index.html: inline tel: click tracking missing');
if (!/<link rel="preload" as="image"[^>]+fetchpriority="high"/.test(home)) fail('home: hero image preload missing');

// ── Forbidden content in everything we ship (HTML + JS) ─────────────────────
const shipped = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (/\.(html|js|txt|xml)$/.test(e.name)) shipped.push(full);
  }
};
walk(DIST);
for (const file of shipped) {
  const content = readFileSync(file, 'utf-8');
  for (const [re, why] of FORBIDDEN) {
    const m = content.match(re);
    if (m) fail(`${path.relative(DIST, file)}: ${why} ("${m[0]}")`);
  }
}

// ── Placeholders (warnings) ─────────────────────────────────────────────────
const isPh = (v) => typeof v === 'string' && (v.includes('PLACEHOLDER') || v === '+10000000000');
const scan = (obj, prefix) => {
  for (const [k, v] of Object.entries(obj)) {
    const key = `${prefix}.${k}`;
    if (isPh(v)) warn(`PLACEHOLDER ${key} = "${v}"`);
    else if (v && typeof v === 'object' && !Array.isArray(v)) scan(v, key);
  }
};
scan(placeholderReport.values, 'config');
for (const n of placeholderReport.notes) warn(`TODO ${n}`);

// ── Report ──────────────────────────────────────────────────────────────────
console.log(`[verify] checked ${routes.length} routes + 404, sitemap, robots, forms, tracking`);
if (warnings.length) {
  console.log(`\n[verify] ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (failures.length) {
  console.error(`\n[verify] FAILED with ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\n[verify] ✓ all checks passed');
