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
 * Make sure the signed-in writer has a public `blog_profiles` row, without
 * ever overwriting it. Server-side (ensure_blog_profile, 2026-11-05) so that a
 * taken handle gets a free variant instead of failing, and a changed address
 * is not reset on the next page load (the old client upsert did both).
 * The default public name never comes from the email address.
 * Returns the handle, or null if the call failed.
 */
export async function ensureProfile(user: User): Promise<string | null> {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const display =
    (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? null;
  const handleSeed =
    (meta.preferred_username as string | undefined) ??
    (meta.user_name as string | undefined) ??
    (display ? display.normalize('NFKD').replace(/\p{M}+/gu, '').replace(/\s+/g, '-') : null);
  const { data, error } = await supabase.rpc('ensure_blog_profile', {
    p_handle: handleSeed,
    p_display: display,
  });
  if (error) return null;
  return (data as string | null) ?? null;
}

async function syncProfile(user: User) {
  await ensureProfile(user);
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
