import { TRACKING, trackingReady } from '../config/tracking';

// All conversion events go through here. gtag() is always defined (the stub
// is inlined into index.html); fbq() exists only when the Pixel ID is set.

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args);
}
function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq(...args);
}

function adsConversion(label: string) {
  if (trackingReady(TRACKING.googleAdsId) && trackingReady(label)) {
    gtag('event', 'conversion', { send_to: `${TRACKING.googleAdsId}/${label}` });
  }
}

/** Quote / estimate form submitted successfully. */
export function trackQuoteSubmit(details: { goal?: string; openings?: string; area?: string }) {
  gtag('event', 'generate_lead', { form_name: 'quote', ...details });
  adsConversion(TRACKING.googleAdsQuoteLabel);
  fbq('track', 'Lead');
}

/** Home page hero inspection form submitted successfully. */
export function trackInspectionSubmit(details: { project_type?: string; area_affected?: string; timeframe?: string }) {
  gtag('event', 'generate_lead', { form_name: 'inspection', ...details });
  adsConversion(TRACKING.googleAdsQuoteLabel);
  fbq('track', 'Lead');
}

/** Contact form submitted successfully. */
export function trackContactSubmit() {
  gtag('event', 'generate_lead', { form_name: 'contact' });
  fbq('track', 'Contact');
}

// Click-to-call (tel: link) tracking is NOT here: it's an inline script that
// vite.config.ts writes into index.html, so it works before the app hydrates.

/** Meta Pixel PageView on client-side navigation (GA4 enhanced measurement
 *  already records history changes, so GA gets no manual page_view). */
export function trackPageView() {
  fbq('track', 'PageView');
}
