import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../data/types';
import { servicePath } from '../lib/paths';
import { Icon } from './Icon';

export function ServiceCard({ service, blurb }: { service: Service; blurb?: string }) {
  return (
    <li className="group relative flex flex-col rounded-2xl border border-stone-300/70 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-chile-600">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chile-700 text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">
        <Link to={servicePath(service.slug)} className="after:absolute after:inset-0 after:content-['']">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{blurb ?? service.cardBlurb}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-chile-700">
        Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </li>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
    </ul>
  );
}
