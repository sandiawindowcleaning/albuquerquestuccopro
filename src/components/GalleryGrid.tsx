import { Camera } from 'lucide-react';
import type { ImageSlot } from '../config/images';
import { imageMeta } from '../lib/images';
import { ResponsiveImage } from './ResponsiveImage';

/**
 * Swappable photo slots. A slot shows its photo only when it's marked
 * `placeholder: false` in src/config/images.ts AND the file exists in
 * src-images/. Otherwise it renders an honest "photo coming soon" tile.
 */
export function GalleryGrid({ slots }: { slots: ImageSlot[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slots.map((s) => {
        const real = !s.placeholder && imageMeta(s.file);
        return (
          <li key={s.file}>
            <figure className="overflow-hidden rounded-2xl border border-stone-300/70 bg-white shadow-card">
              {real ? (
                <ResponsiveImage
                  file={s.file}
                  alt={s.alt}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] h-auto w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand-100 to-sand-200 text-stone-600">
                  <Camera className="h-8 w-8" aria-hidden="true" />
                  <span className="text-sm font-medium">Photo coming soon</span>
                </div>
              )}
              {s.caption && <figcaption className="px-4 py-3 text-[15px] font-medium text-ink">{s.caption}</figcaption>}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

export const hasRealPhotos = (slots: ImageSlot[]) => slots.some((s) => !s.placeholder && imageMeta(s.file));
