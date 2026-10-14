import type { ReactElement } from 'react';
import type { HeadData } from './lib/head';
import { breadcrumbNode, businessNode, faqNode, serviceNode, websiteNode, type Crumb } from './lib/schema';
import { PATHS, areaPath, servicePath } from './lib/paths';
import { SERVICES } from './data/services';
import { AREAS } from './data/areas';
import { ALL_FAQS, HOME_FAQS, PROCESS_FAQS } from './data/faqs';
import { HomePage } from './pages/HomePage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServicePage } from './pages/ServicePage';
import { AreasHubPage } from './pages/AreasHubPage';
import { AreaPage } from './pages/AreaPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { GalleryPage } from './pages/GalleryPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { hasRealPhotos } from './components/GalleryGrid';
import { GALLERY } from './config/images';

// ─────────────────────────────────────────────────────────────────────────────
// THE route table. App.tsx renders it, scripts/prerender.mjs writes one HTML
// file per entry, and the sitemap and scripts/verify.mjs read it too.
// Add a page here and everything else picks it up.
//
// Paths ALWAYS end in "/" (except "/" itself).
// Imports are static on purpose: no React.lazy, so the browser can hydrate the
// prerendered HTML without React throwing it away.
// ─────────────────────────────────────────────────────────────────────────────

export interface PageDef extends HeadData {
  crumbs: Crumb[];
  element: ReactElement;
  /** Hide the closing CTA band (the quote page already is the CTA). */
  hideCtaBand?: boolean;
  sitemap?: { changefreq: string; priority: string };
}

function page(def: Omit<PageDef, 'jsonLd'> & { faqs?: { q: string; a: string }[]; extraLd?: object[] }): PageDef {
  const { faqs, extraLd = [], ...rest } = def;
  const jsonLd: object[] = [businessNode()];
  if (def.path !== '/') jsonLd.push(breadcrumbNode(def.crumbs));
  jsonLd.push(...extraLd);
  if (faqs?.length) jsonLd.push(faqNode(faqs));
  return { ...rest, jsonLd, sitemap: def.sitemap ?? { changefreq: 'monthly', priority: '0.7' } };
}

const SERVICES_CRUMB: Crumb = { name: 'Services', path: PATHS.services };
const AREAS_CRUMB: Crumb = { name: 'Service Areas', path: PATHS.areas };

export const PAGES: PageDef[] = [
  page({
    path: '/',
    title: 'Stucco Repair & Re-Stucco Albuquerque | Albuquerque Stucco',
    description:
      'Stucco repair, color coats, re-stucco and water damage repair for Albuquerque-area homes. Texture and color matched. Book a free on-site estimate.',
    crumbs: [],
    element: <HomePage />,
    preloadHero: true,
    faqs: HOME_FAQS,
    extraLd: [websiteNode()],
    sitemap: { changefreq: 'weekly', priority: '1.0' },
  }),
  page({
    path: PATHS.services,
    title: 'Stucco Services in Albuquerque | Albuquerque Stucco',
    description:
      'Stucco repair, re-stucco, color coats, water damage and parapet repair, EIFS repair and garden walls across the Albuquerque area.',
    crumbs: [SERVICES_CRUMB],
    element: <ServicesHubPage />,
    sitemap: { changefreq: 'monthly', priority: '0.9' },
  }),
  ...SERVICES.map((s) =>
    page({
      path: servicePath(s.slug),
      title: s.seoTitle,
      description: s.seoDescription,
      crumbs: [SERVICES_CRUMB, { name: s.shortName, path: servicePath(s.slug) }],
      element: <ServicePage service={s} />,
      faqs: s.faqs,
      extraLd: [serviceNode(s)],
      sitemap: { changefreq: 'monthly', priority: s.slug === 'stucco-repair' ? '0.9' : '0.8' },
    }),
  ),
  page({
    path: PATHS.areas,
    title: 'Stucco Service Areas | Albuquerque Stucco',
    description:
      'Albuquerque Stucco works in Albuquerque, Rio Rancho, Corrales, Los Ranchos, Bernalillo, Placitas, Los Lunas, the East Mountains and nearby.',
    crumbs: [AREAS_CRUMB],
    element: <AreasHubPage />,
    sitemap: { changefreq: 'monthly', priority: '0.8' },
  }),
  ...AREAS.map((a) =>
    page({
      path: areaPath(a.slug),
      title: a.seoTitle,
      description: a.seoDescription,
      crumbs: [AREAS_CRUMB, { name: a.name, path: areaPath(a.slug) }],
      element: <AreaPage area={a} />,
      faqs: a.faqs,
      sitemap: { changefreq: 'monthly', priority: '0.8' },
    }),
  ),
  page({
    path: PATHS.howItWorks,
    title: 'How Our Stucco Process Works | Albuquerque Stucco',
    description:
      'From a free on-site inspection to a written estimate, careful repair and a final walkthrough. Here’s how a stucco project with us works.',
    crumbs: [{ name: 'How It Works', path: PATHS.howItWorks }],
    element: <HowItWorksPage />,
    faqs: PROCESS_FAQS,
  }),
  page({
    path: PATHS.gallery,
    title: 'Stucco Project Gallery | Albuquerque Stucco',
    description:
      'Stucco repairs, color coats and re-stucco projects around Albuquerque. See colors and textures on your own walls at a free estimate.',
    crumbs: [{ name: 'Gallery', path: PATHS.gallery }],
    element: <GalleryPage />,
    // Kept out of Google while every gallery slot is a "photo coming soon"
    // placeholder (thin page). This flips automatically: once any slot in
    // src/config/images.ts has a real photo, the page becomes indexable and
    // returns to sitemap.xml. If you ever hard-code this instead, reverse it
    // once real photos are in.
    noindex: !hasRealPhotos(GALLERY),
    sitemap: { changefreq: 'monthly', priority: '0.5' },
  }),
  page({
    path: PATHS.faq,
    title: 'Stucco FAQ | Albuquerque Stucco',
    description:
      'Answers about stucco in Albuquerque: cracks, color coats, EIFS, water damage, winter work, HOA colors, care and how estimates work.',
    crumbs: [{ name: 'FAQ', path: PATHS.faq }],
    element: <FaqPage />,
    faqs: ALL_FAQS,
  }),
  page({
    path: PATHS.about,
    title: 'About Albuquerque Stucco | Albuquerque, NM',
    description:
      'Albuquerque Stucco is a local company that repairs, recoats and re-stuccos homes and walls across the Albuquerque area.',
    crumbs: [{ name: 'About', path: PATHS.about }],
    element: <AboutPage />,
    sitemap: { changefreq: 'yearly', priority: '0.5' },
  }),
  page({
    path: PATHS.quote,
    title: 'Free Stucco Estimate | Albuquerque Stucco',
    description:
      'Request a free on-site stucco estimate. Answer a few quick questions and we’ll reach out to schedule a time to look at your walls.',
    crumbs: [{ name: 'Get a Quote', path: PATHS.quote }],
    element: <QuotePage />,
    hideCtaBand: true,
    sitemap: { changefreq: 'yearly', priority: '0.9' },
  }),
  page({
    path: PATHS.contact,
    title: 'Contact Albuquerque Stucco | Albuquerque, NM',
    description:
      'Call, email or message Albuquerque Stucco about stucco repair, color coats, re-stucco or your estimate. Based in Albuquerque, NM.',
    crumbs: [{ name: 'Contact', path: PATHS.contact }],
    element: <ContactPage />,
    sitemap: { changefreq: 'yearly', priority: '0.6' },
  }),
  page({
    path: PATHS.privacy,
    title: 'Privacy Policy | Albuquerque Stucco',
    description: 'How Albuquerque Stucco collects, uses and protects the information you share through our website.',
    crumbs: [{ name: 'Privacy Policy', path: PATHS.privacy }],
    element: <PrivacyPage />,
    sitemap: { changefreq: 'yearly', priority: '0.2' },
  }),
  page({
    path: PATHS.terms,
    title: 'Terms of Use | Albuquerque Stucco',
    description: 'The terms that apply to using the Albuquerque Stucco website, including quotes, submissions and site content.',
    crumbs: [{ name: 'Terms of Use', path: PATHS.terms }],
    element: <TermsPage />,
    sitemap: { changefreq: 'yearly', priority: '0.2' },
  }),
];

/** Rendered for any unknown URL; prerendered to dist/404.html (noindex). */
export const NOT_FOUND: PageDef = {
  path: '/404/',
  title: 'Page Not Found | Albuquerque Stucco',
  description: 'The page you were looking for could not be found.',
  crumbs: [],
  jsonLd: [],
  noindex: true,
  element: <NotFoundPage />,
};
