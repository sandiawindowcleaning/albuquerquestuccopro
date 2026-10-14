import { BUSINESS, SITE_URL } from '../config/business';
import { HERO_IMAGE, OG_IMAGE } from '../config/images';
import { largestJpg, srcSet, HERO_SIZES } from './images';

export interface HeadData {
  path: string;
  title: string;
  description: string;
  jsonLd: object[];
  /** Absolute or root-relative image for og:image. Defaults to the brand card. */
  ogImage?: string;
  noindex?: boolean;
  /** Preload the home hero image (only on pages that show it above the fold). */
  preloadHero?: boolean;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "<" inside JSON-LD would let a string close the <script> tag early.
const safeJson = (o: object) => JSON.stringify(o).replace(/</g, '\\u003c');

export const canonicalUrl = (path: string) => `${SITE_URL}${path}`;

function ogImageUrl(h: HeadData) {
  const img = h.ogImage ?? largestJpg(OG_IMAGE.file);
  return img.startsWith('http') ? img : `${SITE_URL}${img}`;
}

/** Head tags for the prerendered HTML. Called by scripts/prerender.mjs. */
export function renderHeadTags(h: HeadData): string {
  const url = canonicalUrl(h.path);
  const image = ogImageUrl(h);
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    h.noindex ? `<meta name="robots" content="noindex, follow" />` : '',
    h.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    h.preloadHero
      ? `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesrcset="${srcSet(HERO_IMAGE.file, 'avif')}" imagesizes="${HERO_SIZES}" />`
      : '',
    ...h.jsonLd.map((o) => `<script type="application/ld+json">${safeJson(o)}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** Keeps title/description/canonical/OG in sync on client-side navigation. */
export function applyHead(h: HeadData) {
  document.title = h.title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  const url = canonicalUrl(h.path);
  set('meta[name="description"]', 'content', h.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', h.title);
  set('meta[property="og:description"]', 'content', h.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', h.title);
  set('meta[name="twitter:description"]', 'content', h.description);
}
