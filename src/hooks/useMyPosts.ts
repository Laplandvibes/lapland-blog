// User-scoped post hooks for the /me dashboard. These mirror useAdminPosts
// but filter every read and write to the currently signed-in user. The
// heavy lifting (insert/update/delete) reuses createPost/updatePost/deletePost
// from useAdminPosts so we don't duplicate the author_snapshot logic — RLS on
// the server guarantees a signed-in non-admin can only touch their own rows.

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { AdminPostListItem } from './useAdminPosts';

interface UseMyPostsResult {
  posts: AdminPostListItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * List every post the signed-in user owns (drafts + published), newest
 * edit first. Returns an empty list if `userId` is falsy.
 */
export function useMyPosts(userId: string | undefined): UseMyPostsResult {
  const [posts, setPosts] = useState<AdminPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_posts')
      .select(
        'id, slug, title, category_slug, status, published_at, updated_at, featured, read_time_minutes'
      )
      .eq('author_id', userId)
      .order('updated_at', { ascending: false });

    if (err) {
      setError(err.message);
      setPosts([]);
    } else {
      setPosts((data as AdminPostListItem[]) ?? []);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { posts, loading, error, refresh: load };
}
