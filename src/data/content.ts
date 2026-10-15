import type { Benefit, IconName } from './types';

/** Home page "why us" grid: the core content angles. */
export const HOME_BENEFITS: Benefit[] = [
  {
    icon: 'search',
    title: 'We fix the cause, not just the crack',
    body: 'A crack or stain is a symptom. We look for the movement, the leaking canale or the sprinkler behind it, so the repair lasts.',
  },
  {
    icon: 'brick-wall',
    title: 'Texture that matches',
    body: 'Smooth, sand, dash or hand-troweled Santa Fe. We match your existing texture so repairs blend into the wall.',
  },
  {
    icon: 'palette',
    title: 'Honest about color',
    body: 'Sun-aged stucco is hard to match exactly. We’ll tell you when a patch will show and when a corner-to-corner color coat is the better choice.',
  },
  {
    icon: 'droplets',
    title: 'Built to keep water out',
    body: 'Parapets, canales, flashing and weep screed done right, so monsoon rain and snowmelt run off the wall instead of into it.',
  },
  {
    icon: 'sun',
    title: 'Made for the high desert',
    body: 'Strong sun, spring wind, monsoon storms and freezing nights. We choose materials and schedule work with Albuquerque weather in mind.',
  },
  {
    icon: 'sparkles',
    title: 'Clean, careful job sites',
    body: 'Windows, landscaping and walkways are protected while we work, and we clean up before we leave.',
  },
];

export interface ProcessStep {
  icon: IconName;
  title: string;
  summary: string;
  detail: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: 'search',
    title: 'Free on-site inspection',
    summary: 'We come out, look at the stucco and talk through what you’re seeing.',
    detail: [
      'We look at the damage up close, check for signs of water and movement, and figure out whether you have traditional or synthetic stucco. We also check the parapets, canales, flashing and the base of the walls, because that’s where problems usually start.',
      'If you’re thinking about a new color or texture, we bring samples so you can see them on your own walls in daylight.',
    ],
  },
  {
    icon: 'ruler',
    title: 'Clear written estimate',
    summary: 'You get a written estimate that explains exactly what we’ll do and why.',
    detail: [
      'The estimate spells out the scope: what gets repaired, what gets removed, the finish and color, and an expected timeline. If there’s more than one way to fix the problem, we explain the options.',
      'No pressure to decide on the spot.',
    ],
  },
  {
    icon: 'wrench',
    title: 'Prep, repair and finish',
    summary: 'We protect your property, do the repair in proper layers and finish it to match.',
    detail: [
      'We cover windows, doors and landscaping, remove damaged material, correct any lath, flashing or weep screed issues and rebuild the stucco coat by coat, giving each coat time to cure. Then we apply the finish in the texture and color you chose.',
      'We schedule around the weather, because stucco shouldn’t freeze or bake while it cures.',
    ],
  },
  {
    icon: 'sparkles',
    title: 'Walkthrough and cleanup',
    summary: 'We clean up and walk the finished work with you.',
    detail: [
      'We remove debris, clean walkways and windows, and walk around the house with you to look at the finished work. We also point out anything worth watching, like a sprinkler head that hits the wall or a canale that drains toward the house.',
      'If you have questions later, you call the same number you called the first time.',
    ],
  },
];
