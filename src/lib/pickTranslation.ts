// A post exists as one row per language, linked by `translation_of` (null on
// the original). Every query that reaches the public site has to collapse
// those rows down to one per article, otherwise the same story shows up once
// per language and `slug` stops behaving like a unique key.

import type { BlogPostRow } from './supabase';

const FALLBACK_LANG = 'en';

type Row = Pick<BlogPostRow, 'id' | 'lang' | 'translation_of'>;

/** All translations of one article share this key. */
export function translationGroup(row: Row): string {
  return row.translation_of ?? row.id;
}

/**
 * Pick the best row for `lang` out of the translations of a single article:
 * exact language, else English, else whatever exists.
 */
export function pickForLang<T extends Row>(rows: T[], lang: string): T | undefined {
  return (
    rows.find((r) => (r.lang ?? FALLBACK_LANG) === lang) ??
    rows.find((r) => (r.lang ?? FALLBACK_LANG) === FALLBACK_LANG) ??
    rows[0]
  );
}

/**
 * Collapse a mixed-language list to one row per article, preferring `lang`
 * and falling back to English. Input order is preserved.
 */
export function dedupeByLang<T extends Row>(rows: T[], lang: string): T[] {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const key = translationGroup(row);
    const bucket = groups.get(key);
    if (bucket) bucket.push(row);
    else groups.set(key, [row]);
  }

  const chosen = new Set<T>();
  for (const bucket of groups.values()) {
    const pick = pickForLang(bucket, lang);
    if (pick) chosen.add(pick);
  }

  return rows.filter((r) => chosen.has(r));
}
