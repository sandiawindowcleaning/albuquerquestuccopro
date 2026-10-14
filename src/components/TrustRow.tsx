import { Check } from 'lucide-react';

export function TrustRow({ items, tone = 'dark' }: { items: string[]; tone?: 'dark' | 'light' }) {
  const text = tone === 'dark' ? 'text-sand-50' : 'text-ink';
  const icon = tone === 'dark' ? 'bg-sun-400 text-ink' : 'bg-chile-700 text-white';
  return (
    <ul className={`grid gap-x-6 gap-y-2 sm:grid-cols-2 ${text}`}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium">
          <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${icon}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
