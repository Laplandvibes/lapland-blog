// Generate sitemap.xml and rss.xml from live Supabase posts.
// Runs as `prebuild` so the static files in dist/ are always fresh.
//
// Why fetch live: posts.ts is the seed-time fallback, but the editor writes
// directly to Supabase. Fetching from the database guarantees the sitemap and
// RSS feed reflect what's *actually* published.

import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.mjs';

// ───── env ─────
// Config (incl. the .env loader and the reason it carries fallbacks) lives in
// ./supabase-config.mjs, shared with sync-post-meta-langs.mjs.
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const SITE_URL = 'https://lapland.blog';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ───── fetch ─────
async function fetchPosts() {
  // Only the original (EN) row per article. Translations share the slug, so
  // including them would repeat every entry once per language in the feed and
  // the sitemap.
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category_slug, published_at, hero_image, updated_at')
    .eq('status', 'published')
    .is('translation_of', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[feeds] Supabase error:', error.message);
    return [];
  }
  return data ?? [];
}

// ───── helpers ─────
const escapeXml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const fmtDate = (d) => {
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const fmtRfc822 = (d) => {
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? new Date().toUTCString()
    : date.toUTCString();
};

// ───── categories (mirror src/data/categories.ts) ─────
const CATEGORY_SLUGS = ['aurora', 'cabins', 'food', 'seasons', 'people', 'gear', 'stories'];

// ───── sitemap ─────
// 12-locale hreflang rollout (2026-05-22; sv added 2026-07-13). Tier-3 locales kr/fr/it/nl/sv served.
const LOCALES = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
const DEFAULT_LOCALE = 'en';
const URL_PREFIX_OF = {
  en: '',
  fi: 'fi',
  de: 'de',
  ja: 'ja',
  es: 'es',
  'pt-BR': 'br',
  'zh-CN': 'cn',
  ko: 'kr',
  fr: 'fr',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
};

const localisedLoc = (path, locale) => {
  const norm = path === '/' ? '' : path;
  const prefix = URL_PREFIX_OF[locale] ?? locale;
  if (!prefix) return path; // EN root
  return path === '/' ? `/${prefix}` : `/${prefix}${norm}`;
};

// Absolute URL in TRAILING-SLASH form — matches the prerendered static HTML
// (Cloudflare Pages serves /path/index.html at /path/ with 200; the no-slash
// form 308-redirects, which Google flags as a redirecting sitemap URL).
const absUrl = (path, locale) => `${SITE_URL}${localisedLoc(path, locale)}`.replace(/\/?$/, '/');

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: '/start-here', changefreq: 'monthly', priority: '0.95', lastmod: today },
    { loc: '/top-reads', changefreq: 'weekly', priority: '0.95', lastmod: today },
    { loc: '/destinations', changefreq: 'monthly', priority: '0.9', lastmod: today },
    { loc: '/stories', changefreq: 'weekly', priority: '0.9', lastmod: today },
    { loc: '/about', changefreq: 'monthly', priority: '0.7', lastmod: today },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: '/cookie-policy', changefreq: 'yearly', priority: '0.3', lastmod: today },
    // /unsubscribe is deliberately NOT prerendered (see scripts/prerender.mjs),
    // so listing it here submitted 12 locale URLs that serve the SPA shell with a
    // root canonical — GSC read them as duplicates of the home page. Transactional
    // page, no search value: keep it out of the sitemap.
  ];

  const categoryPages = CATEGORY_SLUGS.map((slug) => ({
    loc: `/category/${slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: today,
  }));

  // Bump lastmod to today on every build so Search Console doesn't see stale
  // entries even when the underlying DB row hasn't changed (re-translations,
  // template tweaks, hreflang additions are all reasons to re-crawl).
  const postPages = posts.map((p) => ({
    loc: `/post/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: today,
  }));

  const all = [...staticPages, ...categoryPages, ...postPages];

  // A route flagged `canonicalLocale` in routes.json serves ONE language on every
  // locale URL, and its HTML says so: canonical → that locale, hreflang en +
  // x-default only. Emitting twelve sitemap rows with full alternates for such a
  // route contradicts the page itself — it submits 121 URLs that each declare
  // "I am not the canonical". Read the flag from the SAME file the prerenderer
  // reads, so the sitemap and the HTML cannot drift apart.
  const routesPath = resolve(root, 'scripts', 'routes.json');
  const canonicalOnly = new Map();
  if (existsSync(routesPath)) {
    for (const r of JSON.parse(readFileSync(routesPath, 'utf-8'))) {
      if (r.canonicalLocale) canonicalOnly.set(r.path, r.canonicalLocale);
    }
  }

  // Emit one <url> entry PER (path, locale) combination, with xhtml:link
  // alternates for every locale + x-default → English. Mirrors the pattern
  // used by laplandvibes.com hub generator (multi-language sitemap spec).
  const entries = [];
  for (const u of all) {
    const only = canonicalOnly.get(u.loc);
    for (const locale of only ? [only] : LOCALES) {
      const fullLoc = absUrl(u.loc, locale);
      const alts = (only ? [only] : LOCALES).map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(u.loc, l)}"/>`,
      ).join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(u.loc, DEFAULT_LOCALE)}"/>`;
      entries.push(`  <url>
    <loc>${fullLoc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${alts}
${xDefault}
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

// ───── RSS ─────
function buildRss(posts) {
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/post/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/post/${p.slug}</guid>
      <pubDate>${fmtRfc822(p.published_at)}</pubDate>
      <description>${escapeXml(p.excerpt ?? '')}</description>
      <category>${escapeXml(p.category_slug ?? 'stories')}</category>
      ${p.hero_image ? `<enclosure url="${escapeXml(p.hero_image)}" type="image/webp"/>` : ''}
      <author>info@lapland.blog (The Field Journal)</author>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Lapland.blog · Field journal from Finnish Lapland</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>A first-person field journal from Finnish Lapland: honest, seasonal, written by someone who actually lives here. Aurora, cabins, seasons, food, people.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Lapeso Oy</copyright>
    <managingEditor>info@lapland.blog (Lapland.blog)</managingEditor>
    <webMaster>info@lapland.blog (Lapland.blog)</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>lapland.blog custom generator</generator>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>Lapland.blog</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>
`;
}

// ───── write ─────
async function main() {
  console.log('[feeds] Fetching posts from Supabase…');
  const posts = await fetchPosts();
  console.log(`[feeds] ${posts.length} published post${posts.length === 1 ? '' : 's'} found.`);

  if (posts.length === 0) {
    console.warn('[feeds] No posts found — generating with empty post list.');
  }

  const sitemap = buildSitemap(posts);
  const rss = buildRss(posts);

  await mkdir(resolve(root, 'public'), { recursive: true });
  await writeFile(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
  await writeFile(resolve(root, 'public/rss.xml'), rss, 'utf8');

  // also stamp dist/ if it already exists (for re-runs without full build)
  if (existsSync(resolve(root, 'dist'))) {
    await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8');
    await writeFile(resolve(root, 'dist/rss.xml'), rss, 'utf8');
  }

  console.log('[feeds] ✔ public/sitemap.xml');
  console.log('[feeds] ✔ public/rss.xml');
  console.log(`[feeds] Site: ${SITE_URL}`);
}

main().catch((err) => {
  console.error('[feeds] FAILED:', err);
  process.exit(1);
});
