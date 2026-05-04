// HighlightShare — Medium-style "share this quote" floating pill.
// On any text selection inside the post body, a small pill appears near the
// top of the selection offering "Share quote" (X intent) and "Copy quote".
//
// No schema. Pure JS. Mounts once on Post pages, listens to `selectionchange`,
// confines selections to the post body via the `containerSelector` prop.

import { useEffect, useState } from 'react';
import { Quote, Copy, Check } from 'lucide-react';
import { trackShare } from '../lib/analytics';

interface HighlightShareProps {
  /** Selector for the element whose selections trigger the pill. */
  containerSelector: string;
  /** Post URL — used in the share intent. */
  url: string;
  /** Post slug — used for analytics attribution. */
  slug: string;
}

interface PillState {
  visible: boolean;
  top: number;
  left: number;
  text: string;
}

const MIN_CHARS = 12; // ignore tiny accidental selections

export default function HighlightShare({ containerSelector, url, slug }: HighlightShareProps) {
  const [pill, setPill] = useState<PillState>({ visible: false, top: 0, left: 0, text: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function compute() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPill((p) => (p.visible ? { ...p, visible: false } : p));
        return;
      }
      const text = sel.toString().trim();
      if (text.length < MIN_CHARS) {
        setPill((p) => (p.visible ? { ...p, visible: false } : p));
        return;
      }
      const range = sel.getRangeAt(0);
      const container = document.querySelector(containerSelector);
      if (!container) return;
      // Confine selections to the article body
      if (!container.contains(range.commonAncestorContainer)) {
        setPill((p) => (p.visible ? { ...p, visible: false } : p));
        return;
      }
      const rect = range.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      setPill({
        visible: true,
        top: rect.top + window.scrollY - 56,
        left: rect.left + rect.width / 2 + window.scrollX,
        text,
      });
    }

    document.addEventListener('selectionchange', compute);
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      document.removeEventListener('selectionchange', compute);
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [containerSelector]);

  if (!pill.visible) return null;

  const trimmed = pill.text.length > 240 ? pill.text.slice(0, 237) + '…' : pill.text;
  const tweetText = `"${trimmed}" — via lapland.blog`;
  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${pill.text}" — ${url}`);
      setCopied(true);
      trackShare('copy', slug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      role="toolbar"
      aria-label="Share selected text"
      className="fixed z-[60] -translate-x-1/2 flex items-center gap-1 rounded-full bg-[#1A1815] text-white shadow-xl px-1 py-1 text-xs animate-in fade-in zoom-in"
      style={{ top: `${pill.top}px`, left: `${pill.left}px` }}
    >
      <a
        href={tweetHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackShare('twitter', slug)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors font-semibold uppercase tracking-wider"
      >
        <Quote size={12} /> Share quote
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors font-semibold uppercase tracking-wider"
        aria-label="Copy quote with link"
      >
        {copied ? (
          <>
            <Check size={12} /> Copied
          </>
        ) : (
          <>
            <Copy size={12} /> Copy
          </>
        )}
      </button>
    </div>
  );
}
