import type { ReactNode } from 'react';
import { BUSINESS, telHref } from '../config/business';

/**
 * Click-to-call link. `location` is reported with the call-click conversion
 * (the inline listener from vite.config.ts tracks every tel: link; this just labels it).
 */
export function CallLink({
  location, className, children,
}: { location: string; className?: string; children?: ReactNode }) {
  return (
    <a href={telHref} data-call-location={location} className={className}>
      {children ?? BUSINESS.phoneDisplay}
    </a>
  );
}
