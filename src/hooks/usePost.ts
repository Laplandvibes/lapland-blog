// Public hook: fetches a single published post by slug.

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
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

export function usePost(slug: string | undefined): UsePostResult {
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

      // A slug is shared by every translation of an article, so this returns
      // one row per language — `maybeSingle()` here would error out.
      const { data, error: err } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug as string)
        .eq('status', 'published');

      if (cancelled) return;

      const rows = (data ?? []) as BlogPostRow[];
      const match = pickForLang(rows, lang);

      if (err) {
        setError(err.message);
        setPost(null);
      } else if (!match) {
        setPost(null);
        setNotFound(true);
      } else {
        setPost(rowToPost(match));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

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
        .select('*')
        .eq('status', 'published')
        .eq('category_slug', category as string)
        .neq('slug', slug as string)
        .order('published_at', { ascending: false });
      // Limit is applied after collapsing translations, not in the query.

      if (cancelled) return;

      if (err || !data) {
        setRelated([]);
      } else {
        const unique = dedupeByLang(data as BlogPostRow[], lang);
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
