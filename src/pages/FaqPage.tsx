import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { FaqList } from '../components/FaqList';
import { CallLink } from '../components/CallLink';
import { FAQ_GROUPS } from '../data/faqs';
import { h2 } from '../lib/ui';

export function FaqPage() {
  return (
    <>
      <PageHero title="Stucco FAQ">
        <p>
          Answers to the questions Albuquerque homeowners ask most about stucco repair, color coats and re-stucco. Don’t see yours? Call{' '}
          <CallLink location="faq-hero" className="font-semibold text-chile-700 underline" />.
        </p>
      </PageHero>
      <Section tone="light">
        <div className="mx-auto max-w-3xl space-y-14">
          {FAQ_GROUPS.map((g) => (
            <div key={g.heading}>
              <h2 className={h2}>{g.heading}</h2>
              <div className="mt-6"><FaqList items={g.items} /></div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
