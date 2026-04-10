// Auto-generated hashtags for every published blog post.
// Pure function — no side effects, easy to test.

import type { CategorySlug } from '../data/categories';
import type { PostBlock } from '../data/posts';

// ─── Always-on brand hashtags ──────────────────────────────────────────

const ALWAYS_ON: string[] = ['LaplandVibes', 'LaplandBlog'];

// ─── Category → hashtags mapping ───────────────────────────────────────

const CATEGORY_HASHTAGS: Record<string, string[]> = {
  stories: ['LaplandStories', 'TravelLapland'],
  aurora: ['NorthernLights', 'AuroraBorealis', 'AuroraHunting'],
  cabins: ['ArcticCabin', 'LaplandStays', 'CabinLife'],
  seasons: ['ArcticSeasons', 'LaplandWinter'],
  food: ['LaplandFood', 'NordicCuisine'],
  people: ['LaplandPeople', 'ArcticLife'],
  gear: ['ArcticGear', 'LaplandTravel'],
};

// ─── Location scanning (Finnish name → hashtag-safe form) ──────────────

const LOCATION_MAP: [RegExp, string][] = [
  [/Rovaniemi/i, 'Rovaniemi'],
  [/Levi/i, 'Levi'],
  [/Saariselk[äa]/i, 'Saariselka'],
  [/Inari/i, 'Inari'],
  [/Pyh[äa]/i, 'Pyha'],
  [/Yll[äa]s/i, 'Yllas'],
  [/Sodankyl[äa]/i, 'Sodankyla'],
  [/Kilpisj[äa]rvi/i, 'Kilpisjarvi'],
  [/Muonio/i, 'Muonio'],
  [/Enonteki[öo]/i, 'Enontekio'],
  [/Kemi/i, 'Kemi'],
  [/Luosto/i, 'Luosto'],
];

// ─── Helpers ───────────────────────────────────────────────────────────

/** Extract a single flat string from block-based content. */
function blocksToText(blocks: PostBlock[]): string {
  return blocks
    .map((b) => {
      if ('text' in b) return b.text;
      if ('items' in b) return b.items.join(' ');
      return '';
    })
    .join(' ');
}

/** Scan content for Lapland city names and return matching hashtags. */
function locationHashtags(text: string): string[] {
  const found: string[] = [];
  for (const [pattern, tag] of LOCATION_MAP) {
    if (pattern.test(text)) {
      found.push(tag);
    }
  }
  return found;
}

// ─── Public API ────────────────────────────────────────────────────────

/**
 * Generate all hashtags for a published blog post.
 *
 * @param categorySlug - The post's category slug
 * @param content      - The post's block-based content (used for location scanning)
 * @returns Deduplicated array of hashtag strings (without the `#` prefix)
 */
export function generateHashtags(
  categorySlug: CategorySlug | string,
  content: PostBlock[],
): string[] {
  const text = blocksToText(content);

  const all = [
    ...ALWAYS_ON,
    ...(CATEGORY_HASHTAGS[categorySlug] ?? []),
    ...locationHashtags(text),
  ];

  // Deduplicate (case-insensitive) while preserving first-seen casing
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const tag of all) {
    const lower = tag.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      unique.push(tag);
    }
  }

  return unique;
}

/**
 * Format hashtags as a single string with `#` prefixes, space-separated.
 * Useful for share text and meta keywords.
 */
export function formatHashtags(tags: string[]): string {
  return tags.map((t) => `#${t}`).join(' ');
}
