import { Link } from 'react-router-dom';
import { Phone, ClipboardList } from 'lucide-react';
import { CallLink } from './CallLink';
import { PATHS } from '../lib/paths';

/** Fixed Call | Free Quote bar on phones. Layout adds matching bottom padding. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-stone-300 bg-sand-50 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(30_42_43/0.08)] md:hidden">
      <CallLink location="mobile-bar" className="flex h-14 items-center justify-center gap-2 font-semibold text-chile-700">
        <Phone className="h-5 w-5" aria-hidden="true" /> Call
      </CallLink>
      <Link to={PATHS.quote} className="flex h-14 items-center justify-center gap-2 bg-turquoise-600 font-semibold text-white">
        <ClipboardList className="h-5 w-5" aria-hidden="true" /> Free Quote
      </Link>
    </div>
  );
}
