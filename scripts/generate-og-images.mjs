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
// Output: public/og/<slug>.jpg  +  public/og/<page>.jpg

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
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

// Bottom-anchored scrim + brand lockup. Pink "#", white "LAPLAND", pink ".BLOG"
// to match the site logo. A thin pink rule + kicker sit above it.
function overlaySvg(kicker) {
  const safeKicker = String(kicker).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="0"/>
      <stop offset="55%" stop-color="#0F172A" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.92"/>
    </linearGradient>
    <linearGradient id="topscrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="0" y="0" width="${W}" height="170" fill="url(#topscrim)"/>
  <!-- kicker -->
  <text x="64" y="486" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700"
        letter-spacing="6" fill="#F9A8D4">${safeKicker}</text>
  <rect x="64" y="500" width="64" height="4" rx="2" fill="#EC4899"/>
  <!-- brand wordmark -->
  <text x="62" y="566" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" letter-spacing="1">
    <tspan fill="#EC4899">#</tspan><tspan fill="#F9FAFB">LAPLAND</tspan><tspan fill="#EC4899">.BLOG</tspan>
  </text>
  <text x="64" y="600" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="500" fill="#CBD5E1">
    Start &amp; share your Finnish Lapland trip blog — free</text>
</svg>`);
}

const gravityFor = (focus) => (focus === 'centre' ? 'centre' : 'attention');

let made = 0;
for (const card of CARDS) {
  const out = resolve(OUT_DIR, `${card.slug}.jpg`);
  try {
    const base = await sharp(IMG(card.src))
      .resize(W, H, { fit: 'cover', position: gravityFor(card.focus) })
      .modulate({ brightness: 0.94 }) // a touch darker so the lockup reads
      .toBuffer();

    await sharp(base)
      .composite([{ input: overlaySvg(card.kicker), top: 0, left: 0 }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    made++;
    console.log(`  og: ${card.slug}.jpg  ← ${card.src}`);
  } catch (err) {
    console.error(`  ! failed ${card.slug}: ${err.message}`);
  }
}
console.log(`\nGenerated ${made}/${CARDS.length} OG cards → public/og/`);
