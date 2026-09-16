/**
 * PORTTI: artikkelin alaosan verkostokortit ovat lukijan kielellä — ja se on
 * mitattu valmiista bundlesta, ei lähdekoodista.
 *
 * Miksi tämä on olemassa (mitattu 2026-09-16 livenä):
 *   - Korttien tekstit olivat KOVAKOODATTUINA src/lib/crossSiteLinks.ts:ssä,
 *     joten fi-, de- ja ja-sivuilla luki "Find places to stay". Saman sivun
 *     footer oli käännetty oikein, joten vika näytti ulospäin satunnaiselta.
 *   - Käännösten lisääminen ei riitä säännöksi: seuraava agentti voi lisätä
 *     kahdeksannen sivuston NETWORK_SITESiin ja jättää 12 kielitiedostoa
 *     päivittämättä. Tyyppi estää sen käännösaikana, tämä portti julkaisussa.
 *
 * 🔴 Ajetaan CI:ssä (Node 20), joten tämä tiedosto EI saa importata .ts-moduulia:
 *    tyyppien riisunta on vasta Node 22.18+. Siksi avaimet luetaan lähteestä
 *    kapealla regexillä ja arvot varmistetaan dist/:stä.
 *
 * Aja: node scripts/assert-network-cards.mjs   (npm run gate:verkostokortit)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const CWD = process.cwd();
const SRC = resolve(CWD, 'src');
const DIST_ASSETS = resolve(CWD, 'dist', 'assets');

// lang → copy.<file>.ts, sama lista kuin scripts/_prerender_routes.mjs:ssä.
const LOCALES = [
  ['en', 'copy.en.ts'],
  ['fi', 'copy.fi.ts'],
  ['de', 'copy.de.ts'],
  ['ja', 'copy.ja.ts'],
  ['es', 'copy.es.ts'],
  ['pt-BR', 'copy.ptBR.ts'],
  ['zh-CN', 'copy.zhCN.ts'],
  ['ko', 'copy.ko.ts'],
  ['fr', 'copy.fr.ts'],
  ['it', 'copy.it.ts'],
  ['nl', 'copy.nl.ts'],
  ['sv', 'copy.sv.ts'],
];

const fail = (msg) => {
  console.error(`assert-network-cards: ${msg}`);
  process.exitCode = 1;
};

/**
 * Lohko `key: {` … `}` sulkuja laskien, lainausmerkkien sisällä olevat ohitetaan.
 * Osuu objektiavaimeen (`post: {`) ja tyypitettyyn vakioon
 * (`export const NETWORK_SITES: Record<…> = {`).
 *
 * 🔴 Kumpikin hahmo on tarkoituksella tiukka ja yhdellä rivillä: väljä
 * `key\b[^={]*\{` osui sanaan "post" leipätekstissä ja jäsensi väärän lohkon
 * neljästä kielitiedostosta kahdestatoista (mitattu 2026-09-16).
 */
function block(src, key) {
  const start = [
    new RegExp(`(^|[\\s,{])${key}\\s*:\\s*\\{`, 'm'), // objektiavain
    new RegExp(`\\b${key}\\s*(?::[^=\\n{]*)?=\\s*\\{`, 'm'), // (tyypitetty) vakio
  ].reduce((found, re) => (found !== -1 ? found : src.search(re)), -1);
  if (start === -1) return null;
  const open = src.indexOf('{', start);
  let depth = 0;
  let quote = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') quote = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return src.slice(open, i + 1);
  }
  return null;
}

// ── 1. Sivustoavaimet lähteestä ────────────────────────────────────────────
const linksSrc = readFileSync(resolve(SRC, 'lib', 'crossSiteLinks.ts'), 'utf8');
const sitesBlock = block(linksSrc, 'NETWORK_SITES');
if (!sitesBlock) {
  fail('NETWORK_SITES-lohkoa ei löytynyt src/lib/crossSiteLinks.ts:stä — portti ei mitannut mitään.');
  process.exit(1);
}
const KEYS = [...sitesBlock.matchAll(/^\s{2}([a-z][a-zA-Z0-9]*):\s*\{/gm)].map((m) => m[1]);
if (!KEYS.length) {
  fail('NETWORK_SITESista ei jäsentynyt yhtään avainta — nolla ei ole tulos.');
  process.exit(1);
}

// ── 2. Käännökset: kaikki avaimet, ei tyhjiä, ei englantia muilla kielillä ─
// Avain on tarkoituksella `blurb`, ei `description`: ks. src/locales/types.ts.
const CARD_RE = /^\s{6}([a-z][a-zA-Z0-9]*):\s*\{\s*label:\s*(['"])((?:\\.|(?!\2).)*)\2,\s*blurb:\s*(['"])((?:\\.|(?!\4).)*)\4\s*\},?\s*$/gm;
const parsed = new Map();

for (const [lang, file] of LOCALES) {
  const path = resolve(SRC, 'locales', file);
  if (!existsSync(path)) { fail(`${file} puuttuu`); continue; }
  const src = readFileSync(path, 'utf8');

  const postBlock = block(src, 'post');
  if (!postBlock) { fail(`${file}: post-lohkoa ei löytynyt`); continue; }

  // 🔴 Ansa, joka maksettiin 2026-09-16: 11 post-reittiä lukee TÄMÄN lohkon
  // scripts/_prerender_routes.mjs:n regexillä. `description:` tai `title:`
  // täällä kaappaa sivun metan, ja englanti jää ilman otsikkoa (muut kielet
  // pelastuvat routes.jsonin fallbackTitleByLangilla). Portti estää paluun.
  const hijack = /(^|[\s,{])(title|description|seoTitle|metaTitle|seoDescription|seoDesc|metaDescription|heroH1|heroLead)\s*:/m.exec(postBlock);
  if (hijack) {
    fail(
      `${file}: post-lohkossa on avain "${hijack[2]}" — _prerender_routes.mjs lukee sen sivun metaksi ` +
        'ja englanninkielisten juttusivujen <title> ja <h1> tyhjenevät. Nimeä se toisin (esim. blurb).',
    );
  }

  const cards = new Map();
  for (const m of postBlock.matchAll(CARD_RE)) cards.set(m[1], { label: m[3], blurb: m[5] });
  if (!cards.size) { fail(`${file}: networkCards ei jäsentynyt (0 korttia) — nolla ei ole tulos.`); continue; }

  const missing = KEYS.filter((k) => !cards.has(k));
  const extra = [...cards.keys()].filter((k) => !KEYS.includes(k));
  if (missing.length) fail(`${file}: networkCards puuttuu sivustoilta ${missing.join(', ')}`);
  if (extra.length) fail(`${file}: networkCards tuntee sivustot ${extra.join(', ')} joita NETWORK_SITESissa ei ole`);
  for (const [k, v] of cards) {
    if (!v.label.trim() || !v.blurb.trim()) fail(`${file}: ${k} — tyhjä label tai blurb`);
  }
  parsed.set(lang, cards);
}

const en = parsed.get('en');
if (!en) { fail('copy.en.ts ei jäsentynyt — vertailukohtaa ei ole.'); process.exit(1); }
for (const [lang, cards] of parsed) {
  if (lang === 'en') continue;
  for (const [k, v] of cards) {
    const e = en.get(k);
    if (!e) continue;
    if (v.label === e.label) fail(`${lang}: ${k}.label on sama kuin englannissa ("${v.label}") — kääntämättä.`);
    if (v.blurb === e.blurb) fail(`${lang}: ${k}.blurb on sama kuin englannissa ("${v.blurb}") — kääntämättä.`);
  }
}

// ── 3. Todiste että käännökset ovat VALMIISSA bundlessa, ei vain lähteessä ──
// Jokaisella kielellä on oma chunkkinsa (dist/assets/copy.<ident>-<hash>.js).
if (!existsSync(DIST_ASSETS)) {
  fail(`${DIST_ASSETS} puuttuu — aja build ensin.`);
  process.exit(1);
}
const assets = readdirSync(DIST_ASSETS).filter((f) => f.endsWith('.js'));
const unesc = (s) => s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
let chunksChecked = 0;

for (const [lang, file] of LOCALES) {
  const cards = parsed.get(lang);
  if (!cards) continue;
  const ident = file.replace(/^copy\./, '').replace(/\.ts$/, '');
  const chunk = assets.find((f) => f.startsWith(`copy.${ident}-`));
  if (!chunk) { fail(`${lang}: dist/assets/copy.${ident}-*.js puuttuu — kielipaketti ei päätynyt buildiin.`); continue; }
  const js = readFileSync(join(DIST_ASSETS, chunk), 'utf8');
  const absent = [];
  for (const [k, v] of cards) {
    if (!js.includes(unesc(v.label))) absent.push(`${k}.label`);
    if (!js.includes(unesc(v.blurb))) absent.push(`${k}.blurb`);
  }
  if (absent.length) fail(`${lang}: ${chunk} ei sisällä ${absent.length} korttitekstiä (${absent.slice(0, 4).join(', ')}…)`);
  chunksChecked++;
}

if (chunksChecked !== LOCALES.length) fail(`vain ${chunksChecked}/${LOCALES.length} kielipakettia tarkistettiin.`);

if (process.exitCode) {
  console.error('assert-network-cards: PUNAINEN');
  process.exit(1);
}
console.log(
  `assert-network-cards: ${KEYS.length} sivustoa × ${LOCALES.length} kieltä · ` +
    `${KEYS.length * LOCALES.length * 2} tekstiä bundlessa · 0 englantia muilla kielillä · post-lohko puhdas`,
);
