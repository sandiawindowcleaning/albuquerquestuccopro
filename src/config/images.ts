// ─────────────────────────────────────────────────────────────────────────────
// Every image slot on the site. To use a real photo:
//   1. Put the file in src-images/ using the `file` name below (any of
//      .jpg/.png/.webp; 2400px wide or larger is ideal for the hero).
//   2. Set `placeholder: false` and write an accurate `alt`.
//   3. `npm run dev` or `npm run build` regenerates the AVIF/WebP sizes.
//
// A gallery slot with `placeholder: true` renders as a neutral "photo coming
// soon" tile and never claims to show a real project.
// ─────────────────────────────────────────────────────────────────────────────

export interface ImageSlot {
  file: string;
  alt: string;
  placeholder: boolean;
  caption?: string;
}

/** Real project photos used across the site. */
export const PHOTOS = {
  grayWall: {
    file: 'photo-gray-stucco-wall',
    alt: 'Gray stucco side wall of a single-story home with two white-framed windows and a gravel yard',
    placeholder: false,
    caption: 'Finished gray color coat',
  },
  windowBay: {
    file: 'photo-window-bay-patch',
    alt: 'Curved bay of tall windows with fresh base coat stucco around the openings on a tan stucco home',
    placeholder: false,
    caption: 'Stucco patched around new windows',
  },
  additionFinish: {
    file: 'photo-addition-finish-coat',
    alt: 'Plasterer applying an olive-green stucco finish coat to an addition, with windows masked and the ground covered in plastic',
    placeholder: false,
    caption: 'Finish coat on an addition',
  },
  windowOpenings: {
    file: 'photo-window-openings',
    alt: 'Two-story tan stucco home with stucco cut back around two new arched windows, lath exposed and ready for repair',
    placeholder: false,
    caption: 'Openings prepped after window replacement',
  },
} satisfies Record<string, ImageSlot>;

export const HERO_IMAGE: ImageSlot = PHOTOS.grayWall;

/** Photo shown on each service page, by service slug. Omit a slug for none. */
export const SERVICE_PHOTOS: Record<string, ImageSlot> = {
  'stucco-repair': PHOTOS.windowBay,
  'restucco': PHOTOS.additionFinish,
  'stucco-color-coat': PHOTOS.grayWall,
  'stucco-water-damage-repair': PHOTOS.windowOpenings,
  'eifs-synthetic-stucco-repair': PHOTOS.windowBay,
  'stucco-garden-walls': PHOTOS.grayWall,
};

/** Default Open Graph / social share image (1200×630). */
export const OG_IMAGE: ImageSlot = {
  file: 'og-default',
  alt: 'Albuquerque Stucco',
  placeholder: false,
};

/** Gallery grid. Add or remove slots freely. */
export const GALLERY: ImageSlot[] = [
  PHOTOS.additionFinish,
  PHOTOS.windowOpenings,
  PHOTOS.windowBay,
  PHOTOS.grayWall,
];
