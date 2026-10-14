import { imageMeta, imageUrl, srcSet } from '../lib/images';

interface Props {
  file: string;
  alt: string;
  /** The `sizes` attribute. Be accurate: it decides which file phones download. */
  sizes: string;
  /** Only for the one above-the-fold image (the LCP element). */
  priority?: boolean;
  className?: string;
}

/**
 * AVIF → WebP → JPG <picture> with explicit width/height (no layout shift).
 * Lazy-loaded unless `priority` is set.
 */
export function ResponsiveImage({ file, alt, sizes, priority = false, className }: Props) {
  const m = imageMeta(file);
  if (!m) return null;
  const mid = m.widths[Math.min(1, m.widths.length - 1)];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(file, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(file, 'webp')} sizes={sizes} />
      <img
        src={imageUrl(file, mid, 'jpg')}
        srcSet={srcSet(file, 'jpg')}
        sizes={sizes}
        width={m.width}
        height={m.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  );
}
