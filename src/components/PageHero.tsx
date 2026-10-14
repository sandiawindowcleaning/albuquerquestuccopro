import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { CallLink } from './CallLink';
import { PATHS } from '../lib/paths';
import { btn, container, eyebrow as eyebrowCls } from '../lib/ui';

/** Top band for every inner page: breadcrumbs, the page's single H1, intro, CTAs. */
export function PageHero({
  title, eyebrow, children, ctas = true,
}: { title: string; eyebrow?: string; children?: ReactNode; ctas?: boolean }) {
  return (
    <section className="border-b border-stone-300/60 bg-sand-100">
      <div className={`${container} py-10 sm:py-14`}>
        <Breadcrumbs />
        {eyebrow && <p className={`${eyebrowCls} mb-3`}>{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-prose space-y-4 text-lg leading-relaxed text-ink-soft">{children}</div>}
        {ctas && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
            <CallLink location="page-hero" className={btn.outline}>
              <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
            </CallLink>
          </div>
        )}
      </div>
    </section>
  );
}
