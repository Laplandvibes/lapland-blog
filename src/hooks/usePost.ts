// Public hook: fetches a single published post by slug.

import { useEffect, useState } from 'react';
import { supabase, POST_LIST_COLUMNS } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import { rowToPost } from '../lib/postAdapter';
import { dedupeByLang, pickForLang } from '../lib/pickTranslation';
import { useLang } from '../i18n/useLang';
import type { Post } from '../data/posts';

interface UsePostResult {
  post: Post | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

/**
 * Odotukset uusintayritysten välillä (ms). MIKSI (14.11.2026): Google luki jutun
 * /post/wilderness-hut-firewood-ends-2026/ klo 10.08Z, kannan lokissa näkyy sen esikysely (OPTIONS 200)
 * mutta ei itse hakua, ja jutusta tuli "Noindex-tagin poissulkema": yksi epäonnistunut haku ohjasi
 * julkaistun jutun /404-sivulle, joka asettaa noindexin. Haku yritetään siksi uudelleen ennen kuin
 * mitään päätetään, ja virhe EI ole sama asia kuin "juttua ei ole" (Post.tsx).
 */
export const POST_RETRY_DELAYS_MS = [700, 2000, 5000];

interface UsePostOptions {
  /**
   * Juttu on esirenderöity (slug on POST_META:ssa) eli julkaistu buildin hetkellä. Tyhjä vastaus
   * yritetään silloin uudelleen kuten virhe: tyhjä tulos voi olla hetkellinen tai välimuistista.
   */
  expected?: boolean;
}

export function usePost(slug: string | undefined, opts: UsePostOptions = {}): UsePostResult {
  const expected = opts.expected ?? false;
  const lang = useLang();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!slug) {
      setPost(null);
      setLoading(false);
      setNotFound(true);
      return;
    }

    async function run() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      let match: BlogPostRow | undefined;
      let lastErr: string | null = null;

      for (let attempt = 0; attempt <= POST_RETRY_DELAYS_MS.length; attempt++) {
        if (attempt > 0) {
          await new Promise((r) => setTimeout(r, POST_RETRY_DELAYS_MS[attempt - 1]));
          if (cancelled) return;
        }
        try {
          // A slug is shared by every translation of an article, so this returns
          // one row per language — `maybeSingle()` here would error out.
          const { data, error: err } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug as string)
            .eq('status', 'published');
          if (cancelled) return;
          if (err) {
            lastErr = err.message || 'blog_posts query failed';
            continue;
          }
          lastErr = null;
          match = pickForLang((data ?? []) as BlogPostRow[], lang);
          if (match || !expected) break;
        } catch (e) {
          if (cancelled) return;
          lastErr = e instanceof Error ? e.message : String(e);
        }
      }

      if (match) {
        setPost(rowToPost(match));
      } else {
        setPost(null);
        if (lastErr) setError(lastErr);
        else setNotFound(true);
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, lang, expected]);

  return { post, loading, error, notFound };
}

// Helper: fetch posts related to a given slug (same category, different post).
interface UseRelatedResult {
  related: Post[];
  loading: boolean;
}

export function useRelated(
  slug: string | undefined,
  category: string | undefined,
  limit = 2
): UseRelatedResult {
  const lang = useLang();
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!slug || !category) {
      setRelated([]);
      setLoading(false);
      return;
    }

    async function run() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('blog_posts')
        .select(POST_LIST_COLUMNS)
        .eq('status', 'published')
        .eq('category_slug', category as string)
        .neq('slug', slug as string)
        .order('published_at', { ascending: false });
      // Limit is applied after collapsing translations, not in the query.

      if (cancelled) return;

      if (err || !data) {
        setRelated([]);
      } else {
        // Listasarakkeet ilman `content`-kenttää (POST_LIST_COLUMNS) — adapteri sietää sen.
        const unique = dedupeByLang(data as unknown as BlogPostRow[], lang);
        setRelated(unique.slice(0, limit).map(rowToPost));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, category, limit, lang]);

  return { related, loading };
}
