import { ShieldCheck, Quote } from 'lucide-react';
import { REVIEWS, REVIEWS_URL, TRUST_BADGES, OWNER_STORY } from '../config/reviews';
import { FEATURES, FINANCING_COPY } from '../config/business';
import { Section } from './Section';
import { h2 } from '../lib/ui';

// Placeholder components. Each renders NOTHING until its config is filled in,
// so the live site never shows fake reviews, badges or financing claims.

export function ReviewsSlot() {
  if (!REVIEWS.length) return null;
  return (
    <Section tone="white" labelledBy="reviews-heading">
      <h2 id="reviews-heading" className={h2}>What homeowners say</h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.author + r.text.slice(0, 20)} className="rounded-2xl border border-stone-300/70 bg-sand-50 p-6">
            <Quote className="h-6 w-6 text-turquoise-500" aria-hidden="true" />
            <blockquote className="mt-3 leading-relaxed text-ink">{r.text}</blockquote>
            <p className="mt-4 text-sm font-semibold text-ink">
              {r.author}{r.area ? `, ${r.area}` : ''}
              <span className="font-normal text-stone-600"> · {r.source}</span>
            </p>
          </li>
        ))}
      </ul>
      {REVIEWS_URL && (
        <p className="mt-6">
          <a href={REVIEWS_URL} className="font-semibold text-chile-700 hover:underline" target="_blank" rel="noopener">
            Read all reviews →
          </a>
        </p>
      )}
    </Section>
  );
}

export function TrustBadgesSlot({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  if (!TRUST_BADGES.length) return null;
  const cls = tone === 'dark' ? 'border-white/20 text-sand-50' : 'border-stone-300 text-ink';
  return (
    <ul className="mt-6 flex flex-wrap gap-3">
      {TRUST_BADGES.map((b) => (
        <li key={b.label} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${cls}`}>
          <ShieldCheck className="h-4 w-4 text-turquoise-500" aria-hidden="true" />
          {b.label}
          {b.detail && <span className="opacity-75">· {b.detail}</span>}
        </li>
      ))}
    </ul>
  );
}

export function FinancingSlot() {
  if (!FEATURES.financing) return null;
  return (
    <div className="rounded-2xl border border-turquoise-500/40 bg-turquoise-100 p-6">
      <h2 className="font-display text-2xl font-semibold text-ink">{FINANCING_COPY.heading}</h2>
      <p className="mt-2 text-ink-soft">{FINANCING_COPY.body}</p>
    </div>
  );
}

export function OwnerStorySlot() {
  if (!OWNER_STORY.length) return null;
  return (
    <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
      {OWNER_STORY.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
    </div>
  );
}
