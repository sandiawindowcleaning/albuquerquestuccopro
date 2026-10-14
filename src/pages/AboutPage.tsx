import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { AreaLinks } from '../components/AreaLinks';
import { CallLink } from '../components/CallLink';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { OwnerStorySlot, ReviewsSlot, TrustBadgesSlot } from '../components/Slots';
import { BUSINESS } from '../config/business';
import { PHOTOS } from '../config/images';
import { SERVICES } from '../data/services';
import { AREAS } from '../data/areas';
import { PATHS, servicePath } from '../lib/paths';
import { btn, h2, lead } from '../lib/ui';

// Copy rules apply here more than anywhere (CLAUDE.md): no years in business,
// project counts, awards or licensing claims. The owner's own story goes in
// OWNER_STORY (src/config/reviews.ts) and appears below when filled in.

const VALUES = [
  {
    title: 'One point of contact',
    body: 'The same team answers your first call, does your estimate, schedules the work and follows up afterward. You never get passed around.',
  },
  {
    title: 'Straight answers',
    body: 'If a small repair will do, we won’t sell you a re-stucco. If a patch will show, we’ll say so before we start. A smaller job done right beats a bigger one you didn’t need.',
  },
  {
    title: 'Done in proper layers',
    body: 'Stucco is a system: lath, base coats and finish. We rebuild damaged areas the way the wall was built, and give each coat time to cure.',
  },
  {
    title: 'Clear written estimates',
    body: 'What we’ll repair, remove and finish, in what texture and color, with an expected timeline. No pressure to sign on the spot, and no surprises later.',
  },
  {
    title: 'Respect for your home',
    body: 'We show up when we say we will, protect windows, landscaping and walkways while we work, and clean up before we leave.',
  },
  {
    title: 'Here after the job',
    body: 'Questions about a crack, a stain or how the finish is holding up: you call the same number you called the first time.',
  },
];

const ABQ_FACTORS = [
  'Intense high-elevation sun that fades color coats, especially on south- and west-facing walls',
  'Big swings between daytime heat and cold nights that make stucco expand and contract',
  'Winter freeze-thaw cycles that widen any crack holding water',
  'Monsoon storms that test every parapet, canale and flashing at once',
  'Spring wind and dust that wear down the finish on exposed walls',
];

export function AboutPage() {
  return (
    <>
      <PageHero title="About Albuquerque Stucco">
        <p>
          We’re an {BUSINESS.address.city} company that repairs, recoats and re-stuccos homes across the metro and nearby
          towns. Stucco is all we do, from the first inspection to the final walkthrough.
        </p>
      </PageHero>

      <Section tone="light" labelledBy="why-heading">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div className="max-w-prose">
            <h2 id="why-heading" className={h2}>Why we focus on stucco</h2>
            <div className={`${lead} mt-5 space-y-4`}>
              <p>
                Almost every home in Albuquerque has a stucco exterior, from Pueblo Revival houses in the valley to new
                subdivisions on the West Side. Stucco suits the high desert, but it isn’t maintenance-free. Sun, wind,
                freezing nights and monsoon rain all work on it, and small problems turn into big ones when water gets in.
              </p>
              <p>
                Good stucco work is mostly about the details you don’t see: finding where water is getting in, rebuilding
                damaged areas in proper layers and finishing so the repair disappears into the wall.
              </p>
              <p>
                Doing one thing lets us do it carefully: knowing when a patch will do and when a wall needs a color coat,
                how to match a hand-troweled texture, and how to keep a parapet from leaking again.
              </p>
            </div>
          </div>
          <ResponsiveImage
            file={PHOTOS.additionFinish.file}
            alt={PHOTOS.additionFinish.alt}
            sizes="(min-width: 1024px) 440px, 100vw"
            className="h-auto w-full rounded-3xl object-cover shadow-card"
          />
        </div>
        <div className="mt-10 max-w-prose">
          <OwnerStorySlot />
          <TrustBadgesSlot />
        </div>
      </Section>

      <Section tone="sand" labelledBy="what-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="what-heading" className={h2}>What we do</h2>
            <p className={`${lead} mt-4`}>
              From a single crack to a full re-stucco, on traditional cement stucco and synthetic stucco alike.
            </p>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={servicePath(s.slug)} className="font-semibold text-chile-700 hover:underline">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h2}>Built around Albuquerque weather</h2>
            <p className={`${lead} mt-4`}>
              The way we repair and finish stucco is shaped by what walls here actually deal with:
            </p>
            <ul className="mt-6 space-y-3">
              {ABQ_FACTORS.map((f) => (
                <li key={f} className="flex gap-3 text-ink-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-chile-700" strokeWidth={3} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="light" labelledBy="values-heading">
        <h2 id="values-heading" className={h2}>How we work</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <li key={v.title} className="rounded-2xl bg-white p-6 shadow-card">
              <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{v.body}</p>
            </li>
          ))}
        </ul>
        <p className={`${lead} mt-8 max-w-prose`}>
          Curious what the process looks like?{' '}
          <Link to={PATHS.howItWorks} className="font-semibold text-chile-700 underline">
            See how it works, from inspection to walkthrough
          </Link>
          .
        </p>
      </Section>

      <Section tone="sand" labelledBy="where-heading">
        <h2 id="where-heading" className={h2}>Where we work</h2>
        <p className={`${lead} mt-4 max-w-prose`}>
          We’re based in {BUSINESS.address.city} and work across Bernalillo, Sandoval and Valencia counties and the East
          Mountains. Each area page covers what matters for stucco there, from valley parapets to mountain freeze-thaw.
        </p>
        <div className="mt-8"><AreaLinks areas={AREAS} /></div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
          <p className="text-ink-soft">
            Or call <CallLink location="about" className="font-semibold text-chile-700 underline" />.
          </p>
        </div>
      </Section>

      <ReviewsSlot />
    </>
  );
}
