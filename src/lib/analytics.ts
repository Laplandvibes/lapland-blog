// Google Analytics 4 — Lapland.blog
// Property: G-W5P9B85M2Y (Stream ID 14231630671)

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = 'G-W5P9B85M2Y';

// Full LaplandVibes ecosystem — used for cross-domain linker + network tracking.
export const NETWORK_DOMAINS = [
  'lapland.blog',
  'laplandvibes.com',
  'laplandnightlife.com',
  'laplandnature.com',
  'laplandstays.com',
  'laplandbars.com',
  'laplanddeals.com',
  'laplanddining.com',
  'laplandfood.com',
  'laplandgifts.com',
  'laplandtransport.com',
  'laplandactivities.online',
];

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

// ─── Page view ────────────────────────────────────────────────────────────────

export function trackPageView(path: string, title?: string) {
  gtag('config', GA_ID, {
    page_path: path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function trackNewsletterSignup(source = 'laplandblog-website') {
  gtag('event', 'newsletter_signup', {
    event_category: 'engagement',
    event_label: source,
  });
  gtag('event', 'generate_lead', {
    lead_source: 'newsletter',
    page_source: source,
  });
}

// ─── Blog-specific ────────────────────────────────────────────────────────────

export function trackPostRead(slug: string, title: string, category: string) {
  gtag('event', 'post_read', {
    event_category: 'content',
    event_label: slug,
    post_title: title,
    post_category: category,
  });
}

export function trackCategoryView(category: string) {
  gtag('event', 'category_view', {
    event_category: 'navigation',
    event_label: category,
  });
}

// ─── Network navigation (hub → spoke) ─────────────────────────────────────────

export function trackNetworkClick(destination: string, label: string) {
  gtag('event', 'network_click', {
    event_category: 'navigation',
    event_label: label,
    destination_domain: destination,
  });
}

// ─── Share ────────────────────────────────────────────────────────────────────

export type ShareNetwork =
  | 'twitter'
  | 'facebook'
  | 'linkedin'
  | 'whatsapp'
  | 'email'
  | 'copy';

export function trackShare(network: ShareNetwork, slug: string) {
  gtag('event', 'share', {
    event_category: 'engagement',
    event_label: slug,
    method: network,
    content_type: 'post',
    item_id: slug,
  });
}
