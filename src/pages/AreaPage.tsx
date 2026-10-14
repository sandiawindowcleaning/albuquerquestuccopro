import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ProcessSteps } from '../components/ProcessSteps';
import { FaqList } from '../components/FaqList';
import { AreaLinks } from '../components/AreaLinks';
import { Icon } from '../components/Icon';
import { CallLink } from '../components/CallLink';
import type { Area } from '../data/types';
import { areaBySlug } from '../data/areas';
import { serviceBySlug } from '../data/services';
import { PATHS, servicePath } from '../lib/paths';
import { h2, lead } from '../lib/ui';
import { PHOTOS, SERVICE_PHOTOS } from '../config/images';
import { ResponsiveImage } from '../components/ResponsiveImage';

export function AreaPage({ area: a }: { area: Area }) {
  // Photo for the city's top featured service. The alt text describes what's
  // in the photo; it doesn't claim the photo was taken in this city.
  const photo = SERVICE_PHOTOS[a.focus[0]?.service] ?? PHOTOS.additionFinish;
  return (
    <>
      <PageHero title={a.h1} eyebrow={a.county}>
        <p>{a.intro[0]}</p>
      </PageHero>

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
        <div className="max-w-prose space-y-12">
          {a.intro.slice(1).map((p) => <p key={p.slice(0, 24)} className={lead}>{p}</p>)}
          {a.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className={h2}>{sec.heading}</h2>
              <div className={`${lead} mt-5 space-y-4`}>
                {sec.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
        <ResponsiveImage
          file={photo.file}
          alt={photo.alt}
          sizes="(min-width: 1024px) 400px, 100vw"
          className="h-auto w-full rounded-3xl object-cover shadow-card lg:sticky lg:top-28"
        />
        </div>
      </Section>

      <Section tone="sand" labelledBy="focus-heading">
        <h2 id="focus-heading" className={h2}>Popular stucco services in {a.name}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {a.focus.map((f) => {
            const s = serviceBySlug(f.service);
            return (
              <li key={s.slug} className="group relative flex flex-col rounded-2xl border border-stone-300/70 bg-white p-6 shadow-card hover:border-chile-600">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-chile-700 text-white">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  <Link to={servicePath(s.slug)} className="after:absolute after:inset-0 after:content-['']">{s.name}</Link>
                </h3>
                <p className="mt-2 flex-1 text-ink-soft">{f.why}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-chile-700">
                  Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link to={PATHS.services} className="font-semibold text-chile-700 hover:underline">See all stucco services →</Link>
        </p>
      </Section>

      <Section tone="light" labelledBy="process-heading">
        <h2 id="process-heading" className={h2}>How it works in {a.name}</h2>
        <div className="mt-8"><ProcessSteps /></div>
      </Section>

      <Section tone="sand" labelledBy="faq-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className={h2}>{a.name} stucco questions</h2>
          <div className="mt-8"><FaqList items={a.faqs} /></div>
        </div>
      </Section>

      <Section tone="light" labelledBy="nearby-heading">
        <h2 id="nearby-heading" className={h2}>Nearby service areas</h2>
        <div className="mt-6"><AreaLinks areas={a.nearby.map(areaBySlug)} /></div>
        <p className="mt-6 text-ink-soft">
          <Link to={PATHS.areas} className="font-semibold text-chile-700 hover:underline">All service areas</Link>
          {' '}· Not sure if you’re in range? Call <CallLink location={`area-${a.slug}`} className="font-semibold text-chile-700 underline" />.
        </p>
      </Section>
    </>
  );
}
