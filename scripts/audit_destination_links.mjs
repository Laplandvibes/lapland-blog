#!/usr/bin/env node
// Portti: jokainen kohdesivun verkostolinkki haetaan LIVENA.
//
// Miksi (Vesa 2026-09-16): kohdesivut lupaavat lukijalle "lue lisää tästä
// kohteesta" ja vievät sisarsivustolle. Lupaus on niin hyvä kuin linkki on
// elossa, ja linkit osoittavat SEITSEMÄÄN eri repoon joita tämä repo ei näe.
// Sivustokohtainen polkukaava voi muuttua ilman että täällä huomataan mitään.
//
// 🔴 Nolla osumaa ei ole tulos. Ensimmäinen versio tästä jäsentimestä kaatui
// CRLF-rivinvaihtoihin ja raportoi "0 linkkiä elossa" vihreänä. Siksi
// jäsennetty määrä tarkistetaan ennen kuin yhtäkään pyyntöä lähetetään.
//
// Aja: node scripts/audit_destination_links.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const juuri = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rivit = fs.readFileSync(path.join(juuri, 'src/data/destinationLinks.ts'), 'utf8').split(/\r?\n/);

const hostit = {};
for (const r of rivit) {
  const m = r.trim().match(/^(\w+): \{ key: '\w+', host: '([^']+)'/);
  if (m) hostit[m[1]] = m[2];
}

let sisalla = false;
let kohde = null;
const linkit = [];
for (const r of rivit) {
  const t = r.trim();
  if (t.startsWith('export const DESTINATION_LINKS')) { sisalla = true; continue; }
  if (sisalla && t.startsWith('export function')) break;
  if (!sisalla) continue;
  const k = t.match(/^(\w+): \{$/);
  if (k) { kohde = k[1]; continue; }
  const l = t.match(/^(\w+): '([^']+)',$/);
  if (l && kohde && hostit[l[1]]) linkit.push({ kohde, avain: l[1], url: `https://${hostit[l[1]]}${l[2]}` });
}

const VAHINTAAN = 30;
if (linkit.length < VAHINTAAN) {
  console.error(`FAIL  jäsennin luki vain ${linkit.length} linkkiä (odotettu vähintään ${VAHINTAAN}).`);
  console.error('      destinationLinks.ts:n muoto on muuttunut — korjaa jäsennin, älä hyväksy tyhjää tulosta.');
  process.exit(1);
}

console.log(`Tarkistetaan ${linkit.length} linkkiä ${Object.keys(hostit).length} sivustolla…\n`);
let kuolleet = 0;
for (const { kohde, avain, url } of linkit) {
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LV-linkkiportti)' } });
    const html = await r.text();
    // SPA palauttaa 200 myös tuntemattomalle polulle, joten sisältö tarkistetaan.
    const rikki = !r.ok || /page not found|sivua ei l[oö]ydy|<title>404/i.test(html.slice(0, 5000));
    if (rikki) { kuolleet++; console.log(`  FAIL  ${kohde.padEnd(12)} ${avain.padEnd(12)} ${r.status}  ${url}`); }
  } catch (e) {
    kuolleet++;
    console.log(`  FAIL  ${kohde.padEnd(12)} ${avain.padEnd(12)} ERR  ${url}  (${e.message})`);
  }
}

if (kuolleet) {
  console.error(`\n${kuolleet}/${linkit.length} kuollutta linkkiä. Poista rivi destinationLinks.ts:stä tai korjaa polku.`);
  process.exit(1);
}
console.log(`\nOK  kaikki ${linkit.length} linkkiä elossa.`);
