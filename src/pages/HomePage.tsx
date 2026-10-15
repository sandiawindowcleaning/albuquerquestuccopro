import { Link } from 'react-router-dom';
import { Check, House, Phone } from 'lucide-react';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { HeroLeadForm } from '../components/HeroLeadForm';
import { CallLink } from '../components/CallLink';
import { Section } from '../components/Section';
import { ServiceGrid } from '../components/ServiceCard';
import { BenefitGrid } from '../components/BenefitGrid';
import { ProcessSteps } from '../components/ProcessSteps';
import { AreaLinks } from '../components/AreaLinks';
import { FaqList } from '../components/FaqList';
import { GalleryGrid, hasRealPhotos } from '../components/GalleryGrid';
import { FinancingSlot, ReviewsSlot, TrustBadgesSlot } from '../components/Slots';
import { BUSINESS, fullAddress, isPlaceholder } from '../config/business';
import { GALLERY, HERO_IMAGE, PHOTOS } from '../config/images';
import { SERVICES } from '../data/services';
import { AREAS } from '../data/areas';
import { HOME_BENEFITS } from '../data/content';
import { HOME_FAQS } from '../data/faqs';
import { HERO_SIZES } from '../lib/images';
import { PATHS } from '../lib/paths';
import { btn, container, eyebrow, h2, lead } from '../lib/ui';

const HERO_POINTS = [
  'Free on-site inspection and measurement',
  'Texture and color matched so repairs don’t stand out',
  'Traditional and synthetic (EIFS), with honest advice on repair vs. recoat',
];

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
      {/* ── Hero: pitch on the left, inspection form card on the right ── */}
      <section className="relative isolate overflow-hidden bg-ink">
        <ResponsiveImage
          file={HERO_IMAGE.file}
          alt={HERO_IMAGE.alt}
          sizes={HERO_SIZES}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/75 lg:to-ink/50" />
        <div className={`${container} grid gap-10 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-12 lg:pb-20 lg:pt-8`}>
          <div className="lg:pt-16">
            <p className={`${eyebrow} flex items-center gap-3 !text-sun-400`}>
              <span className="h-px w-8 bg-sun-400" aria-hidden="true" />
              Locally owned in Albuquerque, New Mexico
            </p>
            <h1 className="mt-5 font-display text-[clamp(2rem,8.4vw,3.75rem)] font-semibold leading-[1.05] text-sand-50 [text-wrap:balance] lg:text-5xl xl:text-[3.25rem]">
              Stucco repair made for Albuquerque homes.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-100">
              Crack repair, patching, recoats and full re-stucco for traditional and synthetic stucco, matched to your
              existing texture and color and built to handle high-desert sun, monsoon rain and freeze-thaw winters.
            </p>
            <ul className="mt-7 space-y-3">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-sand-50">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-400 text-ink">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={PATHS.services} className={`${btn.quote} min-h-[3.25rem]`}>See Our Services</Link>
              <CallLink location="hero" className={`${btn.onDark} min-h-[3.25rem]`}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {BUSINESS.phoneDisplay}
              </CallLink>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sand-200">
              <House className="mt-0.5 h-5 w-5 shrink-0 text-sun-400" aria-hidden="true" />
              {isPlaceholder(BUSINESS.address.street)
                ? 'Serving Albuquerque, Rio Rancho and surrounding areas'
                : fullAddress}
            </p>
            <TrustBadgesSlot tone="dark" />
          </div>
          <div id="inspection" className="scroll-mt-24 lg:-mb-4" data-hides-mobile-bar="">
            <HeroLeadForm />
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
