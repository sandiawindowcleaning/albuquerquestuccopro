import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ClipboardList } from 'lucide-react';
import { CallLink } from './CallLink';
import { PATHS } from '../lib/paths';

/**
 * Fixed Call | Free Inspection bar on phones (below md). On the home page the
 * second button scrolls to the hero form; elsewhere it opens the quote page.
 * It slides away while any element marked data-hides-mobile-bar (a lead
 * form) is in view so it never covers a submit
 * button. Layout adds matching bottom padding (incl. the iPhone safe area).
 */
export function MobileCallBar() {
  const { pathname } = useLocation();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    setFormInView(false);
    const els = document.querySelectorAll('[data-hides-mobile-bar]');
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
      setFormInView(visible.size > 0);
    }, { threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const toForm = (e: React.MouseEvent) => {
    const card = document.getElementById('inspection');
    if (!card) return;
    e.preventDefault();
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('h-firstName')?.focus({ preventScroll: true }), 450);
  };

  const action = 'flex h-14 items-center justify-center gap-2 font-semibold';
  return (
    <div
      inert={formInView}
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-stone-300 bg-sand-50 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(30_42_43/0.08)] transition-transform duration-200 motion-reduce:transition-none md:hidden ${
        formInView ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <CallLink location="mobile-bar" className={`${action} text-chile-700`}>
        <Phone className="h-5 w-5" aria-hidden="true" /> Call
      </CallLink>
      {pathname === '/' ? (
        <a href="#inspection" onClick={toForm} className={`${action} bg-turquoise-600 text-white`}>
          <ClipboardList className="h-5 w-5" aria-hidden="true" /> Free Inspection
        </a>
      ) : (
        <Link to={PATHS.quote} className={`${action} bg-turquoise-600 text-white`}>
          <ClipboardList className="h-5 w-5" aria-hidden="true" /> Free Quote
        </Link>
      )}
    </div>
  );
}
