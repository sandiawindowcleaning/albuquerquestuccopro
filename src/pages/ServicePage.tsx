import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { BenefitGrid } from '../components/BenefitGrid';
import { ProcessSteps } from '../components/ProcessSteps';
import { FaqList } from '../components/FaqList';
import { ServiceGrid } from '../components/ServiceCard';
import { AreaLinks } from '../components/AreaLinks';
import type { Service } from '../data/types';
import { serviceBySlug } from '../data/services';
import { areaBySlug } from '../data/areas';
import { PATHS } from '../lib/paths';
import { SERVICE_PHOTOS } from '../config/images';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { btn, h2, lead } from '../lib/ui';

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-ink-soft">
          <Check className="mt-1 h-4 w-4 shrink-0 text-chile-700" strokeWidth={3} aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServicePage({ service: s }: { service: Service }) {
  const photo = SERVICE_PHOTOS[s.slug];
  return (
    <>
      <PageHero title={s.h1}>
        <p>{s.intro[0]}</p>
      </PageHero>

      <Section tone="light" labelledBy="benefits-heading">
        <div className="max-w-prose">
          {s.intro.slice(1).map((p) => <p key={p.slice(0, 24)} className={lead}>{p}</p>)}
          <h2 id="benefits-heading" className={`${h2} mt-10`}>{s.benefitsHeading}</h2>
        </div>
        <div className="mt-8">
          <BenefitGrid items={s.benefits} />
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-card">
            <h2 className="font-display text-2xl font-semibold text-ink">What’s included</h2>
            <CheckList items={s.included} />
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-card">
            <h2 className="font-display text-2xl font-semibold text-ink">Best for</h2>
            <CheckList items={s.bestFor} />
            <Link to={PATHS.quote} className={`${btn.quote} mt-8`}>Get a Free Quote</Link>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="local-heading">
        <div className={photo ? 'grid gap-10 lg:grid-cols-2 lg:items-center' : ''}>
          <div className="max-w-prose">
            <h2 id="local-heading" className={h2}>{s.local.heading}</h2>
            <div className={`${lead} mt-5 space-y-4`}>
              {s.local.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          {photo && (
            <ResponsiveImage
              file={photo.file}
              alt={photo.alt}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-3xl object-cover shadow-card"
            />
          )}
        </div>
      </Section>

      <Section tone="sand" labelledBy="process-heading">
        <h2 id="process-heading" className={h2}>How it works</h2>
        <div className="mt-8"><ProcessSteps /></div>
      </Section>

      <Section tone="light" labelledBy="faq-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className={h2}>Questions about {s.shortName.toLowerCase()}</h2>
          <div className="mt-8"><FaqList items={s.faqs} /></div>
          <p className="mt-6">
            <Link to={PATHS.faq} className="font-semibold text-chile-700 hover:underline">More stucco FAQs →</Link>
          </p>
        </div>
      </Section>

      <Section tone="sand" labelledBy="related-heading">
        <h2 id="related-heading" className={h2}>Related services</h2>
        <div className="mt-8"><ServiceGrid services={s.related.map(serviceBySlug)} /></div>
      </Section>

      <Section tone="light" labelledBy="areas-heading">
        <h2 id="areas-heading" className={h2}>{s.shortName} near you</h2>
        <p className={`${lead} mt-3`}>We work across the Albuquerque area, including:</p>
        <div className="mt-6"><AreaLinks areas={s.featuredAreas.map(areaBySlug)} /></div>
        <p className="mt-6">
          <Link to={PATHS.areas} className="font-semibold text-chile-700 hover:underline">See all service areas →</Link>
        </p>
      </Section>
    </>
  );
}
