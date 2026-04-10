// scripts/download-and-process-images.mjs
//
// Downloads the 17 generated trip-blog images from Google Drive via the
// Google Workspace CLI, then resizes & converts each to WebP at multiple
// widths so the site can ship them as proper responsive assets.
//
// Source folder: 1eqKDbzGtLoccxWGIPhLg7MeYMuznZ0gg
// Output:        public/images/<slug>-{1920|1200|800|480}.webp

import { execSync } from 'node:child_process';
import { mkdirSync, statSync, existsSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

// Run gws CLI through bash on Windows so single-quoted JSON survives.
// We write the JSON params to a temp file and pass `--params @file` style by
// reading them inline with bash command substitution. Simpler: write the
// params arg into a tiny shell script and exec it.
function gws(args, opts = {}) {
  // Quote each arg with single quotes; embedded single quotes are escaped.
  const sh = ['npx', '@googleworkspace/cli', ...args]
    .map((a) => `'${String(a).replace(/'/g, `'\\''`)}'`)
    .join(' ');
  return execSync(sh, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
    shell: process.platform === 'win32' ? 'C:\\Program Files\\Git\\bin\\bash.exe' : '/bin/bash',
    ...opts,
  });
}

const ROOT = path.resolve(process.cwd());
const TMP = path.join(ROOT, '.tmp', 'raw-images');
const OUT = path.join(ROOT, 'public', 'images');
const FOLDER_ID = '1eqKDbzGtLoccxWGIPhLg7MeYMuznZ0gg';

// Image-size matrix per ratio. 21:9 hero shots get an extra 2560 width.
const SIZES_3x2 = [1920, 1200, 800, 480];
const SIZES_21x9 = [2560, 1920, 1200];

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

// ────────────────────────────────────────────────────────────────────────
// 1 · LIST FILES IN THE DRIVE FOLDER
// ────────────────────────────────────────────────────────────────────────

console.log('[drive] listing folder', FOLDER_ID);

const listJson = gws([
  'drive',
  'files',
  'list',
  '--params',
  JSON.stringify({
    pageSize: 100,
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    fields: 'files(id,name,mimeType,size,imageMediaMetadata)',
  }),
]);

const { files } = JSON.parse(listJson);
const images = files.filter((f) => f.mimeType?.startsWith('image/'));

console.log(`[drive] found ${images.length} images\n`);

// ────────────────────────────────────────────────────────────────────────
// 2 · DOWNLOAD EACH IMAGE INTO .tmp/raw-images
// ────────────────────────────────────────────────────────────────────────

for (const img of images) {
  const ext = img.mimeType === 'image/png' ? 'png' : 'jpeg';
  const dest = path.join(TMP, `${img.id}.${ext}`);

  if (existsSync(dest) && statSync(dest).size === Number(img.size)) {
    console.log(`[skip] ${img.id} already cached (${img.name})`);
    continue;
  }

  console.log(`[get ] ${img.id}  ${img.name}  ${(img.size / 1024 / 1024).toFixed(2)} MB`);
  gws(
    [
      'drive',
      'files',
      'get',
      '--params',
      JSON.stringify({ fileId: img.id, alt: 'media' }),
      '-o',
      dest,
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] }
  );
}

console.log(`\n[drive] all downloads complete`);

// ────────────────────────────────────────────────────────────────────────
// 3 · CLASSIFY BY ASPECT RATIO + ASSIGN STABLE SLOT NAMES
// ────────────────────────────────────────────────────────────────────────
//
// All 17 images come from the same prompt batch I wrote earlier in
// IMAGE-PROMPTS.md. I assign them to placement slots in chronological
// order (oldest first), which mirrors the order Vesa generated them in.

const sorted = images
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

const wide = sorted.filter(
  (i) => i.imageMediaMetadata && i.imageMediaMetadata.width / i.imageMediaMetadata.height > 1.9
);
const standard = sorted.filter((i) => !wide.includes(i));

console.log(`\n[ratio] 21:9 ultra-wide:  ${wide.length}`);
console.log(`[ratio] 3:2 standard:     ${standard.length}\n`);

// Slot map — what role each image plays on the site
const slots = [];

// Wide → hero placements
// Slot assignments are based on visual inspection of each generated image,
// NOT the filename. See notes below.
const heroSlots = [
  'hero-aurora',     // img 0: aurora over winding river with footprints
  'hero-dusk-lake',  // img 1: snowy lake at blue dusk
];
wide.forEach((img, i) => {
  if (i < heroSlots.length) {
    slots.push({ img, slot: heroSlots[i], sizes: SIZES_21x9 });
  }
});

// Standard 3:2 → carousel + pillars + aside + categories
// Order matches the sorted-by-name order of the downloaded files.
// Each slot below corresponds to the ACTUAL content I visually confirmed
// after first processing — the file names from HeyFlow are not descriptive
// so we re-map them to what the image actually shows.
const standardSlots = [
  'trip-forest-walk',   // 0: man with backpack walking pine forest, golden sunset
  'trip-solo-trek',     // 1: same hiker, different framing — long solo trek feel
  'trip-silence',       // 2: single snow-covered tree on frozen lake, twilight
  'trip-aurora-chase',  // 3: huge green aurora arching over broken ice floes
  'trip-night-forest',  // 4: deep snow-covered spruce forest at night, star sky
  'trip-cabin-life',    // 5: warm-lit log cabin at night, footprints in snow
  'trip-food',          // 6: salmon soup + rye bread + butter, overhead shot
  'pillar-cold',        // 7: snow-covered bench in front of a lit apartment window
  'pillar-shelter',     // 8: log cabin by frozen lake at sunrise, chimney smoke
  'category-aurora',    // 9: dark snowy forest with faint aurora glow on horizon
  'aside-vesa',         // 10: tiny figure with headlamp under giant aurora arc
  'category-cabins',    // 11: cabin interior, wood stove, mug, folded wool blankets
  'category-food',      // 12: slate board — salmon, cloudberries, lingonberries, crispbread
  'category-seasons',   // 13: solitary birch tree split half summer / half winter
  'pillar-people',      // 14: weathered hands cradling a steaming enamel mug
];
standard.forEach((img, i) => {
  if (i < standardSlots.length) {
    slots.push({ img, slot: standardSlots[i], sizes: SIZES_3x2 });
  }
});

// ────────────────────────────────────────────────────────────────────────
// 4 · PROCESS WITH SHARP — write WebP at every width
// ────────────────────────────────────────────────────────────────────────

console.log(`[sharp] processing ${slots.length} slots…\n`);

// Wipe previous outputs so we always have a clean directory
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.webp')) unlinkSync(path.join(OUT, f));
}

const manifest = [];

for (const { img, slot, sizes } of slots) {
  const ext = img.mimeType === 'image/png' ? 'png' : 'jpeg';
  const src = path.join(TMP, `${img.id}.${ext}`);
  const meta = await sharp(src).metadata();
  console.log(`[sharp] ${slot.padEnd(22)} ${meta.width}×${meta.height} ${ext}`);

  for (const w of sizes) {
    if (w > meta.width) continue; // never upscale
    const out = path.join(OUT, `${slot}-${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);
    const kb = (statSync(out).size / 1024).toFixed(0);
    console.log(`        → ${path.basename(out)}  ${kb} KB`);
  }

  manifest.push({
    slot,
    src: img.name,
    width: meta.width,
    height: meta.height,
    sizes,
  });
}

// Write manifest for the Vite code to import
writeFileSync(
  path.join(ROOT, 'public', 'images', 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`\n[done ] wrote ${slots.length} image sets to public/images/`);
console.log(`[done ] manifest at public/images/manifest.json`);
