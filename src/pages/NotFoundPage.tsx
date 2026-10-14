import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { CallLink } from '../components/CallLink';
import { PATHS } from '../lib/paths';
import { btn } from '../lib/ui';

const POPULAR = [
  { label: 'Stucco repair', to: '/services/stucco-repair/' },
  { label: 'All services', to: PATHS.services },
  { label: 'Service areas', to: PATHS.areas },
  { label: 'FAQ', to: PATHS.faq },
];

export function NotFoundPage() {
  return (
    <Section tone="sand" className="!py-20 sm:!py-28">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-turquoise-700">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">We couldn’t find that page</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        The link may be old or mistyped. Here are some places to start, or call{' '}
        <CallLink location="404" className="font-semibold text-chile-700 underline" />.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {POPULAR.map((p) => (
          <li key={p.to}><Link to={p.to} className="inline-block rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-ink hover:border-chile-600">{p.label}</Link></li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className={btn.primary}>Go to the home page</Link>
        <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
      </div>
    </Section>
  );
}
