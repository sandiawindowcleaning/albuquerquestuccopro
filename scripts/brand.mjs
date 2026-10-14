// Brand asset generator. Run `npm run brand` after changing the logo.
//
// Logo style follows the owner's other brands (Sandia Window Cleaning, DK
// Mobile Wash): a landmark illustration over a big, heavy all-caps name, with
// a small letter-spaced line underneath. Here: a rising sun over the Sandia
// Mountains (two ridges) above "ALBUQUERQUE" / "— STUCCO —". The sun is a
// plain radial sun, deliberately not the Zia symbol, which is sacred to Zia
// Pueblo.
//
// Text is converted to outlines (Montserrat via opentype.js), so the logo
// looks identical everywhere, with no font loading needed.
//
// Writes:
//   src/generated/logo.json    ← path data used by src/components/Logo.tsx
//   public/logo.svg            ← full logo (GBP, email signature, print)
//   public/favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png
//   src-images/og-default.jpg  ← social share card (images.mjs resizes it)
import { writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// New Mexico palette: chile red, sun yellow, turquoise, adobe neutrals.
const C = {
  red: '#9B1C24', redDeep: '#6E141B', redDark: '#4A0E14', sun: '#F2B31B',
  turq: '#0B7A75', sand: '#FBF6EE', sand200: '#EBDDC8', ink: '#2A2522',
};

const fontFile = (w) => path.join(ROOT, `node_modules/@fontsource/montserrat/files/montserrat-latin-${w}-normal.woff`);
const loadFont = (w) => {
  const buf = readFileSync(fontFile(w));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const heavy = loadFont(800);
const bold = loadFont(700);

/**
 * Outline `text`, then scale it to exactly `width` units wide, centred on
 * `cx`, with its baseline at `baseline`. `tracking` is extra space between
 * letters, in em.
 */
function textPath(font, text, { width, cx, baseline, tracking = 0 }) {
  const size = 100;
  const cmds = [];
  let x = 0;
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    cmds.push(...g.getPath(x, 0, size).commands);
    x += (g.advanceWidth / font.unitsPerEm) * size;
    if (i < glyphs.length - 1) {
      x += (font.getKerningValue(g, glyphs[i + 1]) / font.unitsPerEm) * size + tracking * size;
    }
  });
  const p = new opentype.Path();
  p.commands = cmds;
  const bb = p.getBoundingBox();
  const s = width / (bb.x2 - bb.x1);
  const dx = cx - (width / 2) - bb.x1 * s;
  const r = (n) => Math.round(n * 100) / 100;
  const d = cmds.map((c) => {
    const pt = (px, py) => `${r(px * s + dx)} ${r(py * s + baseline)}`;
    switch (c.type) {
      case 'M': return `M${pt(c.x, c.y)}`;
      case 'L': return `L${pt(c.x, c.y)}`;
      case 'Q': return `Q${pt(c.x1, c.y1)} ${pt(c.x, c.y)}`;
      case 'C': return `C${pt(c.x1, c.y1)} ${pt(c.x2, c.y2)} ${pt(c.x, c.y)}`;
      default: return 'Z';
    }
  }).join('');
  return { d, height: r((bb.y2 - bb.y1) * s) };
}

// ── Mark ───────────────────────────────────────────────────────────────────
// Ground line at y=78 in a 240-wide box. Sun rises behind the back ridge.
const G = 78;
const sun = { cx: 120, cy: 50, r: 15 };
const rays = Array.from({ length: 9 }, (_, i) => {
  const a = (-170 + i * 20) * (Math.PI / 180);
  const p = (r) => `${(sun.cx + Math.cos(a) * r).toFixed(2)} ${(sun.cy + Math.sin(a) * r).toFixed(2)}`;
  return `M${p(20)}L${p(29)}`;
}).join('');
const backRidge =
  `M12 ${G}L34 68L52 62L70 57L84 52L96 55L108 60L118 63L130 58L146 51L160 45L172 47L184 52L198 59L214 68L228 ${G}Z`;
const frontRidge = `M12 ${G}L46 72L78 69L104 72L136 66L168 70L196 68L228 ${G}Z`;
const ground = { x: 12, y: G, width: 216, height: 3 };
const markTop = sun.cy - 29 - 2; // top of the rays

const NAME = 'ALBUQUERQUE';
const SUB = 'STUCCO';
const nameText = textPath(heavy, NAME, { width: 216, cx: 120, baseline: 110 });
const sub = textPath(bold, SUB, { width: 92, cx: 120, baseline: 132, tracking: 0.42 });
const subMid = 132 - sub.height / 2;
const subRules = `M12 ${subMid - 0.9}H62V${subMid + 0.9}H12ZM178 ${subMid - 0.9}H228V${subMid + 0.9}H178Z`;

// Horizontal lockup for the site header: mark on the left, name stacked right.
const clip = { x: 44, y: 0, width: 152, height: 90 };
const markScale = 40 / (G + 3 - markTop);
const markW = clip.width * markScale;
const hzLeft = markW + 10;
const hzWidth = 150;
const hzCx = hzLeft + hzWidth / 2;
const hzSub = textPath(bold, SUB, { width: 64, cx: hzCx, baseline: 40, tracking: 0.42 });
const hzSubMid = 40 - hzSub.height / 2;
const LOGO = {
  stacked: {
    viewBox: `0 ${markTop} 240 ${136 - markTop}`,
    name: nameText.d,
    sub: sub.d,
    rules: subRules,
  },
  horizontal: {
    viewBox: `0 0 ${Math.ceil(hzLeft + hzWidth + 1)} 44`,
    markTransform: `translate(${(-clip.x * markScale).toFixed(3)} ${(2 - markTop * markScale).toFixed(3)}) scale(${markScale.toFixed(4)})`,
    clip,
    name: textPath(heavy, NAME, { width: hzWidth, cx: hzCx, baseline: 24 }).d,
    sub: hzSub.d,
    rules: `M${hzLeft} ${hzSubMid - 0.6}H${hzCx - 38}V${hzSubMid + 0.6}H${hzLeft}ZM${hzCx + 38} ${hzSubMid - 0.6}H${hzLeft + hzWidth}V${hzSubMid + 0.6}H${hzCx + 38}Z`,
  },
  rays,
  sun,
  backRidge,
  frontRidge,
  ground,
};
writeFileSync(path.join(ROOT, 'src/generated/logo.json'), `${JSON.stringify(LOGO, null, 2)}\n`);

// ── SVG builders ───────────────────────────────────────────────────────────
function markBody({ sunFill = C.sun, back = C.red, front = C.redDeep }) {
  return `<path d="${rays}" stroke="${sunFill}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="${sun.cx}" cy="${sun.cy}" r="${sun.r}" fill="${sunFill}"/>
  <path d="${backRidge}" fill="${back}"/>
  <path d="${frontRidge}" fill="${front}"/>
  <rect x="${ground.x}" y="${ground.y}" width="${ground.width}" height="${ground.height}" rx="1.5" fill="${front}"/>`;
}
function logoBody({ text = C.ink, accent = C.red, rule = C.turq, ...m } = {}) {
  return `${markBody(m)}
  <path d="${nameText.d}" fill="${text}"/>
  <path d="${sub.d}" fill="${accent}"/>
  <path d="${subRules}" fill="${rule}"/>`;
}
const [, vy, vw, vh] = LOGO.stacked.viewBox.split(' ').map(Number);
const logoSvg = (opts) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO.stacked.viewBox}" width="${vw * 2}" height="${vh * 2}">\n  ${logoBody(opts)}\n</svg>\n`;

/** Square icon: the mark on a chile-red tile. No words at favicon size. */
function iconSvg(size) {
  const scale = 0.8;
  const tx = 50 - 120 * scale;
  const ty = 50 - ((markTop + G + 3) / 2) * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs><clipPath id="c"><rect width="100" height="100" rx="22"/></clipPath></defs>
  <rect width="100" height="100" rx="22" fill="${C.red}"/>
  <g clip-path="url(#c)"><g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale})">
    ${markBody({ back: C.sand200, front: C.sand })}
  </g></g>
</svg>`;
}

writeFileSync(path.join(ROOT, 'public/logo.svg'), logoSvg());
writeFileSync(path.join(ROOT, 'public/favicon.svg'), iconSvg(32));
const png = (svg, size, file) =>
  sharp(Buffer.from(svg), { density: 400 }).resize(size, size).png().toFile(path.join(ROOT, file));
await png(iconSvg(180), 180, 'public/apple-touch-icon.png');
await png(iconSvg(192), 192, 'public/icon-192.png');
await png(iconSvg(512), 512, 'public/icon-512.png');

// Social card: the full logo, reversed, on chile red with a sun-yellow rule.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.red}"/>
  <rect y="566" width="1200" height="64" fill="${C.redDark}"/>
  <rect y="560" width="1200" height="6" fill="${C.sun}"/>
  <g transform="translate(330 ${95 - vy * 2.25}) scale(2.25)">${logoBody({ text: C.sand, accent: C.sand200, rule: C.sun, back: C.sand200, front: C.sand })}</g>
  <text x="600" y="470" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="${C.sand200}">Stucco repair, re-stucco and color coats in Albuquerque</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 90 }).toFile(path.join(ROOT, 'src-images/og-default.jpg'));

console.log('[brand] wrote logo.json, logo.svg, favicon, app icons and og-default.jpg');
