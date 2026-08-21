// assert-newsletter-wired.mjs — kaataa buildin jos uutiskirjeen fetch ei paady
// bundleen TAI ei osoita oikeaan Supabase-hostiin. Aja vite buildin JALKEEN.
//
// MIKSI TAMA ON OLEMASSA (yopartio 2026-08-21, verkostoauditti):
// Uutiskirjeen osoite ja avain luettiin `import.meta.env.VITE_SUPABASE_*`:sta
// ilman fallbackia. Vite inlinettaa nuo arvot BUILD-hetkella, ja .env on
// gitignoressa (`.env` + `.env.*`) -> puhtaasta klonista buildattaessa arvot
// ovat undefined. Sisarsivustoilla se tuotti kolme eri oiretta samasta juuresta:
// popup POSTasi osoitteeseen "undefined/functions/v1/..." (nightlife, tours),
// inline-lomake naytti onnistumisen lahettamatta mitaan koska bundleri poisti
// env-ehtoisen fetchin kuolleena koodina (deals), ja tassa repossa
// createClient('', '') olisi heittanyt heti moduulin latauksessa eli koko blogi
// olisi jaanyt tyhjaksi sivuksi.
//
// Lahde on nyt korjattu (src/lib/supabaseConfig.ts + scripts/supabase-config.mjs
// kantavat julkiset fallbackit), mutta saanto joka pysayttaa deployn ei voi
// asua dokumentissa - sen pitaa kaataa build. Tama portti mittaa TULOKSEN eli
// bundlen, ei lahdekoodia: lahteessa oleva fetch ei todista etta se on myos
// buildissa.
//
// 🔴 KOLME ANSAA JOTKA TEKEVAT NAIVISTA GREPISTA HYODYTTOMAN
// 1. Pelkka `supabase.co`-osuma ei todista uutiskirjeesta mitaan: shared/
//    Footer.tsx:n send-contact-email on kovakoodattu SAMAAN hostiin. Siksi
//    mitataan nimetyt polut, ei hostia.
// 2. Host ei ole samassa chunkissa kuin fetch, eika sen kuulukaan olla: arvo
//    tulee jaetusta moduulista, joten inline-lomakkeen chunkissa lukee vain
//    fetch(`${p}/functions/v1/send-welcome-email`) ja `p` importataan
//    naapurista. Siksi tunniste RATKAISTAAN import- ja export-kartan lapi.
// 3. "Host loytyy jostain chunkista" ei riita: index-chunk importtaa laiskasti
//    kaikki reitit, joten mika tahansa saavutettavuushaku palauttaa aina true.
//    Siksi jokainen ESIINTYMA ratkaistaan erikseen omasta lausekkeestaan.
//
// KORJAUS jos tama portti laukeaa: ala deployaa. Tarkista etta pinta importtaa
// SUPABASE_URL/SUPABASE_ANON_KEY tiedostosta src/lib/supabaseConfig.ts eika lue
// import.meta.env.VITE_SUPABASE_*:aa suoraan.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'dist/assets';
const HOST_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';

// Odotettu maara kutsupaikkoja. send-welcome-email: inline-lomake
// (src/components/Newsletter.tsx) + jaettu popup (src/components/
// NewsletterPopup.tsx). unsubscribe: src/pages/Unsubscribe.tsx.
// Jos pinta karsiutuu kuolleena koodina, luku tippuu ja portti laukeaa.
const EXPECTED = { 'send-welcome-email': 2, unsubscribe: 1 };

const files = readdirSync(DIR).filter((f) => f.endsWith('.js'));
const src = new Map(files.map((f) => [f, readFileSync(join(DIR, f), 'utf8')]));

/** `import{a as b,c}from"./X.js"` -> Map(paikallinen -> {chunk, vietyNimi}) */
function importMap(file) {
  const map = new Map();
  for (const m of src.get(file).matchAll(/import\{([^}]*)\}from"\.\/([A-Za-z0-9_.$-]+\.js)"/g)) {
    for (const part of m[1].split(',')) {
      const [exported, local] = part.trim().split(/\s+as\s+/);
      if (exported) map.set((local || exported).trim(), { chunk: m[2], exported: exported.trim() });
    }
  }
  return map;
}

/** `export{k as r,...}` -> Map(vietyNimi -> paikallinen) */
function exportMap(file) {
  const map = new Map();
  for (const m of src.get(file).matchAll(/export\{([^}]*)\}/g)) {
    for (const part of m[1].split(',')) {
      const [local, exported] = part.trim().split(/\s+as\s+/);
      if (local) map.set((exported || local).trim(), local.trim());
    }
  }
  return map;
}

/** Ratkaise merkkijonovakion arvo tunnisteelle, importtien lapi. */
function resolveConst(file, ident, depth = 0) {
  if (!src.has(file) || depth > 6) return null;
  const local = new RegExp(
    String.raw`(?:var|let|const)\s+${ident.replace(/\$/g, '\$')}\s*=\s*[` + '`' + String.raw`"']([^` + '`' + String.raw`"']*)[` + '`' + String.raw`"']`
  ).exec(src.get(file));
  if (local) return local[1];
  const imported = importMap(file).get(ident);
  if (!imported) return null;
  const localName = exportMap(imported.chunk).get(imported.exported);
  return localName ? resolveConst(imported.chunk, localName, depth + 1) : null;
}

const problems = [];
const counts = { 'send-welcome-email': 0, unsubscribe: 0 };
let propDriven = 0;

// ── 1) Jokainen kutsupaikka bundlessa ─────────────────────────────────────────
for (const [file, js] of src) {
  for (const m of js.matchAll(/([^`"']{0,60})\/functions\/v1\/(send-welcome-email|unsubscribe)/g)) {
    const [, prefix, fn] = m;
    counts[fn] += 1;
    if (prefix.endsWith(HOST_URL)) continue; // litteroitunut vakio
    const ident = /\$\{([A-Za-z_$][\w$]*)\}$/.exec(prefix);
    if (!ident) {
      problems.push(`${file}: ${fn} kutsutaan osoitteesta jota ei tunnisteta: "...${prefix.slice(-40)}/functions/v1/${fn}"`);
      continue;
    }
    const value = resolveConst(file, ident[1]);
    if (value === HOST_URL) continue;
    if (value !== null) {
      problems.push(`${file}: ${fn} kutsutaan tunnisteella \${${ident[1]}} joka ratkeaa arvoon "${value}" eika ${HOST_URL}`);
      continue;
    }
    // Ratkeamaton tunniste = jaetun popupin propsina saatu osoite. Se on
    // sallittu TASMALLEEN kerran ja vain welcome-kutsulle; itse arvo
    // varmistetaan kohdassa 2 kutsupaikalta.
    propDriven += 1;
    if (fn !== 'send-welcome-email' || propDriven > 1) {
      problems.push(`${file}: ${fn} kutsutaan tunnisteella \${${ident[1]}} jota ei voi ratkaista staattisesti`);
    }
  }
}

// ── 2) Jaetun popupin propsit (osoite tulee propsina, ei vakiona) ─────────────
// 🔴 Ankkurina brandWord eika siteId: `siteId:`laplandblog`` esiintyy myos
// CookiePolicy-chunkissa (jaettu legal-komponentti saa saman siteId:n).
const MOUNT = 'brandWord:`.BLOG`';
const mounts = [];
for (const [file, js] of src) {
  let at = js.indexOf(MOUNT);
  while (at !== -1) {
    mounts.push({ file, window: js.slice(Math.max(0, at - 200), at + 300) });
    at = js.indexOf(MOUNT, at + 1);
  }
}
if (mounts.length === 0) {
  problems.push(`jaettua popupia (${MOUNT}) ei ole yhdessakaan chunkissa - koko pinta puuttuu buildista`);
}
for (const mount of mounts) {
  const prop = /supabaseUrl:(`[^`]*`|[A-Za-z_$][\w$]*)/.exec(mount.window);
  if (!prop) {
    problems.push(`${mount.file}: popupin supabaseUrl-propsia ei tunnisteta (odotettu vakio tai tunniste)`);
    continue;
  }
  const value = prop[1].startsWith('`') ? prop[1].slice(1, -1) : resolveConst(mount.file, prop[1]);
  if (value !== HOST_URL) {
    problems.push(`${mount.file}: popupin supabaseUrl ratkeaa arvoon ${value === null ? '(ei ratkennut)' : `"${value}"`} eika ${HOST_URL}`);
  }
}

// ── 3) Kutsupaikkojen maara (kuolleena koodina karsiutunut pinta) ─────────────
for (const [fn, want] of Object.entries(EXPECTED)) {
  if (counts[fn] < want) {
    problems.push(`${fn}: ${counts[fn]}/${want} kutsupaikkaa bundlessa - pinta on karsiutunut kuolleena koodina`);
  }
}

if (problems.length > 0) {
  console.error('');
  console.error('❌ [newsletter-wired] UUTISKIRJE EI OLE KYTKETTY - ALA DEPLOYAA');
  for (const p of problems) console.error(`   - ${p}`);
  console.error('');
  console.error('   Syy lahes varmasti: pinta lukee import.meta.env.VITE_SUPABASE_*:aa');
  console.error('   suoraan, ja .env puuttui build-hetkella. Korjaus: importoi arvot');
  console.error('   tiedostosta src/lib/supabaseConfig.ts (ks. taman tiedoston kommentti).');
  console.error('');
  process.exit(1);
}

console.log(
  `[newsletter-wired] OK - send-welcome-email ${counts['send-welcome-email']} + unsubscribe ${counts.unsubscribe} kutsupaikkaa, popup-mount ${mounts.length}, kaikki -> ${HOST_URL}`
);
