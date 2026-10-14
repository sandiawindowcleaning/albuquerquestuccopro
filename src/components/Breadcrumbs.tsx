import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { usePage } from './PageContext';

/** Visible breadcrumb trail. Mirrors the BreadcrumbList JSON-LD for the page. */
export function Breadcrumbs() {
  const { crumbs } = usePage();
  if (!crumbs.length) return null;
  const trail = [{ name: 'Home', path: '/' }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-stone-600">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-ink">{c.name}</span>
              ) : (
                <>
                  <Link to={c.path} className="hover:text-chile-700 hover:underline">{c.name}</Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
