// SignIn — entry point to start your own Lapland trip blog. This is the
// front door of the platform: a traveler arrives, types an email, gets a
// magic link, and after one click is the author of their own
// lapland.blog/their-name page. OAuth providers (Google/Facebook) are
// scaffolded but currently hidden behind a feature flag because they have
// not yet been enabled in the Supabase Auth dashboard. Re-enable by
// flipping ENABLE_OAUTH = true once Vesa configures the Google + Facebook
// providers in Supabase Project Settings → Authentication → Providers.

import { useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import {
  Mail,
  Check,
  ArrowLeft,
  MapPin,
  BookOpen,
  Share2,
  ArrowRight,
  CalendarDays,
  Sparkles,
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { useSeo, canonicalUrl } from '../lib/seo';
import { getImage } from '../lib/images';

// Ambient backdrop — the dusk-lake hero. Fixed position, very low opacity.
const backdrop = getImage('hero-dusk-lake', '100vw');

// FEATURE FLAGS: each provider flips independently once it's wired up in
// Supabase Auth → Providers. Google is live. Facebook is still pending
// Meta's App Review gauntlet (1024x1024 icon, user data deletion, app
// review for `email` scope, business verification) — shipping Google-only
// until Vesa finishes the Meta side. See supabase/OAUTH-SETUP.md.
const ENABLE_GOOGLE_OAUTH = true;
const ENABLE_FACEBOOK_OAUTH = false;
const ENABLE_OAUTH = ENABLE_GOOGLE_OAUTH || ENABLE_FACEBOOK_OAUTH;

interface LocationState {
  from?: string;
}

export default function SignIn() {
  const {
    user,
    loading: authLoading,
    sendMagicLink,
    signInWithGoogle,
    signInWithFacebook,
  } = useAuth();
  const location = useLocation();
  // When an unauthenticated visitor hits a protected page, AuthGuard passes
  // the original path through location state so we bounce them back after
  // the magic link. Otherwise the default landing zone is the user's own
  // trip blog dashboard (/me) — that's where every signup intends to go.
  const from = (location.state as LocationState | null)?.from ?? '/me';

  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthBusy, setOauthBusy] = useState<'google' | 'facebook' | null>(null);

  // Travel date collection — P0 lead capture
  const [travelMonth, setTravelMonth] = useState<number | null>(null);
  const [travelYear, setTravelYear] = useState<number | null>(2026);
  const [noDates, setNoDates] = useState(false);

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  /** Fire-and-forget lead save — never blocks auth flow. */
  function saveLead(emailAddr: string) {
    const trimmed = emailAddr.trim().toLowerCase();
    if (!trimmed) return;
    void supabase.from('blog_leads').upsert(
      {
        email: trimmed,
        travel_month: noDates ? null : travelMonth,
        travel_year: noDates ? null : travelYear,
        source_site: 'lapland.blog',
      },
      { onConflict: 'email' }
    );
  }

  useSeo({
    title: 'Plan your Lapland trip — Lapland.blog',
    description:
      'Get a free trip page, personalised tips, and the best deals for your Lapland journey. Tell us when you\'re visiting and we\'ll help plan every step.',
    canonical: canonicalUrl('/signin'),
  });

  // Already signed in — bounce back where they came from.
  if (!authLoading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError('Enter your email to get started.');
      return;
    }

    // Save lead data FIRST (fire-and-forget — even if auth fails we keep the data)
    saveLead(trimmed);

    setSending(true);
    const { error: err } = await sendMagicLink(trimmed, {
      redirectTo: `${window.location.origin}${from}`,
    });
    setSending(false);

    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
  }

  async function handleOAuth(provider: 'google' | 'facebook') {
    setError(null);
    // Save lead data if email is filled in
    if (email.trim()) saveLead(email);
    setOauthBusy(provider);
    const fn = provider === 'google' ? signInWithGoogle : signInWithFacebook;
    const { error: err } = await fn({
      redirectTo: `${window.location.origin}${from}`,
    });
    if (err) {
      setError(err);
      setOauthBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-night text-snow flex flex-col relative">
      {/* Ambient backdrop image — muted so it doesn't fight the form. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={backdrop.src}
          srcSet={backdrop.srcSet}
          sizes={backdrop.sizes}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/85 to-night" />
      </div>

      <Nav />

      <main className="relative flex-1 px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          {/* ─── LEFT: pitch ────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            <Link
              to={from}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              Your free trip page
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-snow font-light tracking-tight leading-[1.05] mb-6">
              Plan your
              <br />
              <span className="text-pink italic">Lapland trip.</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Get your own page at{' '}
              <span className="text-aurora-blue font-semibold">
                lapland.blog/yourname
              </span>{' '}
              — write your trip story, share photos, and get personalised tips
              and deals for your journey. Tell us when you're coming and we'll
              help you plan every step.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-aurora-green/15 border border-aurora-green/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-aurora-green" />
                </div>
                <div>
                  <p className="text-snow font-semibold text-sm mb-0.5">
                    Pin your route on the Lapland map
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Cabin, restaurant, aurora spot — drop pins before you fly.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-pink/15 border border-pink/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen size={15} className="text-pink" />
                </div>
                <div>
                  <p className="text-snow font-semibold text-sm mb-0.5">
                    Write entries from your phone
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    From the cabin, the car, the sauna. Photos, weather, stories.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-aurora-blue/15 border border-aurora-blue/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Share2 size={15} className="text-aurora-blue" />
                </div>
                <div>
                  <p className="text-snow font-semibold text-sm mb-0.5">
                    Share to Instagram in one tap
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Each entry exports as a vertical story your friends actually
                    open.
                  </p>
                </div>
              </li>
            </ul>

            <p className="text-[10px] tracking-[0.3em] uppercase text-slate-300">
              Free travel journals · No credit card · Made in Finland
            </p>
          </div>

          {/* ─── RIGHT: form ───────────────────────────────────────── */}
          <div className="order-1 lg:order-2 w-full">
            {sent ? (
              <div className="rounded-2xl border border-aurora-green/40 bg-night-light/50 backdrop-blur-sm p-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-aurora-green/20 mb-5">
                  <Check size={26} className="text-aurora-green" />
                </div>
                <h2 className="text-snow text-2xl font-display mb-3">
                  Check your inbox
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I sent a magic link to{' '}
                  <span className="text-snow font-semibold">{email}</span>.
                  Click it and your trip blog is live. The link expires in one
                  hour.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setEmail('');
                  }}
                  className="mt-6 text-xs text-slate-400 hover:text-pink transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-purple/30 bg-night-light/50 backdrop-blur-sm p-8 sm:p-10 space-y-6 shadow-[0_30px_80px_-40px_rgba(236,72,153,0.4)]"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-pink text-[10px] tracking-[0.3em] uppercase font-bold mb-2">
                    <Sparkles size={12} />
                    Reserve your page
                  </div>
                  <h2
                    className="font-display text-2xl md:text-3xl text-snow font-light leading-tight mb-2"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    Plan your Lapland trip
                  </h2>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    We'll create your trip page and send personalised tips based on when you're visiting.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="reader-email"
                    className="block text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2"
                  >
                    Your email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="reader-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-full bg-night/80 text-snow placeholder:text-slate-400 border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Travel dates */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-300 font-semibold mb-3">
                    <CalendarDays size={13} className="text-aurora-blue" />
                    When are you visiting Lapland?
                  </label>
                  <div className={`grid grid-cols-2 gap-3 ${noDates ? 'opacity-40 pointer-events-none' : ''}`}>
                    <select
                      value={travelMonth ?? ''}
                      onChange={(e) => setTravelMonth(e.target.value ? Number(e.target.value) : null)}
                      className="w-full px-4 py-3 rounded-xl bg-night/80 text-snow border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 text-sm appearance-none"
                    >
                      <option value="">Month…</option>
                      {MONTHS.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={travelYear ?? ''}
                      onChange={(e) => setTravelYear(e.target.value ? Number(e.target.value) : null)}
                      className="w-full px-4 py-3 rounded-xl bg-night/80 text-snow border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 text-sm appearance-none"
                    >
                      <option value="">Year…</option>
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2.5 mt-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={noDates}
                      onChange={(e) => setNoDates(e.target.checked)}
                      className="w-4 h-4 rounded border-purple/40 bg-night/80 text-pink focus:ring-pink/50 accent-pink"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-snow transition-colors">
                      I'm still dreaming — no dates yet
                    </span>
                  </label>
                </div>

                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all cursor-pointer text-base shadow-[0_8px_30px_-5px_rgba(236,72,153,0.5)]"
                >
                  {sending ? (
                    'Sending magic link…'
                  ) : (
                    <>
                      Reserve my trip page
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {ENABLE_OAUTH && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 h-px bg-purple/25" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-slate-300">
                        Or continue with
                      </span>
                      <div className="flex-1 h-px bg-purple/25" />
                    </div>

                    <div
                      className={
                        ENABLE_GOOGLE_OAUTH && ENABLE_FACEBOOK_OAUTH
                          ? 'grid grid-cols-2 gap-3'
                          : 'grid grid-cols-1 gap-3'
                      }
                    >
                     {ENABLE_GOOGLE_OAUTH && (
                      <button
                        type="button"
                        onClick={() => handleOAuth('google')}
                        disabled={oauthBusy !== null}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-night font-semibold text-sm hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                        aria-label="Sign in with Google"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.84Z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
                          />
                        </svg>
                        {oauthBusy === 'google' ? 'Opening…' : 'Google'}
                      </button>
                     )}

                     {ENABLE_FACEBOOK_OAUTH && (
                      <button
                        type="button"
                        onClick={() => handleOAuth('facebook')}
                        disabled={oauthBusy !== null}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#1877F2] text-white font-semibold text-sm hover:bg-[#166FE5] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
                        aria-label="Sign in with Facebook"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12Z" />
                        </svg>
                        {oauthBusy === 'facebook' ? 'Opening…' : 'Facebook'}
                      </button>
                     )}
                    </div>
                  </>
                )}

                <p className="text-center text-[10px] text-slate-300 tracking-wider uppercase">
                  By continuing you agree to the{' '}
                  <Link
                    to="/privacy"
                    className="text-slate-400 hover:text-pink underline-offset-2 hover:underline"
                  >
                    Privacy
                  </Link>{' '}
                  policy. We never email you junk.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
