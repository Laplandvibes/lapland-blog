// Editorial categories. Keep this list tight — category sprawl kills blogs.

export type CategorySlug =
  | 'aurora'
  | 'cabins'
  | 'food'
  | 'seasons'
  | 'people'
  | 'gear'
  | 'stories';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  tagline: string;
  accent: string; // tailwind token reference for UI cues
}

export const categories: Category[] = [
  {
    slug: 'aurora',
    name: 'Aurora',
    description:
      'Nights under the northern lights — the honest ones. Weather, Kp-index, waiting, cold, and the moments that actually land.',
    tagline: 'The sky, when it behaves.',
    accent: 'aurora-green',
  },
  {
    slug: 'cabins',
    name: 'Cabins',
    description:
      'Wooden cabins, glass igloos, saunas that work, saunas that don\'t. What it\'s actually like to sleep far from a city.',
    tagline: 'Four walls, one stove, zero wifi.',
    accent: 'pink',
  },
  {
    slug: 'food',
    name: 'Food',
    description:
      'Salmon soup, rye bread, reindeer done three ways, and the coffee you drink at 2am because the sun forgot to set.',
    tagline: 'What Lapland tastes like in winter.',
    accent: 'neon-yellow',
  },
  {
    slug: 'seasons',
    name: 'Seasons',
    description:
      'Polar night in December. Midnight sun in June. Ruska in September. Eight distinct seasons, not four — and none of them are a gimmick.',
    tagline: 'Eight, not four.',
    accent: 'aurora-blue',
  },
  {
    slug: 'people',
    name: 'People',
    description:
      'The reindeer herders, ski patrollers, sauna masters and strangers in hotel lobbies. Lapland is quiet — but never empty.',
    tagline: 'Who you meet up here.',
    accent: 'purple-light',
  },
  {
    slug: 'gear',
    name: 'Gear',
    description:
      'Boots, gloves, layers, batteries, camera choices. What actually works at -25°C — and what I\'ve thrown away.',
    tagline: 'What survives -25°C.',
    accent: 'aurora-blue',
  },
  {
    slug: 'stories',
    name: 'Stories',
    description:
      'Longer reads. Single trips, single nights, single strange afternoons. When a post wants more than 800 words.',
    tagline: 'The long way round.',
    accent: 'pink',
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
