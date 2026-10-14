import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ServiceGrid } from '../components/ServiceCard';
import { AreaLinks } from '../components/AreaLinks';
import { SERVICES } from '../data/services';
import { AREAS } from '../data/areas';
import { servicePath } from '../lib/paths';
import { h2, lead } from '../lib/ui';

const GUIDE = [
  { problem: 'Cracks, holes or chipped corners', fix: 'Stucco repair', slug: 'stucco-repair' },
  { problem: 'Faded, chalky or patchy color', fix: 'Color coat & recoat', slug: 'stucco-color-coat' },
  { problem: 'Stains, bubbling or soft stucco below a parapet or canale', fix: 'Water damage & parapet repair', slug: 'stucco-water-damage-repair' },
  { problem: 'Cracked or loose stucco all over the house', fix: 'Re-stucco', slug: 'restucco' },
  { problem: 'Hail dents or holes in a wall that sounds hollow', fix: 'EIFS & synthetic stucco repair', slug: 'eifs-synthetic-stucco-repair' },
  { problem: 'Bare, cracked or crumbling block walls', fix: 'Garden walls & fences', slug: 'stucco-garden-walls' },
];

export function ServicesHubPage() {
  return (
    <>
      <PageHero title="Stucco Services in Albuquerque">
        <p>
          From a single crack to a full re-stucco, on traditional cement stucco and synthetic stucco. Here’s what we offer
          and how to tell which one fits what you’re seeing on your walls.
        </p>
      </PageHero>

      <Section tone="light" labelledBy="all-heading">
        <h2 id="all-heading" className={h2}>Our services</h2>
        <div className="mt-8"><ServiceGrid services={SERVICES} /></div>
      </Section>

      <Section tone="sand" labelledBy="guide-heading">
        <div className="max-w-2xl">
          <h2 id="guide-heading" className={h2}>Which service do you need?</h2>
          <p className={`${lead} mt-3`}>Start with what you’re seeing. Not sure? We’ll tell you at the free estimate.</p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-stone-300 bg-white">
          <table className="w-full text-left">
            <thead className="bg-chile-900 text-sand-50">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">If your problem is…</th>
                <th scope="col" className="px-5 py-3 font-semibold">Start with</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {GUIDE.map((g) => (
                <tr key={g.slug}>
                  <td className="px-5 py-4 text-ink-soft">{g.problem}</td>
                  <td className="px-5 py-4">
                    <Link to={servicePath(g.slug)} className="font-semibold text-chile-700 hover:underline">{g.fix}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="light" labelledBy="areas-heading">
        <h2 id="areas-heading" className={h2}>Where we work</h2>
        <div className="mt-6"><AreaLinks areas={AREAS} /></div>
      </Section>
    </>
  );
}
