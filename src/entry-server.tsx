import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { NOT_FOUND, PAGES } from './routes';
import { renderHeadTags } from './lib/head';
import { SITE_URL, BUSINESS } from './config/business';
import { TRACKING } from './config/tracking';
import { FORM_ENDPOINT, PHOTO_UPLOAD_ENABLED } from './lib/submitLead';
import { GALLERY, HERO_IMAGE } from './config/images';
import { REVIEWS, TRUST_BADGES } from './config/reviews';

// Build-time only. scripts/prerender.mjs imports this bundle to render every
// route to static HTML; scripts/verify.mjs imports it to get the route list.

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </StrictMode>,
  );
}

export const routes = PAGES.map((p) => ({
  path: p.path,
  title: p.title,
  description: p.description,
  noindex: !!p.noindex,
  sitemap: p.sitemap,
  head: renderHeadTags(p),
}));

export const notFound = { path: NOT_FOUND.path, head: renderHeadTags(NOT_FOUND) };

export { SITE_URL, FORM_ENDPOINT };

/** Every config value still holding a placeholder, for verify.mjs warnings. */
export const placeholderReport = {
  values: {
    business: BUSINESS,
    tracking: TRACKING,
    leads: { FORM_ENDPOINT },
  },
  notes: [
    !BUSINESS.hours.confirmed && 'Hours not confirmed (business.ts hours.confirmed = false): hidden from site and schema',
    !BUSINESS.geo && 'No geo coordinates (business.ts geo = null): omitted from schema',
    Object.values(BUSINESS.social).every((v) => !v) && 'No social / Google Business Profile links (business.ts social)',
    HERO_IMAGE.placeholder && 'Hero image is placeholder art (config/images.ts HERO_IMAGE)',
    GALLERY.some((g) => g.placeholder) &&
      `${GALLERY.filter((g) => g.placeholder).length} of ${GALLERY.length} gallery slots are placeholders (config/images.ts)`,
    REVIEWS.length === 0 && 'No reviews yet (config/reviews.ts): reviews section hidden',
    TRUST_BADGES.length === 0 && 'No trust badges yet (config/reviews.ts): badges hidden',
    !PHOTO_UPLOAD_ENABLED && 'Quote form photo step is off (lib/submitLead.ts PHOTO_UPLOAD_ENABLED): JSON leads can’t carry files',
  ].filter(Boolean) as string[],
};
