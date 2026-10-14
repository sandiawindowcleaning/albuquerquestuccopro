// Responsive image pipeline. Runs before every `npm run dev` and `npm run build`.
//
//   src-images/<name>.(jpg|jpeg|png|webp|avif)   ← originals you drop in
//        ↓
//   public/images/<name>-<hash>-<width>.(avif|webp|jpg)   ← served (gitignored)
//   src/generated/image-meta.json                         ← sizes + hash (committed)
//
// The content hash is in every filename, so /images/* can be cached as
// immutable: replacing a photo produces new URLs automatically.
//
// To swap a placeholder for a real photo: overwrite src-images/<name>.jpg
// (keep the same name), then set `placeholder: false` for that slot in
// src/config/images.ts.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src-images');
const OUT = path.join(ROOT, 'public/images');
const META = path.join(ROOT, 'src/generated/image-meta.json');

// Candidate widths. Each image gets every width up to its own size.
const WIDTHS = [480, 768, 1024, 1440, 1920];

mkdirSync(OUT, { recursive: true });
mkdirSync(path.dirname(META), { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
const meta = {};
let generated = 0;

for (const file of files.sort()) {
  const name = file.replace(/\.[^.]+$/, '');
  const buf = readFileSync(path.join(SRC, file));
  const hash = createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const img = sharp(buf).rotate(); // honour EXIF orientation from phone photos
  const { width, height } = await img.metadata();
  if (!width || !height) throw new Error(`[images] cannot read size of ${file}`);

  // og-* images are social cards: one JPG, no srcset needed.
  const isSocial = name.startsWith('og-');
  const widths = isSocial ? [width] : WIDTHS.filter((w) => w <= width);
  if (!isSocial && (widths.length === 0 || widths[widths.length - 1] < width && width < 1920)) {
    widths.push(width);
  }
  const formats = isSocial ? ['jpg'] : ['avif', 'webp', 'jpg'];

  for (const w of widths) {
    for (const fmt of formats) {
      const out = path.join(OUT, `${name}-${hash}-${w}.${fmt}`);
      if (existsSync(out)) continue;
      let pipeline = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
      if (fmt === 'avif') pipeline = pipeline.avif({ quality: 50, effort: 4 });
      if (fmt === 'webp') pipeline = pipeline.webp({ quality: 72 });
      if (fmt === 'jpg') pipeline = pipeline.jpeg({ quality: 76, mozjpeg: true, progressive: true });
      await pipeline.toFile(out);
      generated += 1;
    }
  }

  // Rotation can swap the axes; report the oriented size.
  const oriented = await sharp(buf).rotate().metadata();
  const ow = oriented.autoOrient?.width ?? oriented.width;
  const oh = oriented.autoOrient?.height ?? oriented.height;
  meta[name] = { hash, width: ow, height: oh, widths, formats };
}

const json = `${JSON.stringify(meta, null, 2)}\n`;
const prev = existsSync(META) ? readFileSync(META, 'utf-8') : '';
if (json !== prev) writeFileSync(META, json);
console.log(`[images] ${files.length} source image(s), ${generated} file(s) generated`);
