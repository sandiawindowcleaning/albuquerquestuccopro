import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { FaqList } from '../components/FaqList';
import { Icon } from '../components/Icon';
import { PROCESS_STEPS } from '../data/content';
import { PROCESS_FAQS } from '../data/faqs';
import { PATHS } from '../lib/paths';
import { btn, h2 } from '../lib/ui';

const PREP = [
  'Take note of where you’ve seen cracks, stains, bubbling or loose stucco, and when you first noticed them.',
  'Think about whether the damage gets worse after rain, snow or when the sprinklers run.',
  'If you’re in an HOA or historic area, have your color guidelines handy.',
  'If you’re considering a new color or texture, save a few photos of homes you like.',
  'Have a rough idea of your timeline.',
];

export function HowItWorksPage() {
  return (
    <>
      <PageHero title="How Stucco Repair Works in Albuquerque">
        <p>
          Four steps, one point of contact. Here’s what happens from the moment you reach out to the day we walk the
          finished work with you.
        </p>
      </PageHero>

      <Section tone="light">
        <ol className="space-y-6">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-6 rounded-3xl border border-stone-300/70 bg-white p-6 shadow-card sm:p-8 md:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-4 md:flex-col md:items-start">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-chile-700 text-white">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-turquoise-700">Step {i + 1}</span>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.title}</h2>
                <p className="mt-2 text-lg font-medium text-ink">{s.summary}</p>
                <div className="mt-4 max-w-prose space-y-3 leading-relaxed text-ink-soft">
                  {s.detail.map((d) => <p key={d.slice(0, 24)}>{d}</p>)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sand" labelledBy="prep-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="prep-heading" className={h2}>Getting ready for your estimate</h2>
            <p className="mt-3 text-lg text-ink-soft">None of this is required, but it helps us give you a better recommendation.</p>
            <ul className="mt-6 space-y-3">
              {PREP.map((p) => (
                <li key={p} className="flex gap-3 text-ink-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-chile-700" strokeWidth={3} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link to={PATHS.quote} className={`${btn.quote} mt-8`}>Book Your Free Estimate</Link>
          </div>
          <div>
            <h2 className={h2}>Process questions</h2>
            <div className="mt-6"><FaqList items={PROCESS_FAQS} /></div>
          </div>
        </div>
      </Section>
    </>
  );
}
