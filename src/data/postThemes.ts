// Kirjoittajan valittavissa olevat lukuarkin teemat (Vesa 2026-09-15).
// Arvot tallentuvat blog_posts.theme-sarakkeeseen; tuntematon tai puuttuva arvo
// putoaa takaisin yöhön, joten vanhat jutut näyttävät samalta kuin ennen.
// Värit ja kontrastimittaukset: src/index.css "KIRJOITTAJAN TEEMAT".

export const POST_THEMES = ['yo', 'lumi', 'ruska', 'kaamos'] as const;
export type PostTheme = (typeof POST_THEMES)[number];

export const DEFAULT_THEME: PostTheme = 'yo';

export function isPostTheme(v: unknown): v is PostTheme {
  return typeof v === 'string' && (POST_THEMES as readonly string[]).includes(v);
}

export function normalizeTheme(v: unknown): PostTheme {
  return isPostTheme(v) ? v : DEFAULT_THEME;
}

/** Esikatselunäyte valitsimeen: arkin pohja, muste ja korostus. */
export const THEME_SWATCH: Record<PostTheme, { paper: string; ink: string; accent: string }> = {
  yo: { paper: '#F1F4F9', ink: '#1F2937', accent: '#BE185D' },
  lumi: { paper: '#FFFFFF', ink: '#111827', accent: '#0E7490' },
  ruska: { paper: '#FBF3EA', ink: '#2A1F17', accent: '#B45309' },
  kaamos: { paper: '#1B2340', ink: '#E7ECF5', accent: '#C4A6FF' },
};
