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
  metaPixelId: 'PLACEHOLDER_META_PIXEL_ID',

  /** Google Ads account tag, e.g. AW-123456789 */
  googleAdsId: 'AW-PLACEHOLDER',

  /** Conversion label for "quote form submitted" (the part after the slash) */
  googleAdsQuoteLabel: 'PLACEHOLDER_QUOTE_CONVERSION_LABEL',

  /** Conversion label for "tel: link clicked". Can be the same as the quote label. */
  googleAdsCallLabel: 'PLACEHOLDER_CALL_CONVERSION_LABEL',
} as const;

export const trackingReady = (id: string) => !!id && !id.includes('PLACEHOLDER');
