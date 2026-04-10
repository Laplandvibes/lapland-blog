// Public hook: fetches a single published post by slug.

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import { rowToPost } from '../lib/postAdapter';
import type { Post } from '../data/posts';

interface UsePostResult {
  post: Post | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export function usePost(slug: string | undefined): UsePostResult {
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

      const { data, error: err } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug as string)
        .eq('status', 'published')
        .maybeSingle();

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setPost(null);
      } else if (!data) {
        setPost(null);
        setNotFound(true);
      } else {
        setPost(rowToPost(data as BlogPostRow));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

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
        .order('published_at', { ascending: false })
        .limit(limit);

      if (cancelled) return;

      if (err || !data) {
        setRelated([]);
      } else {
        setRelated((data as BlogPostRow[]).map(rowToPost));
      }
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, category, limit]);

  return { related, loading };
}
