// Public hook: fetches published posts from Supabase, optionally filtered by
// category. Returns adapted `Post` objects so existing components don't change.

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import { rowToPost } from '../lib/postAdapter';
import { dedupeByLang } from '../lib/pickTranslation';
import { useLang } from '../i18n/useLang';
import type { Post } from '../data/posts';
import type { CategorySlug } from '../data/categories';

interface UsePostsOptions {
  category?: CategorySlug;
  limit?: number;
}

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export function usePosts(options: UsePostsOptions = {}): UsePostsResult {
  const { category, limit } = options;
  const lang = useLang();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (category) query = query.eq('category_slug', category);
      // NOTE: no server-side limit. Every article exists once per language, so
      // the rows have to be collapsed to one per article first — limiting here
      // would cut the list before the duplicates are removed.

      const { data, error: err } = await query;

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setPosts([]);
      } else {
        const unique = dedupeByLang(data as BlogPostRow[], lang);
        setPosts((limit ? unique.slice(0, limit) : unique).map(rowToPost));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [category, limit, lang]);

  return { posts, loading, error };
}
