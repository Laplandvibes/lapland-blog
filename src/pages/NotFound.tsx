import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import SharedNotFound from '../../../shared/NotFound';

// Thin wrapper around the shared network 404 (Vesa 2026-07-12 migration).
// Title + robots noindex are set by SharedNotFound itself — a 404 should not
// carry canonical/hreflang, so useSeo is intentionally not used here.
export default function NotFound() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;

  return (
    <>
      <Nav />
      <SharedNotFound
        lang={lang}
        siteName="Lapland.blog"
        homeHref={to('/')}
        links={[
          { href: to('/top-reads'), label: c.topReads },
          { href: to('/destinations'), label: c.destinations },
          { href: to('/stories'), label: c.tripDiaries },
        ]}
        className="bg-night"
      />
      <Footer />
    </>
  );
}
