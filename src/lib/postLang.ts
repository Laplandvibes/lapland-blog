import type { Post } from '../data/posts';
import type { Lang } from '../i18n/useLang';

/**
 * `lang` for a post's own text on a card: title, kicker, excerpt and hero alt.
 *
 * Editorial posts are published in English only (Vesa 2026-07-11) while the
 * page around them follows the reader's language, so on a non-English page the
 * post text is marked `lang="en"`: a screen reader switches to an English voice,
 * and gate:kielipuhtaus-dom reads it as intentional English instead of a missing
 * translation. The card's own chrome (category, date, read time) stays unmarked.
 * A reader's diary stores no language, so it gets no attribute rather than a
 * guess. `undefined` = no attribute (React leaves it out).
 */
export function postTextLang(post: Pick<Post, 'byReader'>, pageLang: Lang): 'en' | undefined {
  return pageLang !== 'en' && !post.byReader ? 'en' : undefined;
}
