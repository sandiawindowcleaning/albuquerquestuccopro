// Shared class strings so buttons look identical everywhere.
const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export const btn = {
  /** Quote buttons: turquoise so they stand out on chile red and sand. */
  quote: `${base} bg-turquoise-600 text-white shadow-sm hover:bg-turquoise-700 focus-visible:outline-turquoise-600`,
  /** Primary chile red (calls, secondary actions on light backgrounds). */
  primary: `${base} bg-chile-700 text-white shadow-sm hover:bg-chile-900 focus-visible:outline-chile-700`,
  outline: `${base} border-2 border-chile-700 text-chile-700 hover:bg-chile-50 focus-visible:outline-chile-700`,
  onDark: `${base} border-2 border-sand-50/70 text-sand-50 hover:bg-white/10 focus-visible:outline-sand-50`,
};

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';
export const h2 = 'font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl';
export const eyebrow = 'text-sm font-semibold uppercase tracking-[0.14em] text-turquoise-700';
export const lead = 'text-lg leading-relaxed text-ink-soft';
