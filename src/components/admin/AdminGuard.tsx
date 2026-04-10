// AdminGuard: wraps admin-only routes. Shows a loading state while auth is
// being resolved, redirects to /admin/login if not signed in, and blocks
// access (with a clear message) if signed in as a non-admin email. This is
// UX-level only — Supabase RLS is the real enforcement boundary.

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  children: ReactNode;
}

export default function AdminGuard({ children }: Props) {
  const { loading, user, isAdmin, signOut } = useAuth();

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
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center text-snow px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl text-pink mb-4">Not authorised</h1>
          <p className="text-slate-300 mb-2">
            You are signed in as <span className="text-snow">{user.email}</span>, but
            this admin is reserved for <span className="text-snow">laplandvibe@gmail.com</span>.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            If that is you, sign out and request a new magic link to the correct inbox.
          </p>
          <button
            type="button"
            onClick={() => {
              void signOut();
            }}
            className="px-6 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
