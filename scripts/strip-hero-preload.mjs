#!/usr/bin/env node
/**
 * strip-hero-preload.mjs — heron preload vain etusivulle, ja oikean kauden kuvalle.
 *
 * ── MIKSI (mitattu 14.9.2026, perfprobe) ───────────────────────────────────
 *
 * index.html-kuoren `<link rel="preload" as="image" imagesrcset="hero-aurora-*">`
 * periytyi jokaiseen prerenderöityyn sivuun. Jokainen artikkelisivu latasi siis
 * etusivun heron (156 kB puhelimessa, 238 kB työpöydällä) vaikka sivulla ei ole
 * sitä kuvaa lainkaan — /fi/post/five-nights-in-a-forest-cabin/ pyysi
 * hero-aurora-1200.webp?v=… eikä renderöinyt yhtään kuvaa.
 *
 * Toinen vika: preload listasi aina kesäsarjan, vaikka src/lib/images.ts
 * vaihtaa loka–huhtikuussa `hero-aurora-winter-*`-sarjaan. Talvella preload
 * olisi ladannut kesäkuvan turhaan ja talvikuva olisi lähtenyt vasta Reactin
 * jälkeen.
 *
 * ── MITÄ TÄMÄ TEKEE ────────────────────────────────────────────────────────
 *
 * 1. Poistaa hero-preload-tagin jokaisesta dist/**\/*.html-tiedostosta, joka EI
 *    ole etusivu (dist/index.html tai dist/<kieli>/index.html).
 * 2. Etusivuilla vaihtaa tagin kesäsarjan talvisarjaan, jos build ajetaan
 *    loka–huhtikuussa (sama sääntö kuin images.ts:n isSummerSeason).
 * 3. Poistaa muokatun tiedoston vanhentuneet .br/.gz-sisarukset.
 *
 * 🔴 Ajetaan prerenderin jälkeen ja ENNEN version-images.mjs:ää, jotta ?v=-tiiviste
 * lasketaan lopulliselle (talvi- tai kesä-) osoitteelle. Kausi päätetään
 * build-hetkellä: sivusto rakennetaan viikoittain, joten kauden vaihde näkyy
 * preloadissa viimeistään seuraavassa buildissa; itse <img> vaihtuu heti.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const LOCALES = ['fi', 'de', 'ja', 'es', 'br', 'cn', 'kr', 'fr', 'it', 'nl', 'sv'];
const TAG_RE = /\s*<link\s+rel="preload"\s+as="image"[^>]*hero-aurora[^>]*\/?>/g;

const isSummerSeason = () => {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
};

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};

if (!fs.existsSync(DIST)) {
  console.error('strip-hero-preload: dist/ puuttuu — aja build ensin');
  process.exit(1);
}

const homes = new Set([path.join(DIST, 'index.html'), ...LOCALES.map((l) => path.join(DIST, l, 'index.html'))]);
const winter = !isSummerSeason();
const winterExists = fs.existsSync(path.join(DIST, 'images', 'hero-aurora-winter-1200.webp'));
let stripped = 0;
let swapped = 0;
let kept = 0;

for (const f of walk(DIST)) {
  const src = fs.readFileSync(f, 'utf8');
  if (!TAG_RE.test(src)) continue;
  TAG_RE.lastIndex = 0;
  let out;
  if (homes.has(f)) {
    if (winter && winterExists) {
      out = src.replace(TAG_RE, (tag) => tag.replace(/hero-aurora-(?!winter-)/g, 'hero-aurora-winter-'));
      swapped++;
    } else {
      kept++;
      continue;
    }
  } else {
    out = src.replace(TAG_RE, '');
    stripped++;
  }
  fs.writeFileSync(f, out);
  for (const ext of ['.br', '.gz']) {
    if (fs.existsSync(f + ext)) fs.unlinkSync(f + ext);
  }
}

console.log(
  `strip-hero-preload: poistettu ${stripped} sivulta, etusivuja ${kept + swapped}` +
    (winter ? ` (talvi: ${swapped} vaihdettu winter-sarjaan${winterExists ? '' : ' — winter-tiedostot puuttuvat, jätetty kesäsarja'})` : ' (kesä: kesäsarja ennallaan)'),
);
