import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { CallLink } from './CallLink';
import { BUSINESS } from '../config/business';
import { PATHS } from '../lib/paths';
import { btn, container } from '../lib/ui';

/** Closing call to action, rendered by Layout at the bottom of every page. */
export function CtaBand() {
  return (
    <section className="bg-chile-900 text-sand-50" aria-labelledby="cta-band-heading">
      <div className={`${container} flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between`}>
        <div className="max-w-2xl">
          <h2 id="cta-band-heading" className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Ready to fix your stucco?
          </h2>
          <p className="mt-3 text-lg text-sand-200">
            Book a free on-site estimate. We’ll inspect your stucco, find the cause of the damage and give you a written estimate.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
          <CallLink location="cta-band" className={btn.onDark}>
            <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS.phoneDisplay}
          </CallLink>
        </div>
      </div>
    </section>
  );
}
