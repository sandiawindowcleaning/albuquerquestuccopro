import { BUSINESS, SITE_URL, isPlaceholder, socialLinks } from '../config/business';
import { AREAS } from '../data/areas';
import { SERVICES } from '../data/services';
import type { Faq, Service } from '../data/types';
import { servicePath } from './paths';
import { largestJpg } from './images';
import { PHOTOS } from '../config/images';

// JSON-LD builders. Every node is generated from src/config and src/data, so
// schema can't drift from what the page actually says.

export const abs = (path: string) => `${SITE_URL}${path}`;
export const BUSINESS_ID = `${SITE_URL}/#business`;

const real = <T,>(v: T) => (isPlaceholder(v) ? undefined : v);

export function areaServed() {
  return AREAS.map((a) => ({
    '@type': a.kind,
    name: a.kind === 'City' ? `${a.name}, NM` : `${a.name}, Albuquerque area, NM`,
    sameAs: a.wikipedia,
  }));
}

/** LocalBusiness node, emitted on every page. */
export function businessNode() {
  const { address, hours } = BUSINESS;
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    legalName: real(BUSINESS.legalName),
    description: BUSINESS.tagline,
    url: `${SITE_URL}/`,
    logo: abs('/icon-512.png'),
    // A real photo first (Google prefers a photo of the work), brand card second.
    image: [abs(largestJpg(PHOTOS.additionFinish.file)), abs(largestJpg('og-default'))],
    telephone: real(BUSINESS.phoneE164),
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: real(address.street),
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: real(address.postalCode),
      addressCountry: address.country,
    },
    geo: BUSINESS.geo ? { '@type': 'GeoCoordinates', ...BUSINESS.geo } : undefined,
    openingHoursSpecification: hours.confirmed
      ? hours.spec.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        }))
      : undefined,
    hasMap: real(BUSINESS.social.googleBusinessProfile) || undefined,
    areaServed: areaServed(),
    sameAs: (() => {
      const links = [BUSINESS.googleEntityUrl, ...socialLinks.map((s) => s.url)].filter((u) => u && !isPlaceholder(u));
      return links.length ? [...new Set(links)] : undefined;
    })(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Stucco services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(servicePath(s.slug)) },
      })),
    },
    // ── Reviews hook ──────────────────────────────────────────────────────
    // Do NOT add aggregateRating or review here until real, verifiable
    // reviews exist and are shown on the site. When they do, add:
    //   aggregateRating: { '@type': 'AggregateRating', ratingValue, reviewCount },
    // using numbers that match your Google Business Profile exactly.
    // scripts/verify.mjs currently fails the build if either key appears;
    // remove that check in the same commit.
  };
  return prune(node);
}

export function websiteNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: `${SITE_URL}/`,
    publisher: { '@id': BUSINESS_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(trail: Crumb[]) {
  const full = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqNode(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceNode(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.seoDescription,
    url: abs(servicePath(s.slug)),
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed(),
  };
}

/** Drop undefined values so the JSON has no empty keys. */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
