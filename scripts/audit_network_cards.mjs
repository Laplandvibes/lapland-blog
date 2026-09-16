/**
 * AUDIT: osuvatko artikkelin verkostokortit juttuun — ja saako sama juttu
 * samat kortit jokaisella kielellä?
 *
 * Kortit valitaan jutun `category_slug`- ja `tags`-kentistä (ks.
 * src/lib/crossSiteLinks.ts). Tagit EIVÄT ole automaattisesti kielestä
 * riippumattomia: 16.9.2026 yksi julkaistu juttu 11:stä oli tagitettu
 * eri kielillä eri sanoin (autiotuvat / wilderness-huts / odestugor), joten
 * kielten yhtäpitävyys pitää MITATA eikä olettaa.
 *
 * 🔴 Tämä ei ole buildin portti eikä pyöri CI:ssä: se lukee tuotantokannan ja
 *    importtaa .ts-lähteen suoraan (vaatii Node 22.18+, CI ajaa Node 20:tä).
 *    Buildin portti on scripts/assert-network-cards.mjs, joka mittaa käännökset.
 *
 * Aja: npm run gate:korttivalinta
 */
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.mjs';

const [maj, min] = process.versions.node.split('.').map(Number);
if (maj < 22 || (maj === 22 && min < 18)) {
  console.error(
    `audit_network_cards: Node ${process.versions.node} ei riisu tyyppejä .ts-tiedostoista (tarvitaan 22.18+).`,
  );
  process.exit(1);
}

const { detectCrossSiteLinks, NETWORK_SITES, normalizeTag } = await import('../src/lib/crossSiteLinks.ts');

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const { data, error } = await supabase
  .from('blog_posts')
  .select('slug, lang, category_slug, tags')
  .eq('status', 'published');

if (error) {
  console.error('audit_network_cards: Supabase-virhe —', error.message);
  process.exit(1);
}
if (!data?.length) {
  console.error('audit_network_cards: 0 julkaistua juttua — nolla ei ole tulos, auditti ei mitannut mitään.');
  process.exit(1);
}

const bySlug = new Map();
for (const r of data) {
  if (!bySlug.has(r.slug)) bySlug.set(r.slug, []);
  bySlug.get(r.slug).push(r);
}

const problems = [];
const unmapped = new Map();
let rows = 0;

console.log(`audit_network_cards: ${data.length} julkaistua riviä, ${bySlug.size} juttua\n`);
console.log('juttu'.padEnd(52), 'kategoria'.padEnd(10), 'kortit (sama joukko kaikilla kielillä?)');

for (const [slug, langs] of [...bySlug].sort()) {
  const perLang = langs.map((r) => {
    const cards = detectCrossSiteLinks({ category: r.category_slug, tags: r.tags ?? [] }).map((c) => c.key);
    for (const t of r.tags ?? []) {
      const key = normalizeTag(t);
      if (key && !cards.length) unmapped.set(key, (unmapped.get(key) ?? 0) + 1);
    }
    return { lang: r.lang, cards, cat: r.category_slug };
  });
  rows += perLang.length;

  const sets = new Set(perLang.map((p) => p.cards.join('>')));
  const same = sets.size === 1;
  const shown = perLang[0].cards;

  if (!same) {
    problems.push(
      `${slug}: kortit eroavat kielittäin — ${perLang.map((p) => `${p.lang}: ${p.cards.join('+') || '—'}`).join(' · ')}`,
    );
  }
  for (const p of perLang) {
    if (p.cards.length < 2) problems.push(`${slug} [${p.lang}]: vain ${p.cards.length} korttia`);
  }
  console.log(
    slug.slice(0, 50).padEnd(52),
    String(perLang[0].cat).padEnd(10),
    (shown.join(', ') || '—') + (same ? '' : '   🔴 ERI KIELILLÄ ERI'),
  );
}

// Tiedoksi, ei virhe: moni tagi on paikannimi tai vuodenaika eikä kuulukaan
// osoittaa mihinkään sivustoon.
const orphanTags = [...unmapped.keys()].sort();
if (orphanTags.length) console.log(`\nTageja jotka eivät osoita mihinkään sivustoon: ${orphanTags.join(', ')}`);

console.log(`\nSivustoja käytössä: ${Object.keys(NETWORK_SITES).length}`);

if (problems.length) {
  console.error('\naudit_network_cards: PUNAINEN');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`\naudit_network_cards: ${rows} juttu×kieli · jokaisella ≥2 korttia · sama joukko kaikilla kielillä`);
