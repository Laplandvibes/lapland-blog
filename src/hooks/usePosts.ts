// Public hook: fetches published posts from Supabase, optionally filtered by
// category. Returns adapted `Post` objects so existing components don't change.

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import { rowToPost } from '../lib/postAdapter';
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
      if (limit) query = query.limit(limit);

      const { data, error: err } = await query;

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setPosts([]);
      } else {
        setPosts((data as BlogPostRow[]).map(rowToPost));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [category, limit]);

  return { posts, loading, error };
}
