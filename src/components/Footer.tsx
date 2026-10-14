import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { CallLink } from './CallLink';
import { BUSINESS, isPlaceholder, locationLine, mailHref, socialLinks } from '../config/business';
import { SERVICES } from '../data/services';
import { AREAS } from '../data/areas';
import { PATHS, areaPath, servicePath } from '../lib/paths';
import { container } from '../lib/ui';

const COMPANY = [
  { label: 'How It Works', to: PATHS.howItWorks },
  { label: 'Gallery', to: PATHS.gallery },
  { label: 'FAQ', to: PATHS.faq },
  { label: 'About', to: PATHS.about },
  { label: 'Contact', to: PATHS.contact },
  { label: 'Get a Free Quote', to: PATHS.quote },
];

const linkCls = 'text-sand-200 hover:text-white';
const headCls = 'mb-3 text-sm font-semibold uppercase tracking-wider text-sun-400';

export function Footer() {
  return (
    <footer className="bg-chile-900 text-sand-100">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr]`}>
        <div>
          <Logo tone="light" variant="stacked" className="h-24 w-auto" />
          <p className="mt-4 max-w-xs text-sand-200">{BUSINESS.tagline} Based in {BUSINESS.address.city}, serving the metro and nearby towns.</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sun-400" aria-hidden="true" />
              <CallLink location="footer" className={linkCls} />
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sun-400" aria-hidden="true" />
              <a href={mailHref} className={linkCls}>{BUSINESS.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sun-400" aria-hidden="true" />
              <address className="not-italic text-sand-200">
                {!isPlaceholder(BUSINESS.address.street) && <>{BUSINESS.address.street}<br /></>}{locationLine}
              </address>
            </li>
            {BUSINESS.hours.confirmed && (
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sun-400" aria-hidden="true" />
                <span className="text-sand-200">{BUSINESS.hours.display}</span>
              </li>
            )}
          </ul>
          {socialLinks.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4 text-sm">
              {socialLinks.map((s) => (
                <li key={s.key}>
                  <a href={s.url} className={linkCls} rel="noopener" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Services">
          <p className={headCls}>Services</p>
          <ul className="space-y-2 text-[15px]">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to={servicePath(s.slug)} className={linkCls}>{s.shortName}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <p className={headCls}>Service Areas</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] md:grid-cols-1 lg:grid-cols-2">
            {AREAS.map((a) => (
              <li key={a.slug}><Link to={areaPath(a.slug)} className={linkCls}>{a.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className={headCls}>Company</p>
          <ul className="space-y-2 text-[15px]">
            {COMPANY.map((c) => (
              <li key={c.to}><Link to={c.to} className={linkCls}>{c.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-2 py-6 text-sm text-sand-200 sm:flex-row sm:items-center sm:justify-between`}>
          <p>© {__BUILD_YEAR__} {BUSINESS.name}. All rights reserved.</p>
          <p className="flex gap-4">
            <Link to={PATHS.privacy} className={linkCls}>Privacy Policy</Link>
            <Link to={PATHS.terms} className={linkCls}>Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
