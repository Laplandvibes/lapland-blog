// Admin-only hooks for reading, creating, updating and deleting posts.
// All writes go through Supabase — RLS enforces admin-only access on the
// database side. These hooks assume the caller is already authenticated as
// the admin (AdminGuard handles that).

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPostRow } from '../lib/supabase';
import type { PostBlock } from '../data/posts';

export interface AdminPostListItem {
  id: string;
  slug: string;
  title: string;
  category_slug: string;
  status: 'draft' | 'published';
  published_at: string | null;
  updated_at: string;
  featured: boolean;
  read_time_minutes: number;
}

// ─── Listing hook for dashboard ─────────────────────────────────────────────

interface UseAdminPostsResult {
  posts: AdminPostListItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAdminPosts(): UseAdminPostsResult {
  const [posts, setPosts] = useState<AdminPostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_posts')
      .select(
        'id, slug, title, category_slug, status, published_at, updated_at, featured, read_time_minutes'
      )
      .order('updated_at', { ascending: false });

    if (err) {
      setError(err.message);
      setPosts([]);
    } else {
      setPosts((data as AdminPostListItem[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { posts, loading, error, refresh: load };
}

// ─── Single post loader for the editor ──────────────────────────────────────

interface UseAdminPostResult {
  row: BlogPostRow | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAdminPost(id: string | undefined): UseAdminPostResult {
  const [row, setRow] = useState<BlogPostRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) {
      setRow(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (err) {
      setError(err.message);
      setRow(null);
    } else {
      setRow((data as BlogPostRow) ?? null);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { row, loading, error, refresh: load };
}

// ─── Write operations ───────────────────────────────────────────────────────

export interface PostInput {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  category_slug: string;
  tags: string[];
  hero_image: string;
  hero_alt: string;
  content: PostBlock[];
  status: 'draft' | 'published';
  featured: boolean;
  read_time_minutes: number;
  published_at: string | null;
}

export async function createPost(
  input: PostInput,
  authorId: string,
  authorEmail: string
): Promise<{ id: string | null; error: string | null }> {
  // Pull the author's public profile so the snapshot mirrors what the
  // reader sees on /yourname. Falls back to the email prefix if the profile
  // row hasn't been created yet (shouldn't happen — useAuth upserts on sign
  // in — but we guard anyway so a missing profile doesn't block publishing).
  const { data: profile } = await supabase
    .from('blog_profiles')
    .select('handle, display_name, avatar_url')
    .eq('id', authorId)
    .maybeSingle();

  const emailPrefix = (authorEmail ?? '').split('@')[0] ?? 'reader';
  const author_snapshot = {
    handle: (profile?.handle as string | undefined) ?? emailPrefix,
    display_name:
      (profile?.display_name as string | undefined) ?? emailPrefix,
    avatar_url: (profile?.avatar_url as string | null | undefined) ?? null,
  };

  const row = {
    ...input,
    author_id: authorId,
    author_snapshot,
    // Ensure published_at is set if publishing now and wasn't provided.
    published_at:
      input.status === 'published' && !input.published_at
        ? new Date().toISOString()
        : input.published_at,
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(row)
    .select('id')
    .single();

  if (error) return { id: null, error: error.message };
  return { id: (data as { id: string }).id, error: null };
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<{ error: string | null }> {
  const patch = {
    ...input,
    published_at:
      input.status === 'published' && !input.published_at
        ? new Date().toISOString()
        : input.published_at,
  };

  const { error } = await supabase.from('blog_posts').update(patch).eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}

export async function deletePost(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}
