import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { CallLink } from './CallLink';
import { BUSINESS } from '../config/business';
import { SERVICES } from '../data/services';
import { PATHS, servicePath } from '../lib/paths';
import { btn, container } from '../lib/ui';

// Desktop nav is kept short so it fits on one line at 1280px.
const NAV = [
  { label: 'Service Areas', to: PATHS.areas },
  { label: 'How It Works', to: PATHS.howItWorks },
  { label: 'FAQ', to: PATHS.faq },
  { label: 'About', to: PATHS.about },
  { label: 'Contact', to: PATHS.contact },
];
// The mobile menu has room for everything.
const MOBILE_NAV = [...NAV.slice(0, 2), { label: 'Gallery', to: PATHS.gallery }, ...NAV.slice(2)];

const navLink = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-medium transition hover:text-chile-700 ${isActive ? 'text-chile-700' : 'text-ink'}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-300/70 bg-sand-50/95 backdrop-blur supports-[backdrop-filter]:bg-sand-50/85">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-24 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="Albuquerque Stucco home">
          <Logo variant="horizontal" className="h-11 w-auto sm:h-12 lg:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            <li className="group relative">
              <NavLink to={PATHS.services} className={navLink}>
                <span className="inline-flex items-center gap-1">
                  Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </NavLink>
              <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="rounded-xl border border-stone-300 bg-white p-2 shadow-card">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link to={servicePath(s.slug)} className="block rounded-lg px-3 py-2 text-[15px] text-ink hover:bg-sand-100">
                        {s.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={navLink}>{n.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CallLink
            location="header"
            className="hidden items-center gap-2 whitespace-nowrap font-semibold text-chile-700 hover:text-chile-900 md:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </CallLink>
          <CallLink
            location="header-icon"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-chile-50 text-chile-700 md:hidden"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Call {BUSINESS.phoneDisplay}</span>
          </CallLink>
          <Link to={PATHS.quote} className={`${btn.quote} hidden whitespace-nowrap !px-5 !py-2.5 text-[15px] sm:inline-flex`}>
            Get a Free Quote
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand-100 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-stone-300 bg-sand-50 xl:hidden">
        <nav aria-label="Mobile" className={`${container} py-4`}>
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-stone-600">Services</p>
          <ul className="mb-3">
            <li><Link to={PATHS.services} className="block rounded-lg px-3 py-2.5 font-medium text-ink hover:bg-sand-100">All services</Link></li>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s.slug)} className="block rounded-lg px-3 py-2.5 text-ink hover:bg-sand-100">{s.shortName}</Link>
              </li>
            ))}
          </ul>
          <ul className="border-t border-stone-300 pt-3">
            {MOBILE_NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block rounded-lg px-3 py-2.5 font-medium text-ink hover:bg-sand-100">{n.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link to={PATHS.quote} className={btn.quote}>Get a Free Quote</Link>
            <CallLink location="mobile-menu" className={btn.outline}>Call {BUSINESS.phoneDisplay}</CallLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
