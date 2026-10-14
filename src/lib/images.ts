import meta from '../generated/image-meta.json';

export interface ImageMeta {
  hash: string;
  width: number;
  height: number;
  widths: number[];
  formats: string[];
}

const META = meta as Record<string, ImageMeta>;

export function imageMeta(file: string): ImageMeta | null {
  return META[file] ?? null;
}

export function imageUrl(file: string, width: number, fmt: string): string {
  const m = META[file];
  if (!m) throw new Error(`[images] no generated image for "${file}". Is it in src-images/?`);
  return `/images/${file}-${m.hash}-${width}.${fmt}`;
}

export function srcSet(file: string, fmt: string): string {
  const m = META[file];
  if (!m) return '';
  return m.widths.map((w) => `${imageUrl(file, w, fmt)} ${w}w`).join(', ');
}

/** Largest JPG, for og:image and fallback src. */
export function largestJpg(file: string): string {
  const m = META[file];
  if (!m) return '';
  return imageUrl(file, m.widths[m.widths.length - 1], 'jpg');
}

/** Hero preload hint. Mirrors the <source type="image/avif"> exactly. */
export const HERO_SIZES = '100vw';
