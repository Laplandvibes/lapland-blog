// /destinations/<slug> meta description: ONE composer for both sides. scripts/gen-page-meta.mjs writes
// its result into scripts/prerender-meta.json, which the prerenderer reads before any other source, and
// src/pages/Destination.tsx calls the same function in the browser, so the static HTML and the hydrated
// page cannot disagree (gate:meta-hydraatio in lv-ops). Plain .mjs because the build script runs on
// CI's Node 20, which cannot import a .ts module; the types are in destinationMeta.d.mts.
//
// The description is the place's own blurb followed by the page's network sentence (destination.metaSuffix).
// When the two together run past 160 characters or 200 width units, the prerenderer cut the suffix off
// (clampDescription) while the browser kept it: 28 of 96 pages showed two descriptions until 2026-10-05.
// The composer now leaves the suffix out itself, so the prerenderer has nothing left to change.

// The same measures as ensureDescriptionLength() in scripts/_prerender_routes.mjs: a CJK character
// counts as two.
const WIDE = /[\u1100-\u11FF\u2E80-\uA4CF\uA960-\uA97F\uAC00-\uD7FF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/;
const width = (s) => [...s].reduce((n, c) => n + (WIDE.test(c) ? 2 : 1), 0);

/** At most 160 characters and 200 width units: the prerenderer leaves such a description as it is. */
export function fitsDescription(s) {
  return s.length <= 160 && width(s) <= 200;
}

/**
 * "<blurb> <suffix>", or the blurb alone when the two do not fit. ja and zh-CN write sentences back to
 * back: no space after 。！？. Korean and the Latin-script languages put a space between sentences.
 * @param {string} blurb the place's own description in this language
 * @param {string} suffix destination.metaSuffix in the same language
 * @param {string} lang
 */
export function destinationDescription(blurb, suffix, lang) {
  const own = String(blurb || '').trim();
  const tail = String(suffix || '').trim();
  if (!tail) return own;
  if (!own) return tail;
  const joiner = /^(ja|zh)/.test(lang) && /[。！？]$/u.test(own) ? '' : ' ';
  const full = `${own}${joiner}${tail}`;
  return fitsDescription(full) ? full : own;
}
