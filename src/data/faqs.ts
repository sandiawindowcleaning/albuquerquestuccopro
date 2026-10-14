import type { Faq } from './types';

export interface FaqGroup {
  heading: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: 'Stucco basics',
    items: [
      {
        q: 'What’s the difference between traditional stucco and synthetic stucco?',
        a: 'Traditional stucco is a cement-based plaster applied in coats over lath or masonry, and it’s hard and solid to the touch. Synthetic stucco, or EIFS, is foam insulation board covered with a mesh-reinforced base coat and an acrylic finish. It sounds more hollow when tapped. They’re repaired with different materials, so it matters which one you have.',
      },
      {
        q: 'Are cracks in stucco normal?',
        a: 'Fine hairline cracks are common in cement stucco and are often cosmetic. Cracks that are wider, growing, running diagonally from window and door corners, or offset (one side sticking out past the other) are worth having looked at, because they can let water in or point to movement.',
      },
      {
        q: 'What is a color coat?',
        a: 'A color coat is the final, textured finish layer of stucco, and it carries the color. Applying a new color coat over sound stucco gives the whole wall an even color and fresh texture, without a full re-stucco.',
      },
      {
        q: 'What stucco textures can you do?',
        a: 'Common finishes include smooth, sand, light and heavy dash, and hand-troweled Santa Fe finishes. We can match your existing texture or change it as part of a color coat or re-stucco.',
      },
    ],
  },
  {
    heading: 'Estimates and the process',
    items: [
      {
        q: 'How much does stucco work cost?',
        a: 'It depends on the type of work, the size of the area, what caused the damage, the condition of the existing stucco and the finish you choose. We give you a written estimate after looking at your home in person, and we don’t guess at prices without seeing the wall.',
      },
      {
        q: 'Is the estimate really free?',
        a: 'Yes. The on-site inspection and your written estimate are free, and you’re under no obligation.',
      },
      {
        q: 'How long does a stucco job take?',
        a: 'A small repair can often be done quickly, but each coat of stucco needs time to cure before the next goes on, and the finish needs good weather. Larger jobs such as a full re-stucco take longer. You’ll get an expected timeline with your estimate.',
      },
      {
        q: 'Do I need to be home while you work?',
        a: 'Not for most of the job, as long as we have access to the walls we’re working on. We like to walk through the work with you at the start and again when we finish.',
      },
      {
        q: 'Do I need HOA approval to change my stucco color?',
        a: 'Many HOAs and some historic areas have color and finish guidelines. Check yours before changing color. We can provide samples and product details for your application.',
      },
      {
        q: 'Do you offer a warranty?',
        a: 'We’ll give you the details of any warranty in writing with your estimate.',
      },
    ],
  },
  {
    heading: 'Weather and care',
    items: [
      {
        q: 'Can stucco work be done in winter?',
        a: 'Stucco must not freeze while it cures, so cold-weather work needs planning. Smaller repairs can often be done on mild winter days. Larger jobs are best scheduled for spring through fall, and we plan around monsoon storms in late summer.',
      },
      {
        q: 'Why does water damage stucco?',
        a: 'Water that gets behind the stucco, through cracks, parapets, canales or failed flashing, can rust lath, break the bond between coats and cause bubbling, staining and crumbling. In winter it freezes and widens cracks. Keeping water out is the most important part of stucco maintenance.',
      },
      {
        q: 'How do I take care of my stucco?',
        a: 'Keep sprinklers from hitting the walls, keep soil and mulch below the weep screed at the base of the wall, make sure canales and gutters drain away from the house, and have cracks sealed before winter. Don’t pressure wash stucco at close range, which can damage the finish.',
      },
      {
        q: 'Can I just paint my stucco?',
        a: 'You can, but paint is a thin film that can trap moisture and peel, and once stucco is painted it limits what can go over it later. A stucco color coat or a coating designed for stucco is usually a better long-term choice. We’ll explain the options for your home.',
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

const pick = (...questions: string[]) =>
  questions.map((q) => {
    const f = ALL_FAQS.find((x) => x.q === q);
    if (!f) throw new Error(`FAQ not found: ${q}`);
    return f;
  });

/** Shown on the home page (and marked up as FAQPage there). */
export const HOME_FAQS = pick(
  'How much does stucco work cost?',
  'Are cracks in stucco normal?',
  'What is a color coat?',
  'Can stucco work be done in winter?',
);

/** Shown on How It Works. */
export const PROCESS_FAQS = pick(
  'Is the estimate really free?',
  'How long does a stucco job take?',
  'Do I need to be home while you work?',
);
