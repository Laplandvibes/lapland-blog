// Magic-link login for the admin. The public site has no admin hint anywhere.
// This page is intentionally plain — no hero, no sparkles, just a form.

import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ADMIN_EMAIL } from '../../lib/supabase';

export default function Login() {
  const {
    user,
    loading: authLoading,
    sendMagicLink,
    signInWithGoogle,
    signInWithFacebook,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthBusy, setOauthBusy] = useState<'google' | 'facebook' | null>(null);

  // Already signed in — bounce to dashboard.
  if (!authLoading && user) {
    return <Navigate to="/admin" replace />;
  }

  async function handleOAuth(provider: 'google' | 'facebook') {
    setError(null);
    setOauthBusy(provider);
    const fn = provider === 'google' ? signInWithGoogle : signInWithFacebook;
    const { error: err } = await fn({
      redirectTo: `${window.location.origin}/admin`,
    });
    if (err) {
      setError(err);
      setOauthBusy(null);
    }
    // On success the browser is redirected to the OAuth provider, so no
    // further state updates are necessary.
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError('Enter an email.');
      return;
    }

    // Client-side whitelist is UX only — the server will also reject writes
    // from non-admin emails via RLS. We still block the request here to
    // avoid generating pointless magic-link emails to strangers.
    if (trimmed !== ADMIN_EMAIL) {
      setError('This area is reserved for site administrators.');
      return;
    }

    setSending(true);
    const { error: err } = await sendMagicLink(trimmed);
    setSending(false);

    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen bg-night text-snow flex items-center justify-center px-4">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
        >
          <ArrowLeft size={14} /> Back to site
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-night-light/70 border border-pink/40">
            <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
            <span className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
              Admin
            </span>
          </div>
          <h1 className="font-display text-4xl text-snow font-light tracking-tight mb-3">
            Sign in
          </h1>
          <p className="text-slate-400 text-sm">
            Magic link only. No passwords on this site.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-aurora-green/40 bg-night-light/40 p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-aurora-green/20 mb-5">
              <Check size={22} className="text-aurora-green" />
            </div>
            <h2 className="text-snow text-xl font-display mb-3">Check your inbox</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              I sent a magic link to{' '}
              <span className="text-snow font-semibold">{email}</span>. Click
              the link in that email to sign in. It expires in one hour.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
              className="mt-6 text-xs text-slate-400 hover:text-pink transition-colors uppercase tracking-wider"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-purple/25 bg-night-light/40 p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-night/80 text-snow placeholder:text-slate-500 border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {sending ? 'Sending link…' : 'Send magic link'}
            </button>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-purple/25" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Or sign in with
              </span>
              <div className="flex-1 h-px bg-purple/25" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={oauthBusy !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-night font-semibold text-sm hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Sign in with Google"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
                  <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.84Z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/>
                </svg>
                {oauthBusy === 'google' ? 'Opening…' : 'Google'}
              </button>

              <button
                type="button"
                onClick={() => handleOAuth('facebook')}
                disabled={oauthBusy !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#1877F2] text-white font-semibold text-sm hover:bg-[#166FE5] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Sign in with Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12Z"/>
                </svg>
                {oauthBusy === 'facebook' ? 'Opening…' : 'Facebook'}
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-500 tracking-wider uppercase">
              Only one admin exists — everyone else is read-only.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
