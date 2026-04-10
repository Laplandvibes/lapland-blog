import { useState, type ReactElement } from 'react';
import { Mail, Link2, Check } from 'lucide-react';
import { trackShare, type ShareNetwork } from '../lib/analytics';
import { canonicalUrl } from '../lib/seo';

interface ShareBarProps {
  slug: string;
  title: string;
  excerpt?: string;
  /** Space-separated hashtag string like "#LaplandVibes #NorthernLights" */
  hashtags?: string;
}

// Lucide-react no longer ships brand icons, so we inline minimal SVGs.
type IconProps = { size?: number };

function XIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.51 8.59L23 22h-6.94l-5.43-7.1L4.4 22H1.13l8.04-9.2L1 2h7.1l4.91 6.49L18.24 2Zm-1.21 18h1.92L7.06 4H5.05l11.98 16Z" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 17 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5-.17 0-.37-.02-.56-.02s-.5.07-.77.37c-.27.3-1.02 1-1.02 2.43 0 1.43 1.04 2.81 1.19 3.01.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.74-.71 1.98-1.4.24-.69.24-1.27.17-1.4-.07-.13-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 1 1 8.37 4.63ZM20.52 3.45a11.83 11.83 0 0 0-18.6 14.27L0 24l6.43-1.69a11.82 11.82 0 0 0 5.65 1.44h.01a11.83 11.83 0 0 0 8.43-20.3Z" />
    </svg>
  );
}

interface ShareTarget {
  network: ShareNetwork;
  label: string;
  Icon: (p: IconProps) => ReactElement;
  href: (url: string, title: string, excerpt: string, hashtags: string) => string;
}

const TARGETS: ShareTarget[] = [
  {
    network: 'twitter',
    label: 'Share on X',
    Icon: XIcon,
    href: (url, title, _excerpt, hashtags) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(`${title}\n\n${hashtags}`)}`,
  },
  {
    network: 'facebook',
    label: 'Share on Facebook',
    Icon: FacebookIcon,
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    network: 'linkedin',
    label: 'Share on LinkedIn',
    Icon: LinkedInIcon,
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  },
  {
    network: 'whatsapp',
    label: 'Share on WhatsApp',
    Icon: WhatsAppIcon,
    href: (url, title, _excerpt, hashtags) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${hashtags}\n${url}`)}`,
  },
  {
    network: 'email',
    label: 'Share via email',
    Icon: ({ size = 17 }: IconProps) => <Mail size={size} aria-hidden="true" />,
    href: (url, title, excerpt, hashtags) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        `${excerpt ? excerpt + '\n\n' : ''}${url}\n\n${hashtags}`
      )}`,
  },
];

export default function ShareBar({ slug, title, excerpt = '', hashtags = '' }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = canonicalUrl(`/post/${slug}`);

  const handleShare = (network: ShareNetwork) => {
    trackShare(network, slug);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare('copy', slug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — fall back to selecting a hidden input
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        trackShare('copy', slug);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // give up silently — the user can still copy from the address bar
      }
      document.body.removeChild(input);
    }
  };

  return (
    <aside
      className="max-w-[65ch] mx-auto mt-14 pt-8 border-t border-[var(--color-paper-border)]"
      aria-label="Share this story"
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] mb-4 font-semibold">
        Share this story
      </p>
      <div className="flex flex-wrap gap-2">
        {TARGETS.map(({ network, label, Icon, href }) => {
          const isMail = network === 'email';
          return (
            <a
              key={network}
              href={href(url, title, excerpt, hashtags)}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noopener noreferrer'}
              onClick={() => handleShare(network)}
              aria-label={label}
              className="group inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] transition-colors cursor-pointer"
            >
              <Icon size={17} />
            </a>
          );
        })}

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
          className="group inline-flex items-center gap-2 px-4 h-11 rounded-full border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] transition-colors cursor-pointer text-xs font-semibold uppercase tracking-[0.15em]"
        >
          {copied ? (
            <>
              <Check size={15} aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Link2 size={15} aria-hidden="true" />
              Copy link
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
