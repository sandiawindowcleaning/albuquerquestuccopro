import type { ReactNode } from 'react';
import { container } from '../lib/ui';

const TONES = {
  light: 'bg-sand-50',
  sand: 'bg-sand-100',
  dark: 'bg-chile-900 text-sand-50',
  white: 'bg-white',
};

export function Section({
  tone = 'light', id, className = '', children, labelledBy,
}: { tone?: keyof typeof TONES; id?: string; className?: string; children: ReactNode; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${TONES[tone]} py-14 sm:py-20 ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}
