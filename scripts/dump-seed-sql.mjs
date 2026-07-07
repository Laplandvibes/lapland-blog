// Dumps the five hardcoded posts from src/data/posts.ts as ready-to-run SQL,
// one file per post so each can be fed through Supabase execute_sql without
// hitting argument size limits.
//
// Usage: node scripts/dump-seed-sql.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.resolve(__dirname, '..', 'src', 'data', 'posts.ts');

const source = await readFile(postsPath, 'utf8');

const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
    isolatedModules: false,
  },
}).outputText;

const runnable = transpiled.replace(/^import[^;]+;\n?/m, '');
const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(runnable)}`;
const mod = await import(dataUrl);
const posts = mod.posts;

function sqlString(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlJsonb(obj) {
  const json = JSON.stringify(obj);
  return `'${json.replace(/'/g, "''")}'::jsonb`;
}

function sqlTextArray(arr) {
  if (!arr || arr.length === 0) return `ARRAY[]::text[]`;
  const items = arr.map((t) => `'${String(t).replace(/'/g, "''")}'`).join(',');
  return `ARRAY[${items}]::text[]`;
}

// Editorial voice, not a real individual (honest-attribution rule). The seed
// posts are bylined "The Field Journal", matching src/data/author.ts.
const authorSnapshot = {
  handle: 'fieldjournal',
  display_name: 'The Field Journal',
  avatar_url: null,
};

let i = 0;
for (const post of posts) {
  i += 1;
  const stmt = `insert into public.blog_posts (
  slug, title, kicker, excerpt, category_slug, tags, hero_image, hero_alt,
  content, author_id, author_snapshot, status, published_at, featured,
  read_time_minutes
) values (
  ${sqlString(post.slug)},
  ${sqlString(post.title)},
  ${sqlString(post.kicker)},
  ${sqlString(post.excerpt)},
  ${sqlString(post.category)},
  ${sqlTextArray(post.tags)},
  ${sqlString(post.heroImage)},
  ${sqlString(post.heroAlt)},
  ${sqlJsonb(post.content)},
  NULL,
  ${sqlJsonb(authorSnapshot)},
  'published',
  ${sqlString(post.publishedAt)}::timestamptz,
  ${post.featured ? 'true' : 'false'},
  ${post.readTimeMinutes}
)
on conflict (slug) do update set
  title = excluded.title,
  kicker = excluded.kicker,
  excerpt = excluded.excerpt,
  category_slug = excluded.category_slug,
  tags = excluded.tags,
  hero_image = excluded.hero_image,
  hero_alt = excluded.hero_alt,
  content = excluded.content,
  author_snapshot = excluded.author_snapshot,
  status = excluded.status,
  published_at = excluded.published_at,
  featured = excluded.featured,
  read_time_minutes = excluded.read_time_minutes;`;
  const n = String(i).padStart(2, '0');
  const outPath = path.resolve(__dirname, `seed-post-${n}-${post.slug}.sql`);
  await writeFile(outPath, stmt, 'utf8');
  console.log(`${outPath}  (${stmt.length} chars)`);
}
