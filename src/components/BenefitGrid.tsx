import type { Benefit } from '../data/types';
import { Icon } from './Icon';

export function BenefitGrid({ items }: { items: Benefit[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((b) => (
        <li key={b.title} className="rounded-2xl border border-stone-300/70 bg-white p-6 shadow-card">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-chile-50 text-chile-700">
            <Icon name={b.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-ink">{b.title}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{b.body}</p>
        </li>
      ))}
    </ul>
  );
}
