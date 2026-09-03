// FAQ-synkka ja -portti: scripts/prerender-meta.json:n FAQ on KÄSIN ylläpidetty kopio
// src/locales/copy.<lang>.ts:n home.faq:sta. Ne ajautuivat erilleen — es-FAQ tarjoili
// tú-muotoa JSON-LD:ssä (Googlen rich result) vaikka sivun oma copy oli jo usted, ja
// zh-CN-FAQ oli 你-versio vaikka sivu käyttää 您:tä. Kumpikaan ei näy sivulla ennen
// hydraatiota, joten drift eli kuukausia näkymättömissä.
//
//   node scripts/faq-sync.mjs           → kirjoittaa meta-FAQ:n copysta (kaikki kielet)
//   node scripts/faq-sync.mjs --check   → exit 1 jos drift (buildin portti)
//
// Kanoni on copy.<lang>.ts. Jos FAQ pitää muuttaa, muuta copy ja aja tämä.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const META = path.join(ROOT, 'scripts/prerender-meta.json');
const CHECK = process.argv.includes('--check');

const FILE_FOR = (lang) => path.join(ROOT, `src/locales/copy.${lang === 'pt-BR' ? 'ptBR' : lang === 'zh-CN' ? 'zhCN' : lang}.ts`);

/** Poimii home.faq:n {q,a}-parit copy-tiedostosta. Sietää ', " ja ` -lainaukset ja escapet. */
function readFaq(src) {
  const start = src.indexOf('faq: [');
  if (start < 0) return null;
  // Sulje taulukko laskemalla hakasulkeet merkkijonojen ulkopuolella.
  let i = src.indexOf('[', start), depth = 0, end = -1, quote = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (!depth) { end = i; break; } }
  }
  if (end < 0) return null;
  const block = src.slice(start, end + 1);
  const rx = /\b(q|a):\s*(['"`])((?:[^\\]|\\.)*?)\2/gs;
  const out = [];
  let m, cur = {};
  while ((m = rx.exec(block))) {
    const value = m[3].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\n/g, '\n');
    cur[m[1]] = value;
    if (cur.q !== undefined && cur.a !== undefined) { out.push({ q: cur.q, a: cur.a }); cur = {}; }
  }
  return out.length ? out : null;
}

const meta = JSON.parse(fs.readFileSync(META, 'utf8'));
const home = meta['/'];
if (!home) { console.error('[faq] prerender-meta.json has no "/" entry'); process.exit(1); }

const drift = [];
let written = 0;
for (const lang of Object.keys(home)) {
  const entry = home[lang];
  if (!entry || !Array.isArray(entry.faq)) continue;
  const file = FILE_FOR(lang);
  if (!fs.existsSync(file)) { console.warn(`[faq] ${lang}: no copy file`); continue; }
  const canon = readFaq(fs.readFileSync(file, 'utf8'));
  if (!canon) { console.warn(`[faq] ${lang}: could not parse home.faq`); continue; }
  if (canon.length !== entry.faq.length) drift.push(`${lang}: copy has ${canon.length} Q&A, meta has ${entry.faq.length}`);
  const n = Math.min(canon.length, entry.faq.length);
  for (let k = 0; k < n; k++) {
    for (const field of ['q', 'a']) {
      if (entry.faq[k][field] !== canon[k][field]) {
        drift.push(`${lang} faq[${k}].${field}\n    meta: ${String(entry.faq[k][field]).slice(0, 110)}\n    copy: ${String(canon[k][field]).slice(0, 110)}`);
      }
    }
  }
  if (!CHECK) { entry.faq = canon.slice(0, entry.faq.length); written++; }
}

if (CHECK) {
  if (drift.length) {
    console.error(`[faq] ✗ prerender-meta.json FAQ has drifted from copy.<lang>.ts in ${drift.length} place(s):`);
    for (const d of drift) console.error('  - ' + d);
    console.error('[faq] Fix the copy file, then run: node scripts/faq-sync.mjs');
    process.exit(1);
  }
  console.log(`[faq] ✓ FAQ in sync with copy for ${Object.keys(home).length} locales`);
} else {
  fs.writeFileSync(META, JSON.stringify(meta, null, 2) + '\n');
  console.log(`[faq] wrote FAQ for ${written} locales from copy.<lang>.ts (${drift.length} drifted before this run)`);
}
