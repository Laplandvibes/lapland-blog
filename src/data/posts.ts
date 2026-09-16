// Real editorial content for lapland.blog launch.
// Editorial voice: The Field Journal (de-personalised 2026-05-04).
// Block-based content model. The Post page renders each block type.

import type { CategorySlug } from './categories';
import type { PostTheme } from './postThemes';

export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'divider' }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'markdown'; text: string }
  // In-article image. `src` is a /public path (the registry slots in
  // src/lib/images.ts). `full` renders edge-to-edge (full-bleed) between
  // sections; otherwise it sits within the text measure. `caption` is shown
  // below in the editorial caption style.
  | { type: 'image'; src: string; alt: string; caption?: string; full?: boolean };

export interface Post {
  slug: string;
  title: string;
  kicker: string;               // small line above the title
  excerpt: string;              // card + meta description
  category: CategorySlug;
  tags: string[];
  publishedAt: string;          // ISO date
  readTimeMinutes: number;
  heroImage: string;            // absolute URL
  heroAlt: string;
  /** Author registry key (src/data/author.ts) — 'vesa'/'fieldjournal' or a pen handle. */
  author: string;
  /**
   * Onko tämä LUKIJAN oma matkapäiväkirja vai toimituksen juttu.
   *
   * 🔴 `author` ei kerro tätä: adapteri pudottaa tuntemattoman handlen
   * 'fieldjournal'-ääneen ("umbrella voice"), joten lukijan juttu näyttää
   * siltä kuin toimitus olisi sen kirjoittanut. Lukijan pitää voida erottaa
   * nämä kaksi, joten ero luetaan kannasta erikseen (author_id).
   */
  byReader?: boolean;
  /**
   * Editorial — marks the post that leads the front page (see featuredPost()).
   * Nothing is paid for it: adSlots.ts carries `sponsors: [null, null]`.
   *
   * 🔴 The SAME field name means the OPPOSITE in the app: there
   * `Event.featured` is a SOLD placement. If a paid placement is ever
   * introduced here, give it its own field and mark it as advertising — do not
   * reuse this one. The badge copy (`featuredBadge`) says "editor's pick" in
   * all twelve languages and would then be labelling an ad as a staff pick.
   */
  featured?: boolean;
  /** Kirjoittajan valitsema lukuarkin teema (src/data/postThemes.ts). */
  theme?: PostTheme;
  content: PostBlock[];
}



// 🔴 Viisi keksittya seed-artikkelia poistettu 2026-09-15. Ne eivat
// renderoityneet mihinkaan (sivut hakevat Supabasesta), mutta niissa eli
// yha faktantarkistuksen kaatama sisalto: Arctic Restaurant Roka, 42 euron
// lohikeitto, Mansikkanokan tie, D-vitamiini 2000 IU. Kuollut fiktio palaa
// kayttoon sen mukana joka importtaa taulukon. Tyypit jaavat, koska koko
// sovellus tyypittaa Supabase-rivit `Post`-muotoon.
export const posts: Post[] = [];

export const postBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

export const postsByCategory = (category: CategorySlug): Post[] =>
  posts.filter((p) => p.category === category);

export const latestPosts = (limit = 6): Post[] =>
  [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

export const featuredPost = (): Post =>
  posts.find((p) => p.featured) ?? posts[0];

export const relatedPosts = (slug: string, limit = 2): Post[] => {
  const current = postBySlug(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
};

export const categoryCount = (category: CategorySlug): number =>
  postsByCategory(category).length;
