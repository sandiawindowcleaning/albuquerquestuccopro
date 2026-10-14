# Albuquerque Stucco: albuquerquestuccopro.com

Lead-generation site for a stucco repair, color coat and re-stucco company
based in Albuquerque, NM, serving the metro, Sandoval and Valencia counties
and the East Mountains. Cloned from houstonpatioscreens.com (same
architecture, rewritten content and brand).

## Rules that always apply

1. **Never mention subcontractors, partners, referrals, an installer network
   or licensing arrangements** anywhere: copy, schema, meta tags, code
   comments, alt text. The site presents Albuquerque Stucco as the company
   doing the work. `scripts/verify.mjs` fails the build if shipped files
   contain those words.
2. **Honesty in copy.** No fake reviews, testimonials, ratings, review counts,
   years in business, license numbers, awards or project counts. No prices or
   price ranges. No warranty terms unless the owner confirms them (see
   `WARRANTY` in `src/config/business.ts`). No financing claims (see
   `FEATURES.financing`). Don't invent local neighborhoods, landmarks or stats.
3. **No `aggregateRating` / `review` schema** until real reviews exist. Verify
   fails the build if it appears. The hook is a comment in `src/lib/schema.ts`.
4. **Trailing slashes everywhere.** Every route, canonical, sitemap URL and
   internal link ends in `/` (home is `/`). Use the helpers in
   `src/lib/paths.ts`. Verify enforces it.
5. **You (Claude) cannot push to GitHub.** The owner commits and pushes with
   GitHub Desktop. Netlify auto-deploys from GitHub on every push to `main`.
   Don't run `git push`, and don't commit unless asked.

## Domain

- Canonical host: `https://albuquerquestuccopro.com` (non-www). Set once in
  `SITE_URL` (`src/config/business.ts`); canonicals, og:url, JSON-LD, sitemap
  and robots.txt all derive from it.
- Netlify site name: `albuquerquestuccopro` (`albuquerquestuccopro.netlify.app`).
  `public/_redirects` 301s that URL and `www` to the bare domain. If the
  site is ever renamed, update those lines (verify checks they exist).
- DNS is at GoDaddy (external DNS): A `@` → `75.2.60.5`,
  CNAME `www` → `albuquerquestuccopro.netlify.app`.

## Google Search Console

`tools/gsc-mcp/` is a local MCP server (registered in `.mcp.json`) that gives
Claude Code Search Console data: `gsc_search_analytics`, `gsc_inspect_url`,
`gsc_list_sitemaps`, `gsc_submit_sitemap`, `gsc_list_sites`. Setup and auth:
`tools/gsc-mcp/README.md`. The service-account key lives in
`~/.config/gsc-mcp/`, never in the repo. Use it to check indexing after
deploys and to find pages with impressions but low CTR.

## Stack

- React 19 + Vite 6 + TypeScript + Tailwind 3 (theme tokens in `tailwind.config.js`)
- React Router 7 (library mode), **static route imports only**, no `React.lazy`
- Build-time prerendering with real server rendering + client **hydration**
- Netlify hosting: `netlify.toml`, `public/_redirects`, `public/_headers`
- Formspree for leads (`src/lib/submitLead.ts`, endpoint `https://formspree.io/f/mqpegaqy`, subject "New Stucco ABQ Lead"), JSON via fetch

## Commands

```
npm run dev        # images + Vite dev server (client render, no prerender)
npm run build      # images → typecheck → client build → SSR build → prerender → verify
npm run verify     # re-run checks against the existing dist/
npm run preview    # serve dist/ locally
```

`npm run build` is exactly what Netlify runs. If verify fails, the deploy
fails. That's intentional.

## How the build works

1. `scripts/images.mjs`: turns originals in `src-images/` into AVIF/WebP/JPG at
   several widths with a content hash in the filename (`public/images/`,
   gitignored), and writes `src/generated/image-meta.json` (committed).
2. `vite build`: client bundle.
3. `vite build --ssr src/entry-server.tsx`: server bundle in `dist-ssr/`.
4. `scripts/prerender.mjs`: for every route in `src/routes.tsx`, renders the
   real component tree to HTML and writes `dist/<path>/index.html` with its own
   title, description, canonical, OG/Twitter tags and JSON-LD. Also writes
   `404.html`, `sitemap.xml` and `robots.txt`. Sitemap `<lastmod>` comes from
   `src/generated/lastmod.json` (committed): a per-page content fingerprint, so
   a page's date only changes when its content does. It inlines the CSS, preloads the
   heading font and hero image, and loads the JS bundle only after the page
   has painted. The page is complete HTML before any JS runs.
5. `scripts/verify.mjs`: fails on a missing or too-long title (60 max) or
   description (155 max), wrong canonical, not exactly one H1, invalid or
   missing JSON-LD (LocalBusiness everywhere, BreadcrumbList on every non-home
   page, Service on service pages, FAQPage wherever an FAQ block renders and
   only with visible questions), rating schema, internal links without a
   trailing slash or to unknown routes, sitemap/route mismatches, dollar
   amounts in page text, forbidden words, a missing 404/redirect/forms file,
   or a broken tracking snippet. It **warns** about every unfilled placeholder.

### Why hydration works here (and didn't on Sandia)

Sandia uses `createRoot`, which throws away the prerendered HTML and rebuilds
the page, because its lazy-loaded routes suspended during hydration. This site
imports every route statically, so `hydrateRoot` attaches to the existing
markup (`src/main.tsx`). **Don't add `React.lazy` routes**, and don't render
anything that differs between server and browser on first render (dates,
`window` checks, random values). Use `useEffect` for browser-only work.

## File layout

```
src/
  config/
    business.ts     ← NAP, hours, socials, feature flags. ALL business placeholders
    tracking.ts     ← GA4, Meta Pixel, Google Ads IDs/labels
    images.ts       ← hero, OG and gallery image slots
    reviews.ts      ← real reviews / trust badges / owner story (empty = hidden)
  data/
    services.ts     ← 6 service pages (copy, FAQs, related links)
    areas.ts        ← 12 city pages (unique copy each)
    faqs.ts         ← FAQ page + subsets for home and how-it-works
    content.ts      ← home benefits, process steps, trust row
  lib/
    schema.ts       ← JSON-LD builders
    head.ts         ← <head> tags (prerender) + client-side head updates
    paths.ts        ← URL helpers (trailing slash)
    analytics.ts    ← conversion events (quote/contact submit, FB page views)
    submitLead.ts   ← THE lead handler: Formspree (field names, endpoint, photo flag)
    images.ts, validation.ts, ui.ts
  components/       ← Header, Footer, MobileCallBar, CtaBand, QuoteWizard, …
  pages/            ← one component per page type
  routes.tsx        ← THE route table (titles, descriptions, schema per page)
  entry-server.tsx  ← SSR entry used by prerender/verify
  main.tsx          ← browser entry (hydrateRoot)
scripts/            ← images.mjs, prerender.mjs, verify.mjs
src-images/         ← original photos (replace placeholders here)
public/             ← _redirects, _headers, icons, manifest, logo.svg
```

## Common tasks

- **Add a page:** add a component in `src/pages/`, then an entry in `PAGES`
  in `src/routes.tsx` (path with trailing slash, unique title ≤60 chars,
  description ≤155). Sitemap, prerender and verify pick it up automatically.
- **Add a city:** add an object to `AREAS` in `src/data/areas.ts` with genuinely
  local copy. Don't swap the city name into another city's text.
- **Change the logo:** edit the mark in `scripts/brand.mjs` and
  `src/components/Logo.tsx` (same geometry), then `npm run brand` to
  regenerate the favicon, app icons, `public/logo.svg` and the social card.
- **Swap a photo:** drop the file in `src-images/` with the slot's name, set
  `placeholder: false` and a real `alt` in `src/config/images.ts`.
- **Leads:** both forms (quote wizard, contact) call `submitLead()` in
  `src/lib/submitLead.ts`, which POSTs JSON to Formspree with `_subject`,
  `form_source`, `page_url` and the `_gotcha` honeypot. Conversion events fire
  only after Formspree returns OK. The quote form's photo step is off
  (`PHOTO_UPLOAD_ENABLED`) because JSON can't carry files. To send leads to a
  CRM later, change `FORM_ENDPOINT` or add a second request in `submitLead()`.
- **Tracking:** fill in `src/config/tracking.ts`. The tags are written into
  `index.html` at build time by `vite.config.ts`, including the inline
  click-to-call conversion listener. Quote/contact conversions fire from
  `src/lib/analytics.ts` after a successful submit.

## Design tokens ("New Mexico")

New Mexico colors. sand-50 `#FBF6EE` page · sand-100 `#F4E9DA` alt sections ·
stone-300 `#DCCBB5` borders · ink `#2A2522` text · chile-700 `#9B1C24`
primary (links, buttons, icons) · chile-900 `#5A1018` dark bands and footer ·
turquoise-600 `#0B7A75` quote buttons · turquoise-700 `#075E5A` small accent
text · sun-400 `#F2B31B` highlights on dark backgrounds only (it fails
contrast on light ones). The logo is a plain radial sun over the Sandias;
don't swap in the Zia symbol, which is sacred to Zia Pueblo. Fonts: Fraunces 600 (headings), Inter variable (body), both
self-hosted via @fontsource. Mobile-first; most traffic is phones.

## Photos

Four real project photos live in `src-images/` (`photo-*.webp`) and are wired
up as `PHOTOS` in `src/config/images.ts`: hero, service pages, About, area
pages and the gallery all draw from that one object. Add new photos there.

The verify forbidden-word list blocks leftover Houston / patio-screen copy and
"Sandia Window" content. "Sandia" on its own is allowed (Sandia Mountains,
Sandia Park).
