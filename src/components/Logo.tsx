import { useId } from 'react';
import LOGO from '../generated/logo.json';

// A rising sun over the Sandia Mountains above a heavy "ALBUQUERQUE" and a
// spaced "STUCCO" between two rules, in New Mexico colors. The sun is a plain
// radial sun, not the Zia symbol. All shapes, including the lettering
// (outlined Montserrat), come from src/generated/logo.json, which
// `npm run brand` (scripts/brand.mjs) generates. Edit that script, not this.
//
//   variant="horizontal"  header: readable at phone size
//   variant="stacked"     footer and anywhere there's room

const TONES = {
  // On light backgrounds
  dark: { sun: '#F2B31B', back: '#9B1C24', front: '#6E141B', text: '#2A2522', sub: '#9B1C24', rule: '#0B7A75' },
  // On dark backgrounds
  light: { sun: '#F2B31B', back: '#EBDDC8', front: '#FBF6EE', text: '#FBF6EE', sub: '#EBDDC8', rule: '#F2B31B' },
};

type Tone = keyof typeof TONES;

function Mark({ tone }: { tone: Tone }) {
  const t = TONES[tone];
  const { sun, ground } = LOGO;
  return (
    <>
      <path d={LOGO.rays} stroke={t.sun} strokeWidth="3" strokeLinecap="round" />
      <circle cx={sun.cx} cy={sun.cy} r={sun.r} fill={t.sun} />
      <path d={LOGO.backRidge} fill={t.back} />
      <path d={LOGO.frontRidge} fill={t.front} />
      <rect x={ground.x} y={ground.y} width={ground.width} height={ground.height} rx="1.5" fill={t.front} />
    </>
  );
}

export function Logo({
  tone = 'dark', variant = 'horizontal', className = '',
}: { tone?: Tone; variant?: 'horizontal' | 'stacked'; className?: string }) {
  const clipId = useId();
  const t = TONES[tone];

  if (variant === 'stacked') {
    const v = LOGO.stacked;
    const [, , w, h] = v.viewBox.split(' ').map(Number);
    return (
      <svg viewBox={v.viewBox} width={w} height={h} role="img" aria-label="Albuquerque Stucco" className={className}>
        <Mark tone={tone} />
        <path d={v.name} fill={t.text} />
        <path d={v.sub} fill={t.sub} />
        <path d={v.rules} fill={t.rule} />
      </svg>
    );
  }

  const v = LOGO.horizontal;
  const [, , w, h] = v.viewBox.split(' ').map(Number);
  return (
    <svg viewBox={v.viewBox} width={w} height={h} role="img" aria-label="Albuquerque Stucco" className={className}>
      <defs>
        <clipPath id={clipId}>
          <rect {...v.clip} />
        </clipPath>
      </defs>
      <g transform={v.markTransform}>
        <g clipPath={`url(#${clipId})`}>
          <Mark tone={tone} />
        </g>
      </g>
      <path d={v.name} fill={t.text} />
      <path d={v.sub} fill={t.sub} />
      <path d={v.rules} fill={t.rule} />
    </svg>
  );
}
