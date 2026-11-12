// Generate branded per-post / per-page OpenGraph cards (1200×630 JPEG).
//
// Why: every post + page was sharing /og-default.jpg, so LinkedIn/FB shares all
// looked identical and "didn't sell" (owner feedback). This composites each
// post's own hero into a correctly-sized 1200×630 JPEG with a brand wordmark +
// kicker overlaid, so a shared link looks like a designed card, not a bare crop.
//
// Inputs are the existing on-disk hero WebPs (no new AI generation needed).
// Run: node scripts/generate-og-images.mjs   (also wired into prebuild)
//
// Output: public/og/<slug>.jpg (+ <slug>-summer.jpg and <slug>-winter.jpg, the same bytes)
//
// 🔴 WHY THE SEASONAL TWINS (measured live 12.11.2026). Cloudflare Pages runs a Function BEFORE the static
// file. functions/og/[card].js (installed with the first ogCard route) catches every /og/<slug>.jpg request,
// looks for <slug>-winter.jpg / <slug>-summer.jpg and falls back to the site card. These cards were on disk
// and every share of a post or page still showed the site card (X-LV-OG-Season: fallback). The twins are what
// the Function serves; the plain file stays because the prerenderer hashes it for ?v= and gate:jakokuvat
// measures it. gate:jakokuvat fails if a twin is missing or differs.

import sharp from 'sharp';
import { mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMG = (p) => resolve(ROOT, 'public/images', p);
const OUT_DIR = resolve(ROOT, 'public/og');
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

// Each card: source hero + an overlaid kicker line. The brand wordmark is drawn
// for every card. `slug` is the output filename (post slug or page name).
const CARDS = [
  // ── Posts (source = post hero). Rewritten 2026-11-05; CC BY-SA heroes get no card (§34.2), they use the site card.
  { slug: 'five-nights-in-a-forest-cabin', src: 'jutut/five-nights-in-a-forest-cabin/hirsimokki-talvi-1200.webp', kicker: 'CABINS', focus: 'attention' },
  { slug: 'living-between-two-suns', src: 'category-seasons-1200.webp', kicker: 'SEASONS', focus: 'attention' },
  { slug: 'seven-and-a-half-minutes-a-day', src: 'jutut/seven-and-a-half-minutes-a-day/utsjoki-teno-lokakuu-1200.webp', kicker: 'SEASONS', focus: 'attention' },
  { slug: 'strawberry-hour-at-the-rovaniemi-market', src: 'jutut/strawberry-hour-at-the-rovaniemi-market/rovaniemen-kauppatori-1200.webp', kicker: 'FOOD', focus: 'attention' },
  { slug: 'what-july-in-lapland-actually-asks-you-to-pack', src: 'jutut/what-july-in-lapland-actually-asks-you-to-pack/korpikoski-heinakuu-1200.webp', kicker: 'GEAR', focus: 'attention' },
  { slug: 'wilderness-hut-firewood-ends-2026', src: 'news-boardwalk-1200.webp', kicker: 'GEAR', focus: 'attention' },
  // ── Key pages (source = page hero) ──────────────────────────────────────
  { slug: 'page-home', src: 'hero-aurora-1920.webp', kicker: 'FREE TRAVEL-BLOG PLATFORM', focus: 'attention' },
  { slug: 'page-destinations', src: 'hero-dusk-lake-1920.webp', kicker: 'EIGHT PLACES · ONE LAPLAND', focus: 'attention' },
  { slug: 'page-about', src: 'aside-vesa-1200.webp', kicker: 'ABOUT LAPLAND.BLOG', focus: 'attention' },
  // 9.10.2026: trip-night-forest is now a CC BY-SA photograph (Inari), which may not go into a card (lv_permanent_rules 34.2):
  // the card uses the Pexels aurora hero instead.
  { slug: 'page-stories', src: 'hero-aurora-winter-1200.webp', kicker: 'EVERY FIELD-JOURNAL ENTRY', focus: 'attention' },
];

// Top-anchored scrim + brand lockup. Pink "#", white "LAPLAND", pink ".BLOG"
// to match the site logo. A thin pink rule + kicker sit above it.
//
// 🔴 TOP, not bottom (12.11.2026). X (Twitter) draws the link title on a black label over the
// bottom-left corner of the card image: measured from a phone screenshot at 84–96 % of the card
// height. The lockup used to sit at y 462–606 (bottom-left), so the label covered the wordmark and
// the tagline in every X share. All ink must stay above y = 491 (78 %); the network generator
// enforces the same limit as rule R6 (lv-ops scripts/og/card.mjs). The scrim moved with the text:
// it is darkest where the lockup is and gone by mid-card, and the bottom of the photo is untouched.
const X_LABEL_Y = Math.round(H * 0.78);
const LOCKUP = { kicker: 78, rule: 92, wordmark: 158, tagline: 192 };
function overlaySvg(kicker, { text = true } = {}) {
  const safeKicker = String(kicker).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="0.92"/>
      <stop offset="33%" stop-color="#0F172A" stop-opacity="0.80"/>
      <stop offset="58%" stop-color="#0F172A" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scrim)"/>
  ${text ? `<!-- kicker -->
  <text x="64" y="${LOCKUP.kicker}" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700"
        letter-spacing="6" fill="#F9A8D4">${safeKicker}</text>
  <rect x="64" y="${LOCKUP.rule}" width="64" height="4" rx="2" fill="#EC4899"/>
  <!-- brand wordmark -->
  <text x="62" y="${LOCKUP.wordmark}" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" letter-spacing="1">
    <tspan fill="#EC4899">#</tspan><tspan fill="#F9FAFB">LAPLAND</tspan><tspan fill="#EC4899">.BLOG</tspan>
  </text>
  <text x="64" y="${LOCKUP.tagline}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="#CBD5E1">
    Start &amp; share your Finnish Lapland trip blog — free</text>` : ''}
</svg>`);
}

const gravityFor = (focus) => (focus === 'centre' ? 'centre' : 'attention');

// Measured, not assumed: the ink box comes from diffing the card with and without the lockup, and the
// contrast is each solid ink pixel against the pixel under it. A card whose ink reaches the X label fails the build.
const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
async function measure(base, kicker) {
  const px = async (o) => (await sharp(base).composite([{ input: overlaySvg(kicker, o), top: 0, left: 0 }]).removeAlpha().raw().toBuffer());
  const [a, b] = await Promise.all([px({ text: true }), px({ text: false })]);
  let maxY = 0, minY = H; const c = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const d = Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
    if (d < 60) continue;
    if (y > maxY) maxY = y; if (y < minY) minY = y;
    if (d < 240) continue;                       // anti-aliased edge, not solid ink
    const li = lum(a[i], a[i + 1], a[i + 2]), lb = lum(b[i], b[i + 1], b[i + 2]);
    c.push((Math.max(li, lb) + 0.05) / (Math.min(li, lb) + 0.05));
  }
  c.sort((m, n) => m - n);
  return { minY, maxY, contrastP10: c.length ? +c[Math.floor(c.length * 0.1)].toFixed(2) : null };
}

let made = 0;
const failed = [];
for (const card of CARDS) {
  const out = resolve(OUT_DIR, `${card.slug}.jpg`);
  try {
    const base = await sharp(IMG(card.src))
      .resize(W, H, { fit: 'cover', position: gravityFor(card.focus) })
      .modulate({ brightness: 0.94 }) // a touch darker so the lockup reads
      .toBuffer();

    const m = await measure(base, card.kicker);
    if (m.maxY >= X_LABEL_Y) { failed.push(`${card.slug}: ink reaches y=${m.maxY}, the X title label starts above ${X_LABEL_Y}`); continue; }
    await sharp(base)
      .composite([{ input: overlaySvg(card.kicker), top: 0, left: 0 }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    for (const season of ['summer', 'winter']) copyFileSync(out, resolve(OUT_DIR, `${card.slug}-${season}.jpg`));
    made++;
    console.log(`  og: ${card.slug}.jpg  ← ${card.src}  ink y ${m.minY}–${m.maxY}, contrast p10 ${m.contrastP10}`);
  } catch (err) {
    failed.push(`${card.slug}: ${err.message}`);
  }
}
console.log(`\nGenerated ${made}/${CARDS.length} OG cards → public/og/`);
if (failed.length) { console.error(`\n❌ ${failed.length} OG card(s) failed:\n  ${failed.join('\n  ')}`); process.exit(1); }
