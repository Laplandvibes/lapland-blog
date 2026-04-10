// Auth hook: exposes the current Supabase session, user, loading state and
// whether the user is the whitelisted admin. Supports magic link + Google +
// Facebook OAuth. On first sign-in, mirrors the user into `blog_profiles`
// (handle, display_name, avatar_url) so we have a public-facing profile row.

import { useEffect, useState, useCallback, useRef } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isAdminEmail } from '../lib/supabase';

interface MagicLinkOptions {
  redirectTo?: string;
}

interface OAuthOptions {
  redirectTo?: string;
}

interface UseAuthResult {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  sendMagicLink: (
    email: string,
    options?: MagicLinkOptions
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: (
    options?: OAuthOptions
  ) => Promise<{ error: string | null }>;
  signInWithFacebook: (
    options?: OAuthOptions
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

/**
 * Mirror an authenticated user into the public `blog_profiles` table.
 * Idempotent: uses upsert so it's safe to call on every auth event.
 * Pulls handle / display_name / avatar from OAuth metadata when available.
 */
async function syncProfile(user: User) {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const emailPrefix = (user.email ?? '').split('@')[0] ?? 'reader';
  const handle =
    (meta.preferred_username as string | undefined) ??
    (meta.user_name as string | undefined) ??
    emailPrefix.replace(/[^a-z0-9_-]/gi, '').toLowerCase() ??
    'reader';

  const displayName =
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    emailPrefix;

  const avatarUrl =
    (meta.avatar_url as string | undefined) ??
    (meta.picture as string | undefined) ??
    null;

  const role = isAdminEmail(user.email) ? 'admin' : 'author';

  // upsert — RLS allows the user to insert/update their own row
  const { error } = await supabase
    .from('blog_profiles')
    .upsert(
      {
        id: user.id,
        handle,
        display_name: displayName,
        avatar_url: avatarUrl,
        role,
      },
      { onConflict: 'id' }
    );

  if (error && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('[useAuth] profile sync failed:', error.message);
  }
}

export function useAuth(): UseAuthResult {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const syncedFor = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session ?? null);
      setLoading(false);
      if (data.session?.user && syncedFor.current !== data.session.user.id) {
        syncedFor.current = data.session.user.id;
        void syncProfile(data.session.user);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
      setLoading(false);
      if (next?.user && syncedFor.current !== next.user.id) {
        syncedFor.current = next.user.id;
        void syncProfile(next.user);
      }
      if (!next) {
        syncedFor.current = null;
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const sendMagicLink = useCallback(
    async (email: string, options?: MagicLinkOptions) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            options?.redirectTo ?? `${window.location.origin}/admin`,
        },
      });
      return { error: error?.message ?? null };
    },
    []
  );

  const signInWithGoogle = useCallback(async (options?: OAuthOptions) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: options?.redirectTo ?? `${window.location.origin}/`,
      },
    });
    return { error: error?.message ?? null };
  }, []);

  const signInWithFacebook = useCallback(async (options?: OAuthOptions) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: options?.redirectTo ?? `${window.location.origin}/`,
      },
    });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const user = session?.user ?? null;
  const isAdmin = isAdminEmail(user?.email);

  return {
    session,
    user,
    loading,
    isAdmin,
    sendMagicLink,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  };
}
