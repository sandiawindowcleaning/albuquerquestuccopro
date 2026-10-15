// ─────────────────────────────────────────────────────────────────────────────
// Analytics and ad-platform IDs. Replace each PLACEHOLDER with the real value.
// While an ID is a placeholder its script is simply not loaded, so the site
// works (and verify passes, with warnings) before these are filled in.
//
// These are read at BUILD time by vite.config.ts (to write the inline tags
// into index.html) and at runtime by src/lib/analytics.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const TRACKING = {
  /** GA4 measurement ID, e.g. G-ABC123XYZ9 */
  ga4Id: 'G-PLACEHOLDER',

  /** Meta (Facebook) Pixel ID, numeric string */
  metaPixelId: '', // not running Meta ads

  /** Google Ads account tag, e.g. AW-123456789 */
  googleAdsId: '', // not running Google Ads

  /** Conversion label for "quote form submitted" (the part after the slash) */
  googleAdsQuoteLabel: '',

  /** Conversion label for "tel: link clicked". Can be the same as the quote label. */
  googleAdsCallLabel: '',
} as const;

export const trackingReady = (id: string) => !!id && !id.includes('PLACEHOLDER');
