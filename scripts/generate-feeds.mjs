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
import { readFileSync, existsSync } from 'node:fs';

// ───── env ─────
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const envPath = resolve(root, '.env');

if (existsSync(envPath)) {
  const txt = readFileSync(envPath, 'utf8');
  for (const line of txt.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=["']?(.+?)["']?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SITE_URL = 'https://lapland.blog';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('[feeds] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ───── fetch ─────
async function fetchPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category_slug, published_at, hero_image, updated_at')
    .eq('status', 'published')
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
function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: '/stories', changefreq: 'weekly', priority: '0.9', lastmod: today },
    { loc: '/about', changefreq: 'monthly', priority: '0.7', lastmod: today },
    { loc: '/signin', changefreq: 'yearly', priority: '0.4', lastmod: today },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: '/cookie-policy', changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: '/unsubscribe', changefreq: 'yearly', priority: '0.2', lastmod: today },
  ];

  const categoryPages = CATEGORY_SLUGS.map((slug) => ({
    loc: `/category/${slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: today,
  }));

  const postPages = posts.map((p) => ({
    loc: `/post/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: (p.updated_at ?? p.published_at ?? today).slice(0, 10),
  }));

  const all = [...staticPages, ...categoryPages, ...postPages];

  const urls = all
    .map(
      (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
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
      <author>laplandvibe@gmail.com (Vesa Pesola)</author>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Lapland.blog — Field journal from Finnish Lapland</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>A first-person field journal from Finnish Lapland — honest, seasonal, written by someone who actually lives here. Aurora, cabins, seasons, food, people.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Lapeso Oy</copyright>
    <managingEditor>laplandvibe@gmail.com (Vesa Pesola)</managingEditor>
    <webMaster>laplandvibe@gmail.com (Vesa Pesola)</webMaster>
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
