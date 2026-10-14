// ─────────────────────────────────────────────────────────────────────────────
// Reviews and trust badges. Both lists are EMPTY on purpose: the components
// that read them render nothing until real entries are added.
//
// Only add reviews that are real, attributable and that you have permission
// to publish (e.g. copied from your Google Business Profile). Only add badges
// you can prove (insurance certificate, manufacturer certification, BBB, etc).
// ─────────────────────────────────────────────────────────────────────────────

export interface Review {
  author: string; // e.g. "Jane D."
  area?: string; // e.g. "Rio Rancho"
  text: string;
  source: string; // e.g. "Google"
  url?: string; // link to the original review
}

export interface TrustBadge {
  label: string; // e.g. "Fully insured"
  detail?: string;
}

export const REVIEWS: Review[] = [];

/** Public link to all reviews (e.g. your Google Business Profile reviews URL). */
export const REVIEWS_URL = '';

export const TRUST_BADGES: TrustBadge[] = [];

/**
 * Optional owner/company story for the About page. Leave empty to hide.
 * Write it in your own words. No invented history, years or project counts.
 */
export const OWNER_STORY: string[] = [];
