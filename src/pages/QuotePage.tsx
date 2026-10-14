import { Phone } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuoteWizard } from '../components/QuoteWizard';
import { CallLink } from '../components/CallLink';
import { FinancingSlot, TrustBadgesSlot } from '../components/Slots';
import { BUSINESS } from '../config/business';
import { container } from '../lib/ui';

const NEXT = [
  'We call, text or email to set up a time that works for you.',
  'We visit, inspect the stucco, look for the cause of the damage and bring color and texture samples if you need them.',
  'You get a written estimate. No pressure, no obligation.',
];

export function QuotePage() {
  return (
    <section className="bg-sand-100 pb-16">
      <div className={`${container} pt-8 sm:pt-12`}>
        <Breadcrumbs />
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Request a Free Estimate
            </h1>
            <p className="mt-3 max-w-xl text-lg text-ink-soft">
              Answer a few quick questions about your stucco project. It takes about a minute, and there’s no price
              calculator because every wall needs to be seen in person.
            </p>
            <div className="mt-8">
              <QuoteWizard />
            </div>
          </div>
          <aside className="space-y-6 lg:pt-28">
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-ink">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {NEXT.map((n, i) => (
                  <li key={n} className="flex gap-3 text-ink-soft">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chile-700 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl bg-chile-900 p-6 text-sand-50">
              <h2 className="font-display text-xl font-semibold">Rather talk it through?</h2>
              <p className="mt-2 text-sand-200">Call us and we’ll answer your questions and set up a time.</p>
              <CallLink location="quote-aside" className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white underline-offset-4 hover:underline">
                <Phone className="h-5 w-5" aria-hidden="true" /> {BUSINESS.phoneDisplay}
              </CallLink>
              <TrustBadgesSlot tone="dark" />
            </div>
            <FinancingSlot />
          </aside>
        </div>
      </div>
    </section>
  );
}
