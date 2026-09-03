// Fills fallbackTitleByLang / fallbackDescriptionByLang on every /post/ route in
// routes.json from the translations in Supabase, so prerendered fi/sv post pages
// ship a localized <title> and description instead of falling back to English.
//
// Run after adding or editing translations:  node scripts/sync-post-meta-langs.mjs
// The prerender step reads these keys (see _prerender_routes.mjs).

import { readFileSync, writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.mjs';

const ROUTES = new URL('./routes.json', import.meta.url);

// Config (incl. the .env loader and the reason it carries fallbacks) lives in
// ./supabase-config.mjs, shared with generate-feeds.mjs. This file used to read
// ../.env with an unguarded readFileSync, so `npm run build` died with ENOENT
// anywhere .env was absent - which is every clean-clone CI build.
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SITE_SUFFIX = ' · Lapland.blog';

const { data, error } = await supabase
  .from('blog_posts')
  .select('slug, lang, title, excerpt')
  .eq('status', 'published')
  .not('lang', 'is', null)
  .neq('lang', 'en');

if (error) {
  console.error('[post-meta] Supabase error:', error.message);
  process.exit(1);
}

// slug -> { lang: {title, excerpt} }
const bySlug = new Map();
for (const row of data ?? []) {
  if (!bySlug.has(row.slug)) bySlug.set(row.slug, {});
  bySlug.get(row.slug)[row.lang] = row;
}

const routes = JSON.parse(readFileSync(ROUTES, 'utf-8'));
let touched = 0;
const langsSeen = new Set();

for (const route of routes) {
  if (!route.path?.startsWith('/post/')) continue;
  const slug = route.path.slice('/post/'.length);
  const translations = bySlug.get(slug);
  if (!translations) {
    console.warn(`[post-meta] no translations for ${slug}`);
    continue;
  }

  const titles = {};
  const descriptions = {};
  for (const [lang, row] of Object.entries(translations)) {
    if (!row.title) continue;
    titles[lang] = row.title + SITE_SUFFIX;
    if (row.excerpt) descriptions[lang] = row.excerpt;
    langsSeen.add(lang);
  }
  if (!Object.keys(titles).length) continue;

  // Merge: keep hand-written list titles for languages that have no Supabase
  // translation (de/es/fr/it/nl/ja/ko/pt-BR/zh-CN carry "(EN)"-marked titles for
  // the crawlable link list — see KIELIPASSIT 2026-09-03). Supabase wins per lang.
  route.fallbackTitleByLang = { ...(route.fallbackTitleByLang || {}), ...titles };
  route.fallbackDescriptionByLang = { ...(route.fallbackDescriptionByLang || {}), ...descriptions };
  touched++;
}

writeFileSync(ROUTES, JSON.stringify(routes, null, 2) + '\n', 'utf-8');
console.log(
  `[post-meta] wrote ${touched} post routes · languages: ${[...langsSeen].sort().join(', ')}`
);

// ── Ajautumisvahti: julkaistut postit vs. prerenderoidyt reitit ────────────
// 🔴 routes.json on KASIN yllapidetty, mutta postit julkaistaan /admin-CMS:sta.
// Kun catch-all poistui 23.8.2026, prerenderoimaton polku ei enaa vastaa
// automaattisesti 200:lla — functions/_middleware.js kysyy Supabaselta ja
// pitaa uuden postin elossa, mutta se sivu jaa ILMAN prerenderoityja metoja
// (title, description, og, hreflang). Se ei nay mistaan ilman tata riviä.
//
// Ei kaada buildia: middleware kattaa tilanteen ajonaikaisesti, ja punainen
// build estaisi kaikki muut korjaukset yhden julkaisematta jaaneen metan
// takia. AanekaS varoitus riittaa — hiljainen ei.
{
  const { data: kaikki, error: virhe } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');
  if (virhe) {
    console.warn('[post-meta] ajautumisvahtia ei voitu ajaa:', virhe.message);
  } else {
    const julkaistut = [...new Set((kaikki ?? []).map((r) => r.slug))];
    const prerenderoidyt = new Set(
      routes.filter((r) => r.path.startsWith('/post/')).map((r) => r.path.slice(6)),
    );
    const puuttuvat = julkaistut.filter((s) => !prerenderoidyt.has(s));
    const ylimaaraiset = [...prerenderoidyt].filter((s) => !julkaistut.includes(s));
    if (puuttuvat.length) {
      console.warn(
        `\n[post-meta] ⚠️  ${puuttuvat.length} julkaistua postia ILMAN prerenderoityja metoja:\n` +
          puuttuvat.map((s) => '    /post/' + s).join('\n') +
          '\n    Sivu toimii (middleware), mutta silla ei ole title/description/og/hreflangia.\n' +
          '    Lisaa reitti scripts/routes.jsoniin ja aja build uudelleen.\n',
      );
    }
    if (ylimaaraiset.length) {
      console.warn(
        `[post-meta] ⚠️  ${ylimaaraiset.length} prerenderoitya reittia joita ei ole julkaistuna: ` +
          ylimaaraiset.map((s) => '/post/' + s).join(', ') +
          ' — poistettu tai luonnos? Prerenderoity sivu vastaa 200:lla.',
      );
    }
    if (!puuttuvat.length && !ylimaaraiset.length) {
      console.log(`[post-meta] ajautumisvahti OK — ${julkaistut.length} julkaistua postia, kaikki prerenderoitu`);
    }
  }
}
