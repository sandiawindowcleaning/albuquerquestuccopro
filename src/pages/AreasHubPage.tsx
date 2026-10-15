import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { AreaLinks } from '../components/AreaLinks';
import { CallLink } from '../components/CallLink';
import { AREAS } from '../data/areas';
import { h2, lead } from '../lib/ui';

export function AreasHubPage() {
  return (
    <>
      <PageHero title="Stucco Service Areas Around Albuquerque">
        <p>
          Albuquerque Stucco is based in Albuquerque and works across the metro, Sandoval and Valencia counties and the
          East Mountains. Pick your area to see what matters for stucco there.
        </p>
      </PageHero>
      <Section tone="light" labelledBy="list-heading">
        <h2 id="list-heading" className={h2}>Cities and communities we serve</h2>
        <div className="mt-8"><AreaLinks areas={AREAS} showCounty /></div>
        <p className={`${lead} mt-8`}>
          Don’t see your city? We may still be able to help. Call{' '}
          <CallLink location="areas-hub" className="font-semibold text-chile-700 underline" /> and ask.
        </p>
      </Section>
    </>
  );
}
