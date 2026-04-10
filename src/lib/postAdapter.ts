// Converts Supabase `blog_posts` rows into the front-end `Post` shape so that
// existing components (PostCard, FeaturedPost, Post page) don't need to change.

import type { Post, PostBlock } from '../data/posts';
import type { CategorySlug } from '../data/categories';
import type { BlogPostRow } from './supabase';

const VALID_CATEGORIES: readonly CategorySlug[] = [
  'aurora',
  'cabins',
  'food',
  'seasons',
  'people',
  'gear',
  'stories',
];

function isCategorySlug(value: string): value is CategorySlug {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Defensive content parser. The DB stores `content` as JSONB but it comes back
 * as `unknown`. We coerce to an array of blocks and filter out anything that
 * isn't a recognised block type — so a bad value can never crash the reader.
 */
function parseContent(raw: unknown): PostBlock[] {
  if (!Array.isArray(raw)) return [];
  const blocks: PostBlock[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const b = item as Record<string, unknown>;
    const type = b.type;
    if (type === 'paragraph' && typeof b.text === 'string') {
      blocks.push({ type: 'paragraph', text: b.text });
    } else if (type === 'heading' && typeof b.text === 'string') {
      const level = b.level === 3 ? 3 : 2;
      blocks.push({ type: 'heading', level, text: b.text });
    } else if (type === 'pullquote' && typeof b.text === 'string') {
      blocks.push({ type: 'pullquote', text: b.text });
    } else if (type === 'divider') {
      blocks.push({ type: 'divider' });
    } else if (type === 'list' && Array.isArray(b.items)) {
      blocks.push({
        type: 'list',
        ordered: Boolean(b.ordered),
        items: b.items.filter((x): x is string => typeof x === 'string'),
      });
    } else if (type === 'markdown' && typeof b.text === 'string') {
      blocks.push({ type: 'markdown', text: b.text });
    }
  }
  return blocks;
}

export function rowToPost(row: BlogPostRow): Post {
  const category: CategorySlug = isCategorySlug(row.category_slug)
    ? row.category_slug
    : 'stories';

  return {
    slug: row.slug,
    title: row.title,
    kicker: row.kicker ?? '',
    excerpt: row.excerpt ?? '',
    category,
    tags: row.tags ?? [],
    publishedAt: row.published_at ?? row.created_at,
    readTimeMinutes: row.read_time_minutes ?? 5,
    heroImage: row.hero_image ?? '',
    heroAlt: row.hero_alt ?? row.title,
    author: 'vesa',
    featured: row.featured,
    content: parseContent(row.content),
  };
}
