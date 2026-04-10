import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function Unsubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useSeo({
    title: 'Unsubscribe — Lapland.blog',
    description:
      'Unsubscribe from the Lapland.blog newsletter. One click, no hard feelings.',
    canonical: canonicalUrl('/unsubscribe'),
  });

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to unsubscribe');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-night text-snow flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night-light/70 backdrop-blur-sm border border-pink/40">
              <div className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                Newsletter
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight">
              Unsubscribe
            </h1>
          </div>

          {status === 'success' ? (
            <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-aurora-green/40 text-center">
              <CheckCircle className="w-12 h-12 text-aurora-green mx-auto mb-4" />
              <h2 className="text-xl text-snow font-semibold font-display mb-2">
                You've been unsubscribed.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We're sorry to see you go. You won't receive any more emails from
                Lapland.blog. If you change your mind, the signup is on every page.
              </p>
              <Link
                to="/"
                className="inline-block mt-6 text-pink hover:text-aurora-blue text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          ) : (
            <div className="bg-night-light/60 backdrop-blur-sm rounded-2xl p-8 border border-purple/25">
              <p className="text-slate-300 text-sm leading-relaxed mb-6 text-center">
                Enter the email you subscribed with. One click and you're out —
                no "are you sure?" loops, no survey.
              </p>
              <form onSubmit={handleUnsubscribe} className="space-y-4" noValidate>
                <label htmlFor="unsub-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="unsub-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  disabled={status === 'loading'}
                  className="w-full px-5 py-3.5 rounded-full bg-night/70 text-snow placeholder:text-slate-500 border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 disabled:opacity-50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-5 py-3.5 rounded-full bg-pink hover:bg-pink-dark text-white font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    'Unsubscribe'
                  )}
                </button>
              </form>

              {status === 'error' && (
                <div
                  className="mt-4 flex items-center justify-center gap-2 text-pink"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
