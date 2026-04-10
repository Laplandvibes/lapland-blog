import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'laplandblog_cookie_consent';

/**
 * GDPR-compliant cookie consent banner.
 * - Default-denied GA4 consent state is set in index.html before any scripts.
 * - Accept sets localStorage and calls gtag('consent','update') to unlock analytics.
 * - Decline sets localStorage and leaves GA denied.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] bg-night/95 backdrop-blur-md border-t border-pink/30 px-4 py-4"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-300 text-sm text-center sm:text-left">
          We use cookies to understand how visitors use this blog (Google Analytics).
          No personal data is collected without your consent.{' '}
          <Link to="/privacy" className="text-pink hover:text-pink/80 underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-slate-400 hover:text-snow text-sm cursor-pointer transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-pink hover:bg-pink-dark text-white px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
