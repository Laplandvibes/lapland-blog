import type { Post } from '../data/posts';
import type { Lang } from '../i18n/useLang';

/**
 * `lang` for a post's own text (title, kicker, excerpt, hero alt, body) when it
 * is not in the language of the page around it.
 *
 * Every editorial post is stored in English, Finnish and Swedish, and a page
 * shows the row in the reader's language where one exists, otherwise the
 * English original (pickTranslation). A German page therefore shows English
 * posts and a Finnish page Finnish ones. Only text that differs from the page is
 * marked, with the language of the row actually shown: a screen reader switches
 * voice, and gate:kielipuhtaus-dom reads it as intentional instead of a missing
 * translation. The card's own chrome (category, date, read time) stays unmarked.
 * An editorial row without `lang` is the English original, as in
 * pickTranslation. A reader's diary stores no language, so it gets no attribute
 * rather than a guess. `undefined` = no attribute (React leaves it out).
 */
export function postTextLang(post: Pick<Post, 'byReader' | 'lang'>, pageLang: Lang): string | undefined {
  if (post.byReader) return undefined;
  const own = post.lang || 'en';
  return own.toLowerCase() === pageLang.toLowerCase() ? undefined : own;
}
