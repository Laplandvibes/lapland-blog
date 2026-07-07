import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll to top on every route change. Without this, React Router keeps
 * the previous page's scroll position — which looks broken when navigating
 * from a long article to a listing page.
 *
 * Hash links (e.g. <Link to="#plan-your-trip">) scroll to the target section
 * instead of the top.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let cancelled = false;
      const tick = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries++ < 40) {
          setTimeout(tick, 60);
        }
      };
      tick();
      return () => { cancelled = true; };
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
