// ─────────────────────────────────────────────────────────────────────────────
// Every business fact the site prints or puts in schema lives here.
// Anything containing "PLACEHOLDER" is unfilled: `npm run verify` lists every
// one as a warning, and placeholder values are left OUT of the JSON-LD.
//
// This must match the Google Business Profile exactly (name, address, phone).
// The street address is shown publicly on the site and in schema, so the GBP
// should show the same address too.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://albuquerquestuccopro.com'; // no trailing slash

export const BUSINESS = {
  name: 'Albuquerque Stucco',
  /** Registered entity name, if different from the brand. */
  legalName: 'PLACEHOLDER_LEGAL_NAME',

  /** Shown in the header, footer and buttons. */
  phoneDisplay: '(505) 375-3060',
  /** tel: links and schema. E.164 format, e.g. +15055550123. */
  phoneE164: '+15053753060',

  email: 'contact@albuquerquestuccopro.com',

  /** Shown in the footer, on the Contact page and in schema. */
  address: {
    street: 'PLACEHOLDER_STREET',
    city: 'Albuquerque',
    region: 'NM',
    postalCode: 'PLACEHOLDER_ZIP',
    country: 'US',
  },

  /** From the GBP pin. */
  geo: null as { latitude: number; longitude: number } | null,

  /**
   * Opening hours. Kept out of the site and schema until `confirmed` is true.
   * Days use schema.org names (Monday … Sunday), times are 24h "HH:MM".
   */
  hours: {
    confirmed: false,
    display: 'PLACEHOLDER_HOURS',
    spec: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
  },

  /** Full profile URLs. Empty strings are ignored (no sameAs, no footer link). */
  social: {
    googleBusinessProfile: '',
    facebook: '',
    instagram: '',
    youtube: '',
    nextdoor: '',
  },

  /**
   * Google's permanent knowledge-graph link for the GBP (from the share
   * link's kgmid). Stays the same if the listing is renamed. Used in schema
   * sameAs only, not shown on the page.
   */
  googleEntityUrl: '',

  /**
   * Google Maps embed for the Contact page: the src="..." value from Google
   * Maps → Share → Embed a map. Empty = no map shown.
   */
  mapEmbedUrl: '',

  /** Short line used in the footer and Organization schema. */
  tagline: 'Stucco repair, re-stucco and color coats for Albuquerque homes.',
} as const;

export const isPlaceholder = (v: unknown): boolean =>
  typeof v === 'string' && (v.includes('PLACEHOLDER') || v === '+10000000000');

export const telHref = `tel:${BUSINESS.phoneE164}`;
export const mailHref = `mailto:${BUSINESS.email}`;

const SOCIAL_LABELS: Record<keyof typeof BUSINESS.social, string> = {
  googleBusinessProfile: 'Google Business Profile',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  nextdoor: 'Nextdoor',
};

export const socialLinks = (Object.entries(BUSINESS.social) as [keyof typeof BUSINESS.social, string][])
  .filter(([, url]) => url && !isPlaceholder(url))
  .map(([key, url]) => ({ key, url, label: SOCIAL_LABELS[key] }));

/** City line, e.g. "Albuquerque, NM 87110". */
export const locationLine = `${BUSINESS.address.city}, ${BUSINESS.address.region}${
  isPlaceholder(BUSINESS.address.postalCode) ? '' : ` ${BUSINESS.address.postalCode}`
}`;

/** Full one-line address, e.g. "123 Main St NE, Albuquerque, NM 87110". */
export const fullAddress = isPlaceholder(BUSINESS.address.street)
  ? locationLine
  : `${BUSINESS.address.street}, ${locationLine}`;

// ── Feature switches ─────────────────────────────────────────────────────────
export const FEATURES = {
  /**
   * Financing block. Leave false until a financing program actually exists.
   * When true, <FinancingSlot> renders FINANCING_COPY below.
   */
  financing: false,
};

export const FINANCING_COPY = {
  heading: 'PLACEHOLDER: Financing available',
  body: 'PLACEHOLDER: Describe the real financing program, lender and terms here before enabling.',
};

/**
 * Warranty wording. Rendered only when `confirmed` is true. Write the real
 * terms here once confirmed with the owner.
 */
export const WARRANTY = {
  confirmed: false,
  summary: 'PLACEHOLDER: warranty terms',
};
