import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { TrustRow } from '../components/TrustRow';
import { CallLink } from '../components/CallLink';
import { Section } from '../components/Section';
import { ServiceGrid } from '../components/ServiceCard';
import { BenefitGrid } from '../components/BenefitGrid';
import { ProcessSteps } from '../components/ProcessSteps';
import { AreaLinks } from '../components/AreaLinks';
import { FaqList } from '../components/FaqList';
import { GalleryGrid, hasRealPhotos } from '../components/GalleryGrid';
import { FinancingSlot, ReviewsSlot, TrustBadgesSlot } from '../components/Slots';
import { BUSINESS } from '../config/business';
import { GALLERY, HERO_IMAGE, PHOTOS } from '../config/images';
import { SERVICES } from '../data/services';
import { AREAS } from '../data/areas';
import { HOME_BENEFITS, HOME_TRUST_POINTS } from '../data/content';
import { HOME_FAQS } from '../data/faqs';
import { HERO_SIZES } from '../lib/images';
import { PATHS } from '../lib/paths';
import { btn, container, eyebrow, h2, lead } from '../lib/ui';

const STUCCO_SURFACES = [
  'Homes and casitas',
  'Parapets and canales',
  'Garden and courtyard walls',
  'Garages and additions',
  'Commercial buildings',
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink">
        <ResponsiveImage
          file={HERO_IMAGE.file}
          alt={HERO_IMAGE.alt}
          sizes={HERO_SIZES}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/65 to-ink/85 sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/70 sm:to-ink/30" />
        <div className={`${container} py-16 sm:py-24 lg:py-28`}>
          <div className="max-w-2xl">
            <p className={`${eyebrow} !text-sun-400`}>Albuquerque · Rio Rancho · Corrales and nearby</p>
            <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.05] text-sand-50 sm:text-6xl">
              Stucco Repair for Albuquerque Homes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-sand-100 sm:text-xl">
              Cracks repaired, water damage fixed and faded walls brought back with a fresh color coat, matched to your home’s texture.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
              <CallLink location="hero" className={btn.onDark}>
                <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS.phoneDisplay}
              </CallLink>
            </div>
            <div className="mt-9">
              <TrustRow items={HOME_TRUST_POINTS} />
              <TrustBadgesSlot tone="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <Section tone="light" labelledBy="services-heading">
        <div className="max-w-2xl">
          <p className={eyebrow}>What we do</p>
          <h2 id="services-heading" className={`${h2} mt-2`}>Stucco services for every part of your home</h2>
          <p className={`${lead} mt-4`}>
            From a single crack to a full re-stucco, on traditional cement stucco and synthetic stucco alike.
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid services={SERVICES} />
        </div>
      </Section>

      {/* ── Benefits ── */}
      <Section tone="sand" labelledBy="benefits-heading">
        <div className="max-w-2xl">
          <p className={eyebrow}>Why us</p>
          <h2 id="benefits-heading" className={`${h2} mt-2`}>Stucco work that holds up in the high desert</h2>
          <p className={`${lead} mt-4`}>
            Albuquerque’s sun, wind, monsoon storms and freezing nights are hard on stucco. Here’s how we make repairs last.
          </p>
        </div>
        <div className="mt-10">
          <BenefitGrid items={HOME_BENEFITS} />
        </div>
      </Section>

      <ReviewsSlot />

      {/* ── Living space ── */}
      <Section tone="light" labelledBy="space-heading">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className={eyebrow}>Repair or recoat?</p>
            <h2 id="space-heading" className={`${h2} mt-2`}>Most houses don’t need a full re-stucco</h2>
            <div className={`${lead} mt-4 space-y-4`}>
              <p>
                When stucco looks tired, it’s easy to assume the whole house needs to be redone. Often it doesn’t. If the
                stucco is still well attached, repairing the damaged areas and applying a fresh color coat gives the house an
                even, like-new finish for much less work than a full re-stucco.
              </p>
              <p>
                When stucco is loose, hiding water damage or cracked all over, we’ll tell you that too, and explain why a
                re-stucco is the longer-lasting fix.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={PATHS.quote} className={btn.quote}>Book a Free Estimate</Link>
              <Link to={PATHS.howItWorks} className={btn.outline}>How It Works</Link>
            </div>
          </div>
          <div>
            <ResponsiveImage
              file={PHOTOS.windowBay.file}
              alt={PHOTOS.windowBay.alt}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full rounded-3xl object-cover shadow-card"
            />
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">What we work on</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {STUCCO_SURFACES.map((sp) => (
                <li key={sp} className="rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-[15px] text-ink">{sp}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── How it works ── */}
      <Section tone="sand" labelledBy="process-heading">
        <div className="max-w-2xl">
          <p className={eyebrow}>How it works</p>
          <h2 id="process-heading" className={`${h2} mt-2`}>From first call to final walkthrough</h2>
        </div>
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      {/* ── Gallery preview: appears once at least one real photo is added ── */}
      {hasRealPhotos(GALLERY) && (
        <Section tone="light" labelledBy="gallery-heading">
          <h2 id="gallery-heading" className={h2}>Recent work</h2>
          <div className="mt-8">
            <GalleryGrid slots={GALLERY.filter((g) => !g.placeholder).slice(0, 6)} />
          </div>
          <p className="mt-6">
            <Link to={PATHS.gallery} className="font-semibold text-chile-700 hover:underline">See the full gallery →</Link>
          </p>
        </Section>
      )}

      {/* ── Areas ── */}
      <Section tone="light" labelledBy="areas-heading">
        <div className="max-w-2xl">
          <p className={eyebrow}>Service areas</p>
          <h2 id="areas-heading" className={`${h2} mt-2`}>Serving the Albuquerque area</h2>
          <p className={`${lead} mt-4`}>
            We work across Albuquerque, Rio Rancho, the North Valley, Valencia County and the East Mountains.
          </p>
        </div>
        <div className="mt-8">
          <AreaLinks areas={AREAS} />
        </div>
        <p className="mt-6 text-ink-soft">
          Don’t see your city? Call <CallLink location="areas" className="font-semibold text-chile-700 underline" /> and ask.
        </p>
      </Section>

      {/* ── FAQ preview ── */}
      <Section tone="sand" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className={eyebrow}>FAQ</p>
            <h2 id="faq-heading" className={`${h2} mt-2`}>Common questions</h2>
            <p className={`${lead} mt-4`}>The questions we hear most from Albuquerque homeowners.</p>
            <Link to={PATHS.faq} className={`${btn.outline} mt-6`}>See All FAQs</Link>
          </div>
          <FaqList items={HOME_FAQS} />
        </div>
        <div className="mt-10">
          <FinancingSlot />
        </div>
      </Section>
    </>
  );
}
