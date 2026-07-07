import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SOURCE = 'laplandblog-website';

/**
 * Newsletter signup — wires into the shared LaplandVibes Supabase edge function.
 * Every ecosystem site posts to the same endpoint with its own `source` tag.
 * See reference_laplandvibes_newsletter.md for the contract.
 */
export default function Newsletter() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].newsletter;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'already' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, source: SOURCE }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.alreadySubscribed) {
        setStatus('already');
      } else {
        setStatus('success');
        trackNewsletterSignup(SOURCE);
      }
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to subscribe. Please try again.'
      );
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-24 px-4 overflow-hidden border-y border-pink/15"
      aria-labelledby="newsletter-heading"
    >
      {/* Dark base + ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
      <div className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full bg-pink/10 blur-[160px] pointer-events-none animate-hero-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-aurora-blue/8 blur-[140px] pointer-events-none animate-soft-float" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
          <Sparkles size={12} className="text-pink" />
          <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
            {c.eyebrow}
          </p>
        </div>

        <h2
          id="newsletter-heading"
          className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5"
        >
          {c.h2}
        </h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {c.lead}
        </p>

        {status === 'success' ? (
          <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-pink/40">
            <CheckCircle className="w-12 h-12 text-aurora-green mx-auto mb-3" />
            <p className="text-snow text-xl font-semibold font-display">
              {c.successTitle}
            </p>
            <p className="text-slate-300 mt-2 text-sm">
              {c.successBody}
            </p>
          </div>
        ) : status === 'already' ? (
          <div className="bg-night-light/70 backdrop-blur-sm rounded-2xl p-8 border border-aurora-blue/40">
            <CheckCircle className="w-12 h-12 text-aurora-blue mx-auto mb-3" />
            <p className="text-snow text-xl font-semibold font-display">
              {c.alreadyTitle}
            </p>
            <p className="text-slate-300 mt-2 text-sm">
              {c.alreadyBody}
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {c.placeholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                required
                autoComplete="email"
                disabled={status === 'loading'}
                className="flex-1 px-5 py-4 rounded-full bg-night-light/60 backdrop-blur-sm text-snow placeholder:text-slate-500 border border-purple/30 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-4 rounded-full bg-pink text-white font-semibold hover:bg-pink-dark transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(236,72,153,0.35)]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {c.subscribing}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {c.subscribe}
                  </>
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

            <p className="text-slate-500 text-xs mt-6">
              {c.agreeText}{' '}
              <a href={to('/privacy')} className="text-slate-300 hover:text-pink underline">
                {c.privacyLink}
              </a>
              . {c.unsubscribeNote}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
