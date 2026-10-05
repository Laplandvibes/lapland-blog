// Utility pages that must answer 200 but stay out of search: the prerendered shell carries
// `<meta name="robots" content="index, follow…">`, so without this a crawler reading the raw HTML sees "index"
// even when the page component renders noindex after JS runs (Google then gets two contradictory robots tags).
// This flips the shell tag for the listed routes after prerendering. Same script as laplandwork-com's
// scripts/noindex-routes.mjs; the network rule (2026-10-05): /unsubscribe/ is "noindex, follow" and not in the
// sitemap on every site.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const NOINDEX_ROUTES = ["unsubscribe"];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === "index.html") out.push(p);
  }
  return out;
}

let patched = 0;
let candidates = 0;
for (const file of walk(DIST)) {
  const segments = file.split(/[\\/]/);
  if (!NOINDEX_ROUTES.some((r) => segments.includes(r))) continue;
  candidates++;
  const html = readFileSync(file, "utf8");
  // Tolerate extra directives in the shell's robots tag (max-image-preview:large, max-snippet:-1).
  const next = html.replace(
    /<meta name="robots" content="index,\s*follow[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, follow" />'
  );
  if (next !== html) {
    writeFileSync(file, next);
    patched++;
  }
}

// Every matched shell must have been flipped — counted from the walk, not assumed per locale.
console.log(`[noindex] patched ${patched} shell(s) for: ${NOINDEX_ROUTES.join(", ")}`);
if (patched !== candidates || candidates === 0) {
  console.error(`[noindex] expected ${candidates} (> 0), got ${patched}`);
  process.exit(1);
}
