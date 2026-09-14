#!/usr/bin/env node
/**
 * gen-image-versions.mjs — ajonaikaiset kuvaosoitteet saavat saman ?v=-tiivisteen
 * kuin prerenderöity HTML.
 *
 * ── MIKSI (mitattu 14.9.2026, perfprobe lapland.blog/) ─────────────────────
 *
 * Selain latasi heron KAHDESTI. `<link rel=preload imagesrcset>` pyysi
 * `/images/hero-aurora-1200.webp?v=7a9e9e3d` (version-images.mjs versioi
 * dist-HTML:n), mutta Reactin renderöimä `<img srcset>` pyysi
 * `/images/hero-aurora-1200.webp` ILMAN tagia, koska getImage() rakentaa
 * osoitteen ajossa palasista (`/images/${base}-${w}.webp`), joita
 * version-images ei löydä nipusta merkkijonona. Kaksi eri osoitetta = kaksi
 * latausta (156 kB mobiilissa, 238 kB työpöydällä) joka etusivukäynnillä, ja
 * preload meni hukkaan. Sama koski jokaista korttikuvaa, jolla on sekä
 * prerenderöity että ajonaikainen viittaus.
 *
 * ── RATKAISU ───────────────────────────────────────────────────────────────
 *
 * Prebuild laskee saman tiivisteen (sha256, 8 hex — täsmälleen kuten
 * version-images.mjs) jokaiselle public/images-tiedostolle ja kirjoittaa sen
 * TypeScript-moduuliksi, jonka getImage() lukee. Ajonaikainen ja
 * prerenderöity osoite ovat silloin tavulleen samat, ja version-images.mjs
 * jättää ne rauhaan ("jo versioitu").
 *
 * 🔴 Tiedosto on committoitu (kuten src/shared/appStats.ts), jotta `vite dev`
 * ja `tsc` toimivat myös ilman prebuildia. Prebuild pitää sen ajan tasalla;
 * `--check` kertoo eroaako levyllä oleva versio nykyisistä kuvista.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const OUT = path.join(ROOT, 'src', 'lib', 'imageVersions.gen.ts');
const CHECK = process.argv.includes('--check');
const EXT = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png', '.svg', '.gif']);

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const entries = [];
for (const f of walk(IMAGES)) {
  if (!EXT.has(path.extname(f).toLowerCase())) continue;
  const rel = '/images/' + path.relative(IMAGES, f).split(path.sep).join('/');
  const h = crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0, 8);
  entries.push([rel, h]);
}
entries.sort((a, b) => a[0].localeCompare(b[0]));

const body =
  '// GENEROITU — älä muokkaa käsin. Lähde: scripts/gen-image-versions.mjs (prebuild).\n' +
  '// Avain = polku /images/-juuresta, arvo = sisällön sha256:n 8 ensimmäistä merkkiä,\n' +
  '// sama tiiviste jonka version-images.mjs kirjoittaa prerenderöityyn HTML:ään.\n' +
  'export const IMAGE_VERSIONS: Record<string, string> = {\n' +
  entries.map(([k, v]) => `  '${k}': '${v}',`).join('\n') +
  '\n};\n';

const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
if (current === body) {
  console.log(`gen-image-versions: ${entries.length} kuvaa, ei muutoksia`);
} else if (CHECK) {
  console.error(`gen-image-versions: src/lib/imageVersions.gen.ts on vanhentunut — aja node scripts/gen-image-versions.mjs`);
  process.exit(1);
} else {
  fs.writeFileSync(OUT, body);
  console.log(`gen-image-versions: ${entries.length} kuvaa → src/lib/imageVersions.gen.ts päivitetty`);
}
