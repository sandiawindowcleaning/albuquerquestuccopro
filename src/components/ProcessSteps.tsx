import { Link } from 'react-router-dom';
import { PROCESS_STEPS } from '../data/content';
import { PATHS } from '../lib/paths';
import { Icon } from './Icon';

/** Compact four-step strip used on home, service and city pages. */
export function ProcessSteps({ headingLevel = 3 }: { headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as 'h3' | 'h4';
  return (
    <>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-700">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-stone-600">Step {i + 1}</span>
            </div>
            <H className="mt-4 text-lg font-semibold text-ink">{s.title}</H>
            <p className="mt-2 leading-relaxed text-ink-soft">{s.summary}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6">
        <Link to={PATHS.howItWorks} className="font-semibold text-chile-700 underline-offset-4 hover:underline">
          See how the process works →
        </Link>
      </p>
    </>
  );
}
