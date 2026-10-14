import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Area } from '../data/types';
import { areaPath } from '../lib/paths';

export function AreaLinks({ areas, showCounty = false }: { areas: Area[]; showCounty?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a) => (
        <li key={a.slug}>
          <Link
            to={areaPath(a.slug)}
            className="flex items-start gap-3 rounded-xl border border-stone-300/70 bg-white px-4 py-3.5 transition hover:border-chile-600 hover:bg-chile-50"
          >
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-ink">{a.name}</span>
              {showCounty && <span className="block text-sm text-stone-600">{a.county}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
