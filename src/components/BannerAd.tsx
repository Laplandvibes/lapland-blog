// BannerAd — small monetisation card placed on reader surfaces (post sidebar,
// archive grid). Routes through go.laplandvibes.com so per-site CJ Website ID
// resolves correctly via Referer header. Affiliate disclosure stays
// footer-only (LV ecosystem rule); these cards are visually labeled "Ad".
//
// Accent matches whichever theme they sit on — pass `variant` to switch.

import { ArrowUpRight, BedDouble, Plane, MapPin } from 'lucide-react';

const GO = 'https://go.laplandvibes.com';

type Partner = 'hotels' | 'flights' | 'activities';
type Variant = 'editorial' | 'dark';

interface BannerAdProps {
  partner: Partner;
  /** Snake-case placement id, e.g. 'post_sidebar', 'archive_inline'. */
  sid: string;
  /** Search query (hotels), origin code (flights), or GYG slug (activities). */
  destination?: string;
  /** Optional headline override. */
  headline?: string;
  /** Optional supporting line override. */
  copy?: string;
  variant?: Variant;
}

const PARTNER_DEFAULTS: Record<Partner, { headline: string; copy: string; cta: string; Icon: typeof BedDouble }> = {
  hotels: {
    headline: 'Find your cabin or igloo',
    copy: 'Compare 1,200+ Lapland stays — from glass igloos in Saariselkä to log cabins outside Levi.',
    cta: 'Browse stays',
    Icon: BedDouble,
  },
  flights: {
    headline: 'Helsinki → Rovaniemi',
    copy: 'Search flight + hotel packages to the Arctic. Direct flights from Helsinki, ~75 minutes.',
    cta: 'Compare flights',
    Icon: Plane,
  },
  activities: {
    headline: 'Husky safaris, sauna, snowmobile',
    copy: 'Bookable activities from the operators that actually run them, with reviews.',
    cta: 'See activities',
    Icon: MapPin,
  },
};

function buildHref(partner: Partner, sid: string, destination?: string) {
  const params = new URLSearchParams({ sid });
  if (partner === 'hotels' && destination) params.set('ss', destination);
  if (partner === 'flights' && destination) params.set('origin', destination);
  if (partner === 'activities' && destination) {
    return `${GO}/go/activities/${destination}?${params.toString()}`;
  }
  const partnerPath = partner === 'flights' ? 'cars' : partner; // flights still routed via cars Worker — placeholder until trip.com is wired
  return `${GO}/go/${partnerPath}?${params.toString()}`;
}

export default function BannerAd({
  partner,
  sid,
  destination,
  headline,
  copy,
  variant = 'editorial',
}: BannerAdProps) {
  const defaults = PARTNER_DEFAULTS[partner];
  const Icon = defaults.Icon;
  const href = buildHref(partner, sid, destination);

  if (variant === 'editorial') {
    return (
      <aside
        className="rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] p-5 not-prose"
        aria-label="Sponsored partner card"
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] font-semibold mb-3">
          Ad · Affiliate
        </p>
        <div className="flex items-start gap-3 mb-3">
          <Icon size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
          <h4
            className="text-[var(--color-ink)] text-base font-medium leading-snug"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            {headline ?? defaults.headline}
          </h4>
        </div>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4">
          {copy ?? defaults.copy}
        </p>
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
        >
          {defaults.cta}
          <ArrowUpRight size={14} />
        </a>
      </aside>
    );
  }

  // Dark variant — fits dark surfaces (Archive, Category)
  return (
    <aside
      className="rounded-xl border border-purple/25 bg-night-light/60 p-5"
      aria-label="Sponsored partner card"
    >
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-3">
        Ad · Affiliate
      </p>
      <div className="flex items-start gap-3 mb-3">
        <Icon size={20} className="text-pink shrink-0 mt-0.5" />
        <h4 className="text-snow text-base font-medium leading-snug">
          {headline ?? defaults.headline}
        </h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {copy ?? defaults.copy}
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink hover:text-aurora-blue transition-colors"
      >
        {defaults.cta}
        <ArrowUpRight size={14} />
      </a>
    </aside>
  );
}
