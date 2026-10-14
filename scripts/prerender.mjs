// Build-time static rendering. Runs after `vite build` (client) and
// `vite build --ssr` (server bundle). For every route in src/routes.tsx it
// writes dist/<path>/index.html with:
//   - the route's full <head>: title, description, canonical, OG/Twitter,
//     JSON-LD, hero image preload (from src/lib/head.ts)
//   - font preloads
//   - the real server-rendered page markup inside <div id="root">
// The browser then HYDRATES that markup (src/main.tsx), so the page is
// visible before any JavaScript runs.
//
// Also writes dist/404.html, dist/sitemap.xml and dist/robots.txt.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr/entry-server.js');

for (const f of [path.join(DIST, 'index.html'), SSR]) {
  if (!existsSync(f)) {
    console.error(`[prerender] missing ${path.relative(ROOT, f)}. Run the client and SSR builds first.`);
    process.exit(1);
  }
}

const { render, routes, notFound, SITE_URL } = await import(pathToFileURL(SSR).href);

// The home page overwrites dist/index.html, so keep a pristine copy of Vite's
// template in dist-ssr/ (not deployed). That makes this script safe to re-run.
const TEMPLATE_COPY = path.join(ROOT, 'dist-ssr/template.html');
const hasMarkers = (h) => h.includes('<!--app-head-->') && h.includes('<!--app-html-->');
let template = readFileSync(path.join(DIST, 'index.html'), 'utf-8');
if (hasMarkers(template)) writeFileSync(TEMPLATE_COPY, template);
else if (existsSync(TEMPLATE_COPY)) template = readFileSync(TEMPLATE_COPY, 'utf-8');
if (!hasMarkers(template)) {
  console.error('[prerender] no template with <!--app-head--> and <!--app-html--> markers. Run `vite build` first.');
  process.exit(1);
}

// Inline the stylesheet. It's ~7 KB gzipped, and a separate render-blocking
// request cost more on mobile than the bytes saved by caching it.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_tag, href) => {
  const css = readFileSync(path.join(DIST, href), 'utf-8');
  return `<style>${css}</style>`;
});
if (!template.includes('<style>')) console.warn('[prerender] stylesheet was not inlined');

// Load the app bundle AFTER the page has painted. Every page is complete
// HTML before any JS runs (links, FAQ accordions and tel: links all work,
// and call tracking is inline in index.html), so the bundle only adds
// interactivity: the mobile menu and the quote wizard. Loading it after the
// `load` event (and after the next paint) keeps it from competing with the hero image and heading font
// on a phone connection, which is what keeps mobile LCP low.
{
  const entry = template.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
  if (!entry) {
    console.error('[prerender] could not find the module entry script in index.html');
    process.exit(1);
  }
  const preloads = [...template.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)].map((m) => m[1]);
  template = template.replace(entry[0], '').replace(/\s*<link rel="modulepreload" crossorigin href="[^"]+">/g, '');
  const loader = `<script>
      (function () {
        function boot() {
          ${JSON.stringify(preloads)}.forEach(function (href) {
            var l = document.createElement('link'); l.rel = 'modulepreload'; l.href = href; l.crossOrigin = ''; document.head.appendChild(l);
          });
          var s = document.createElement('script'); s.type = 'module'; s.src = ${JSON.stringify(entry[1])}; s.crossOrigin = ''; document.head.appendChild(s);
        }
        // After load, after the hero image (if any) has decoded, and after two
        // more frames, so the bundle never competes with the LCP paint. The
        // timer is a fallback for background tabs, where frames don't run.
        var started = false;
        function go() { if (!started) { started = true; boot(); } }
        function afterPaint() {
          var hero = document.querySelector('img[fetchpriority="high"]');
          var ready = hero && hero.decode ? hero.decode().catch(function () {}) : Promise.resolve();
          ready.then(function () {
            requestAnimationFrame(function () { requestAnimationFrame(function () { setTimeout(go, 0); }); });
          });
          setTimeout(go, 2500);
        }
        if (document.readyState === 'complete') afterPaint(); else addEventListener('load', afterPaint);
      })();
    </script>`;
  template = template.replace('</body>', `  ${loader}\n  </body>`);
}

// Preload only the heading font (used by every H1). Body text uses Inter with
// font-display: swap, so it paints immediately in the fallback font and the
// hero image doesn't have to share bandwidth with a second font.
const assets = readdirSync(path.join(DIST, 'assets'));
const fontPreloads = [/^fraunces-latin-600-normal.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`);
if (!fontPreloads.length) console.warn('[prerender] heading font file not found for preload');

function page(head, urlPath) {
  return template
    .replace('<!--app-head-->', [head, ...fontPreloads].join('\n    '))
    .replace('<!--app-html-->', render(urlPath));
}

// Per-page "last modified" dates for sitemap.xml. Each route's rendered
// content (head tags + page markup) is fingerprinted; the date only moves when
// that page's content actually changes, not on every build. The record lives
// in src/generated/lastmod.json and is committed, so build locally before
// committing to keep it current. (On Netlify, a page whose fingerprint is new
// simply gets that day's date.)
const LASTMOD_FILE = path.join(ROOT, 'src/generated/lastmod.json');
const today = new Date().toISOString().slice(0, 10);
const prevLastmod = existsSync(LASTMOD_FILE) ? JSON.parse(readFileSync(LASTMOD_FILE, 'utf-8')) : {};
const lastmod = {};

let count = 0;
for (const r of routes) {
  const outDir = r.path === '/' ? DIST : path.join(DIST, r.path);
  mkdirSync(outDir, { recursive: true });
  const appHtml = render(r.path);
  writeFileSync(
    path.join(outDir, 'index.html'),
    template
      .replace('<!--app-head-->', [r.head, ...fontPreloads].join('\n    '))
      .replace('<!--app-html-->', appHtml),
  );
  const hash = createHash('sha1').update(r.head).update(appHtml).digest('hex').slice(0, 12);
  const prev = prevLastmod[r.path];
  lastmod[r.path] = prev && prev.hash === hash ? prev : { hash, date: today };
  count += 1;
}
const lastmodJson = `${JSON.stringify(lastmod, null, 2)}\n`;
if (!existsSync(LASTMOD_FILE) || readFileSync(LASTMOD_FILE, 'utf-8') !== lastmodJson) {
  writeFileSync(LASTMOD_FILE, lastmodJson);
}

// 404: any unmatched URL renders NotFoundPage. Netlify serves this file with a
// real 404 status via the catch-all in public/_redirects.
writeFileSync(path.join(DIST, '404.html'), page(notFound.head, '/__not-found__/'));

// sitemap.xml: every indexable route, canonical (trailing-slash) URLs only.
// noindex routes (e.g. a placeholder-only gallery) are left out.
const indexable = routes.filter((r) => !r.noindex);
const urls = indexable
  .map((r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastmod[r.path].date}</lastmod>
    <changefreq>${r.sitemap.changefreq}</changefreq>
    <priority>${r.sitemap.priority}</priority>
  </url>`)
  .join('\n');
writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(`[prerender] ${count} routes + 404.html, sitemap.xml (${indexable.length} URLs), robots.txt`);
