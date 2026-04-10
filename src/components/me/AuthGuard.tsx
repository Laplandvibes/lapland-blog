// AuthGuard: wraps any route that requires a signed-in user (but does NOT
// require admin privileges). Used for the /me dashboard + editor. Redirects
// unauthenticated visitors to /signin with the intended destination in
// `from` so they bounce back after the magic link.
//
// This is UX-level only — Supabase RLS enforces the real write boundary
// (authors can only touch rows where author_id = auth.uid()).

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center text-snow">
        <div className="text-center">
          <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-slate-400">Checking session…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}
