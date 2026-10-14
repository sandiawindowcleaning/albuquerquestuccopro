import { ChevronDown } from 'lucide-react';
import type { Faq } from '../data/types';

/**
 * Native <details> accordion: works without JavaScript, so crawlers and the
 * prerendered HTML see every answer. Pages that render this must also emit
 * faqNode() with the same items (routes.tsx does that).
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-stone-300 rounded-2xl border border-stone-300 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[17px] font-semibold text-ink">{f.q}</h3>
            <ChevronDown className="h-5 w-5 shrink-0 text-chile-700 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-5 leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
