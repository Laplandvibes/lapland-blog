import Breadcrumbs from '../../../shared/Breadcrumbs';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

/**
 * Ecosystem breadcrumb ("murupolku"), rendered BELOW the hero (mounted once per
 * subpage, right after the hero `</section>`) so it reads as the first line of
 * page content instead of a bar wedged between the nav and the hero. Self-hides
 * on home + unmapped routes (shared/Breadcrumbs returns null there), so pages can
 * mount it unconditionally.
 *
 * Same labelMap + i18n hooks + accent treatment the old App-level BreadcrumbShell
 * used. The container now carries the site CONTENT background so the strip reads
 * as the first slab under the hero. Most pages are deep-night (bg-night → text-snow);
 * the editorial About page is cream, so it passes `editorial` for ink-on-cream.
 */
export default function PageBreadcrumb({ editorial = false }: { editorial?: boolean }) {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;
  const labelMap: Record<string, string> = {
    '/start-here': c.startHere,
    '/top-reads': c.topReads,
    '/destinations': c.destinations,
    '/stories': c.tripDiaries,
    '/about': c.about,
  };
  const className = editorial
    ? 'bg-[var(--color-cream)] text-[var(--color-ink)] border-b border-[var(--color-paper-border)]'
    : 'bg-night text-snow border-b border-white/10';
  const accentClassName = editorial
    ? 'hover:text-[var(--color-accent)] hover:opacity-100'
    : 'hover:text-vibe-pink hover:opacity-100';
  return (
    <Breadcrumbs
      lang={lang}
      to={to}
      labelMap={labelMap}
      className={className}
      accentClassName={accentClassName}
    />
  );
}
