import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function Unsubscribe() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].unsubscribe;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
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
                {c.eyebrow}
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight">
              {c.h1}
            </h1>
          </div>

          {status === 'success' ? (
            <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-aurora-green/40 text-center">
              <CheckCircle className="w-12 h-12 text-aurora-green mx-auto mb-4" />
              <h2 className="text-xl text-snow font-semibold font-display mb-2">
                {c.successTitle}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {c.successBody}
              </p>
              <Link
                to={to('/')}
                className="inline-block mt-6 text-pink hover:text-aurora-blue text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {c.backHome}
              </Link>
            </div>
          ) : (
            <div className="bg-night-light/60 backdrop-blur-sm rounded-2xl p-8 border border-purple/25">
              <p className="text-slate-300 text-sm leading-relaxed mb-6 text-center">
                {c.lead}
              </p>
              <form onSubmit={handleUnsubscribe} className="space-y-4" noValidate>
                <label htmlFor="unsub-email" className="sr-only">
                  {c.emailPlaceholder}
                </label>
                <input
                  id="unsub-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.emailPlaceholder}
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
                      {c.processing}
                    </>
                  ) : (
                    c.submit
                  )}
                </button>
              </form>

              {status === 'error' && (
                <div className="mt-4 flex items-center justify-center gap-2 text-pink" role="alert">
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
