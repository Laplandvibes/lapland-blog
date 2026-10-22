// fan-league-update.mjs — Lapland Fan League -taulukko (/fan-league) Umamista.
//
// Vesa 22.10.2026: "Sinne pitää saada kävijöitä. Thats the point." Sivu näyttää, mistä maista
// verkoston lukijat tulevat, ja päivittyy viikoittain. Ajetaan VAIN Vesan koneella (avain on
// ~/.lv-secrets/marketing.env, CI:llä sitä ei ole) — ei osa buildia.
//
// "Lukija" = käynti, jossa avattiin useampi kuin yksi sivu (visits − bounces): yksittäiset osumat
// palvelinkeskuksista (USA, Irlanti) putoavat pois. Sama mittari kuin maakilpailupostauksessa
// (marketing-kit/10-social/posts/2026-10-maaliiga/maaliiga.mjs).
//
// 🔴 Raakalukuja EI kirjoiteta tiedostoon: sivu näyttää indeksin (kärki = 100). Tiedosto on
//    julkinen (se päätyy JS-nippuun), ja lukujen suuruus on liiketoimintatietoa.
//
//   node scripts/fan-league-update.mjs            kuluva kuukausi (1.–3. päivänä: edellinen, lopullinen)
//   node scripts/fan-league-update.mjs 2026-10    tietty kuukausi
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'src', 'data', 'fanLeague.gen.ts');
// Tiedosto on TypeScriptiä eikä JSONia, koska tsconfig ei salli JSON-importteja; data on merkkien välissä.
const readDoc = (src) => JSON.parse(src.split('/*JSON*/')[1].split('/*END*/')[0]);
const REGISTRY = process.env.LV_UMAMI_SITES || join(HERE, '..', '..', '_analytics', 'umami-sites.json');
const ROWS = 12;

const secrets = join(homedir(), '.lv-secrets', 'marketing.env');
const KEY = process.env.UMAMI_API_KEY
  || (existsSync(secrets) ? (readFileSync(secrets, 'utf8').match(/^\s*UMAMI_API_KEY\s*=\s*"?([^"\r\n]+)"?/m) || [])[1] : null);
if (!KEY) { console.error('UMAMI_API_KEY puuttuu'); process.exit(2); }

const reg = JSON.parse(readFileSync(REGISTRY, 'utf8'));
const hosts = Object.entries(reg).filter(([k, v]) => !k.startsWith('_') && /^[0-9a-f-]{36}$/.test(String(v)));
const ids = [...new Set(hosts.map(([, v]) => v))];

// Kuukausi Helsingin ajassa. 1.–3. päivänä lasketaan edellinen kuukausi lopulliseksi, jotta
// kuun vaihteen taulukko ei ole kahden päivän datasta.
const hel = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Helsinki', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
const today = hel(new Date());
let month = process.argv[2];
let final = false;
if (!month) {
  const [y, m, d] = today.split('-').map(Number);
  if (d <= 3) { month = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`; final = true; }
  else month = `${y}-${String(m).padStart(2, '0')}`;
}
const [Y, M] = month.split('-').map(Number);
// Helsingin keskiyö: UTC+3 kesäaikana, UTC+2 talviaikana. Lasketaan offset kyseiselle hetkelle.
const helMidnight = (y, m) => {
  const guess = Date.UTC(y, m - 1, 1, 0, 0);
  const off = new Date(guess).toLocaleString('en-US', { timeZone: 'Europe/Helsinki', hour12: false, hour: '2-digit' });
  return guess - Number(off) * 3600e3;
};
const startAt = helMidnight(Y, M);
const monthEnd = M === 12 ? helMidnight(Y + 1, 1) : helMidnight(Y, M + 1);
const endAt = Math.min(Date.now(), monthEnd);
if (endAt >= monthEnd) final = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(id, path, params) {
  const u = new URL(`https://api.umami.is/v1/websites/${id}/${path}`);
  for (const [k, v] of Object.entries({ startAt, endAt, ...params })) u.searchParams.set(k, v);
  for (let k = 0; k < 5; k++) {
    const r = await fetch(u, { headers: { 'x-umami-api-key': KEY, accept: 'application/json' } });
    if (r.status === 429) { await sleep(5000 * (k + 1)); continue; }
    if (!r.ok) throw new Error(`${r.status} ${path} ${await r.text()}`);
    return r.json();
  }
  throw new Error('429 toistuvasti');
}
const num = (x) => (typeof x === 'object' && x !== null ? Number(x.value ?? 0) : Number(x ?? 0));

const tot = {};
for (const id of ids) {
  const m = await get(id, 'metrics', { type: 'country', limit: 300 });
  const top = m.filter((r) => /^[A-Z]{2}$/.test(r.x || '')).sort((a, b) => b.y - a.y).slice(0, 15).map((r) => r.x);
  for (const c of top) {
    const s = await get(id, 'stats', { country: c });
    tot[c] = (tot[c] || 0) + num(s.visits) - num(s.bounces);
    await sleep(150);
  }
  process.stderr.write('.');
}
const ranked = Object.entries(tot).filter(([, r]) => r > 0).sort((a, b) => b[1] - a[1]).slice(0, ROWS);
if (ranked.length < 3) { console.error('\nAlle 3 maata — ei kirjoiteta.'); process.exit(1); }
const lead = ranked[0][1];

// Edellinen sija samalta kuukaudelta (viikkomuutos-sarake). Uusi kuukausi alkaa ilman sitä.
let prevPos = {};
if (existsSync(OUT)) {
  const old = readDoc(readFileSync(OUT, 'utf8'));
  if (old.month === month) old.rows.forEach((r, i) => { prevPos[r.c] = i + 1; });
}

const doc = {
  month,
  from: hel(new Date(startAt)),
  to: hel(new Date(endAt - 1)),
  updated: today,
  final,
  sites: hosts.length,
  rows: ranked.map(([c, r]) => ({ c, i: Math.round((100 * r) / lead), ...(prevPos[c] ? { p: prevPos[c] } : {}) })),
};
writeFileSync(OUT, `// GENEROITU — scripts/fan-league-update.mjs (viikoittain Vesan koneella). Älä muokkaa käsin.
import type { FanLeagueData } from './fanLeague';

export const FAN_LEAGUE: FanLeagueData = /*JSON*/${JSON.stringify(doc, null, 1)}/*END*/;
`);
console.log(`\n${doc.from} – ${doc.to}${final ? ' (lopullinen)' : ''}, ${hosts.length} sivustoa`);
doc.rows.forEach((r, i) => console.log(String(i + 1).padStart(2), r.c, String(r.i).padStart(4), r.p ? `(oli ${r.p})` : ''));
