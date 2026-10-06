#!/usr/bin/env node
// Page meta that the prerendered HTML and the browser must show identically (gate:meta-hydraatio, lv-ops).
// Both sides read ONE source; this script carries that source to the side that cannot read it directly.
//
//  1. /destinations/<slug>: <title> = placeName() from src/data/destinations.ts, description =
//     destinationDescription() from src/data/destinationMeta.mjs over the copy's blurb + metaSuffix.
//     Written into scripts/prerender-meta.json, the prerenderer's first source; Destination.tsx calls the
//     same two functions in the browser.
//  2. Every route's canonicalLocale and the /post/<slug> titles and descriptions, read from
//     scripts/routes.json (the prerenderer's own source; fi/sv post rows come from Supabase through
//     sync-post-meta-langs.mjs, which runs just before this). Written into src/lib/canonicalLocale.gen.ts
//     (useSeo) and src/lib/postMeta.gen.ts (Post.tsx), so the browser sets the same canonical, hreflang,
//     <title> and description as the static page.
//
//   node scripts/gen-page-meta.mjs           write all three (prebuild, after sync-post-meta-langs)
//   node scripts/gen-page-meta.mjs --check   exit 1 if any of them is stale
//
// The copy files and destinations.ts are TypeScript. CI builds on Node 20, which cannot import .ts, so they
// are transpiled with the project's own TypeScript into a temporary directory and imported from there.
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';
import { destinationDescription, fitsDescription } from '../src/data/destinationMeta.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const ROUTES = join(ROOT, 'scripts', 'routes.json');
const META = join(ROOT, 'scripts', 'prerender-meta.json');
const OUT_CANONICAL = join(ROOT, 'src', 'lib', 'canonicalLocale.gen.ts');
const OUT_POSTS = join(ROOT, 'src', 'lib', 'postMeta.gen.ts');

// Language codes as the prerenderer and src/i18n/useLang.ts use them; the copy file of each.
const LANGS = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
const COPY_FILE = (l) => `copy.${l === 'pt-BR' ? 'ptBR' : l === 'zh-CN' ? 'zhCN' : l}.ts`;

/** Import TypeScript modules that use only erasable syntax and import each other by relative path. */
async function importTs(files) {
  const tmp = mkdtempSync(join(tmpdir(), 'lv-blog-page-meta-'));
  try {
    const out = (f) => join(tmp, basename(f).replace(/\.tsx?$/, '.mjs'));
    for (const f of files) {
      const js = ts.transpileModule(readFileSync(f, 'utf8'), {
        fileName: basename(f),
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      }).outputText;
      // Type-only imports are gone after transpiling; a runtime import (copy.fr.ts spreads copy.en) must
      // point at a sibling that is transpiled in the same call.
      writeFileSync(out(f), js.replace(/(\bfrom\s+['"])\.\/([^'"]+?)(?:\.ts)?(['"])/g, '$1./$2.mjs$3'));
    }
    const mods = {};
    for (const f of files) mods[f] = await import(pathToFileURL(out(f)).href);
    return mods;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

const stale = [];
function emit(file, text) {
  const old = existsSync(file) ? readFileSync(file, 'utf8') : null;
  if (old === text) return;
  if (CHECK) { stale.push(file.slice(ROOT.length + 1)); return; }
  writeFileSync(file, text);
  console.log(`[page-meta] wrote ${file.slice(ROOT.length + 1)}`);
}

// ── 1. Destination pages → prerender-meta.json ───────────────────────────────────────────────────────
const copyFiles = LANGS.map((l) => join(ROOT, 'src', 'locales', COPY_FILE(l)));
const destFile = join(ROOT, 'src', 'data', 'destinations.ts');
const mods = await importTs([...copyFiles, destFile]);
const { DESTINATIONS, placeName } = mods[destFile];
const meta = JSON.parse(readFileSync(META, 'utf8'));
for (const key of Object.keys(meta)) if (key.startsWith('/destinations/')) delete meta[key];
let cut = 0;
for (const d of DESTINATIONS) {
  const entry = {};
  for (const l of LANGS) {
    const copy = mods[copyFiles[LANGS.indexOf(l)]].default;
    const blurb = copy.destinations.places[d.slug]?.blurb ?? d.blurb;
    const description = destinationDescription(blurb, copy.destination.metaSuffix, l);
    if (!description.endsWith(copy.destination.metaSuffix.trim())) cut++;
    if (!fitsDescription(description)) {
      console.warn(`[page-meta] WARN ${l} /destinations/${d.slug}: the blurb alone is over 160 characters or 200 width units — the prerenderer will cut it`);
    }
    entry[l] = { title: placeName(d, l), description };
  }
  meta[`/destinations/${d.slug}`] = entry;
}
emit(META, JSON.stringify(meta, null, 2) + '\n');

// ── 2. routes.json → canonicalLocale.gen.ts + postMeta.gen.ts ────────────────────────────────────────
const routes = JSON.parse(readFileSync(ROUTES, 'utf8'));
const canonical = {};
const posts = {};
for (const r of routes) {
  if (Array.isArray(r.nativeLocales)) {
    // The prerenderer consolidates such a route per locale; useSeo does not implement that rule yet.
    throw new Error(`[page-meta] ${r.path}: nativeLocales is not mirrored in src/lib/seo.ts — add it there before using it`);
  }
  if (r.canonicalLocale) canonical[r.path] = r.canonicalLocale;
  if (!r.path.startsWith('/post/')) continue;
  // Same cascade as the prerenderer for a post route (its copy block yields neither field): title =
  // fallbackTitleByLang[lang], else the English fallbackTitle; description = fallbackDescriptionByLang[lang],
  // else the English fallbackDescription. Empty strings count as missing there too.
  const pick = (en, byLang) => {
    const o = {};
    if (en) o.en = en;
    for (const [l, v] of Object.entries(byLang || {})) if (v && LANGS.includes(l)) o[l] = v;
    return o;
  };
  posts[r.path.slice('/post/'.length)] = {
    title: pick(r.fallbackTitle, r.fallbackTitleByLang),
    description: pick(r.fallbackDescription, r.fallbackDescriptionByLang),
  };
}
const literal = (o, indent) => JSON.stringify(o, null, 2).replace(/\n/g, `\n${indent}`);
emit(OUT_CANONICAL, `// GENEROITU — älä muokkaa käsin. Lähde: scripts/routes.json (canonicalLocale), scripts/gen-page-meta.mjs (prebuild).
// Reitti, jonka jokainen kieliversio kanonisoituu yhteen kieleen: esirenderöinti kirjoittaa sen canonicalin ja
// hreflangin näin, generate-feeds jättää muut kieliversiot sivukartasta, ja useSeo tekee selaimessa saman.
import type { Lang } from '../i18n/useLang';

export const CANONICAL_LOCALE: Record<string, Lang> = ${literal(canonical, '')};
`);
emit(OUT_POSTS, `// GENEROITU — älä muokkaa käsin. Lähde: scripts/routes.json (/post/-reitit), scripts/gen-page-meta.mjs (prebuild).
// Jutun <title> ja kuvaus kielittäin samasta kentästä kuin esirenderöidyssä HTML:ssä: fi/sv tulevat kannasta
// (sync-post-meta-langs.mjs), englanti ja muiden kielten listaotsikot on kirjoitettu routes.jsoniin.
// Puuttuva kieli = englanti, sama sääntö kuin esirenderöinnissä. Jutun h1 tulee yhä kannasta.
import type { Lang } from '../i18n/useLang';

export interface PostMeta {
  title: Partial<Record<Lang, string>>;
  description: Partial<Record<Lang, string>>;
}

export const POST_META: Record<string, PostMeta> = ${literal(posts, '')};
`);

if (CHECK) {
  if (stale.length) {
    console.error(`[page-meta] ✗ stale: ${stale.join(', ')} — run: node scripts/gen-page-meta.mjs`);
    process.exit(1);
  }
  console.log('[page-meta] ✓ prerender-meta.json, canonicalLocale.gen.ts and postMeta.gen.ts are current');
} else {
  console.log(`[page-meta] ${DESTINATIONS.length} destinations × ${LANGS.length} languages (${cut} without the network sentence: it did not fit) · ${Object.keys(canonical).length} canonicalLocale routes · ${Object.keys(posts).length} posts`);
}
