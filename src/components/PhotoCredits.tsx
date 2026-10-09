import { PHOTO_CREDITS, creditSlot } from '../data/photoCredits';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

/**
 * One credit line per page for every real photograph shown on it (hero, cards, tiles).
 * The cards are links, so the credit cannot sit inside them (no link in a link): it is listed here, each title linking to
 * the file page and each licence to its deed (CC BY / BY-SA 3(a)); a Pexels photo links to its Pexels page. `srcs` are the
 * image URLs the page shows (post.heroImage strings and static `/images/...` paths); unknown or own-hosted URLs are skipped.
 * Receipts live in data/photoCredits.ts.
 */
export default function PhotoCredits({ srcs, className = '' }: { srcs: (string | undefined | null)[]; className?: string }) {
  const lang = useLang();
  const slots: string[] = [];
  for (const s of srcs) { const k = creditSlot(s); if (k && !slots.includes(k)) slots.push(k); }
  if (!slots.length) return null;
  const link = 'underline decoration-slate-500/60 underline-offset-2 hover:text-snow';
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm leading-relaxed text-slate-400 ${className}`} data-photo-credits>
      <span>{COPY[lang].images.photoCredit}: </span>
      {slots.map((k, i) => {
        const c = PHOTO_CREDITS[k];
        return (
          <span key={k}>
            {i > 0 && ' · '}
            {c.fileUrl ? <a href={c.fileUrl} target="_blank" rel="noopener" lang="en" translate="no" className={`lv-tap ${link}`}>{c.title}</a> : <span lang="en" translate="no">{c.title}</span>}
            {': '}
            <span translate="no">{c.author}</span>
            {c.license !== 'own' && (
              <>
                {', '}
                {c.license === 'Public domain'
                  ? (c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="license noopener" className={`lv-tap whitespace-nowrap ${link}`}>{COPY[lang].images.licensePD}</a> : COPY[lang].images.licensePD)
                  : (c.licenseUrl ? <a href={c.licenseUrl} target="_blank" rel="license noopener" lang="en" translate="no" className={`lv-tap whitespace-nowrap ${link}`}>{c.license}</a> : <span lang="en" translate="no">{c.license}</span>)}
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
