// Every internal URL ends in "/". Build links with these helpers (or write the
// trailing slash by hand); scripts/verify.mjs fails the build if one doesn't.
export const servicePath = (slug: string) => `/services/${slug}/`;
export const areaPath = (slug: string) => `/service-areas/${slug}/`;

export const PATHS = {
  home: '/',
  services: '/services/',
  areas: '/service-areas/',
  howItWorks: '/how-it-works/',
  gallery: '/gallery/',
  faq: '/faq/',
  about: '/about/',
  quote: '/quote/',
  contact: '/contact/',
  privacy: '/privacy-policy/',
  terms: '/terms/',
} as const;
