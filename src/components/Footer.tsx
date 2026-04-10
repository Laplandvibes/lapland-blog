// Footer — the "mainos alusta" hub. Lapland.blog is an editorial front
// door into the LaplandVibes ecosystem, so the footer doubles as a
// magazine-style affiliate showcase: featured trip deals, top stays,
// trending traveler blogs, destination cities, partner activities, the
// network sites, newsletter, social, and the usual legal row at the
// bottom. Designed to look earned, not banner-ad spammy. Items link out
// (target=_blank) to the relevant LaplandVibes site or stay internal.

import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ExternalLink,
  Rss,
  Mail,
  MapPin,
  Sparkles,
  Snowflake,
  Tag,
  Star,
  TrendingUp,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { getImage, type ImageSlot } from '../lib/images';

// Lucide stripped Instagram/Facebook brand glyphs over a licensing concern,
// so we ship tiny inline SVG components instead. Same size API as lucide.
function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

interface EcoLink {
  label: string;
  url: string;
  desc: string;
}

interface DealCard {
  badge: string;
  title: string;
  location: string;
  price: string;
  oldPrice?: string;
  url: string;
  imageSlot: ImageSlot;
  accent: 'pink' | 'green' | 'blue';
}

interface TrendingBlog {
  username: string;
  title: string;
  location: string;
  views: string;
}

// Same ecosystem list as the rest of the LaplandVibes network footers.
const ecosystem: EcoLink[] = [
  {
    label: 'LaplandVibes',
    url: 'https://laplandvibes.com',
    desc: 'The mothership — every Lapland thing worth knowing',
  },
  {
    label: 'LaplandStays',
    url: 'https://laplandstays.com',
    desc: '18 verified hotels, igloos, wilderness lodges',
  },
  {
    label: 'LaplandActivities',
    url: 'https://laplandactivities.online',
    desc: '150+ guided tours and experiences',
  },
  {
    label: 'LaplandDining',
    url: 'https://laplanddining.com',
    desc: 'Restaurants worth the reindeer',
  },
  {
    label: 'LaplandNightlife',
    url: 'https://laplandnightlife.com',
    desc: 'Clubs, bars and the midnight sun scene',
  },
  {
    label: 'LaplandTransport',
    url: 'https://laplandtransport.com',
    desc: 'Airport transfers, trains, rentals',
  },
  {
    label: 'LaplandFood',
    url: 'https://laplandfood.com',
    desc: 'Reindeer, salmon, cloudberries — what to eat',
  },
  {
    label: 'LaplandGifts',
    url: 'https://laplandgifts.com',
    desc: 'Local craft, design, things worth flying home',
  },
  {
    label: 'LaplandDeals',
    url: 'https://laplanddeals.com',
    desc: 'Live offers across the Lapland network',
  },
  {
    label: 'LaplandNature',
    url: 'https://laplandnature.com',
    desc: 'National parks, wildlife, the wilderness',
  },
  {
    label: 'LaplandBars',
    url: 'https://laplandbars.com',
    desc: 'Where to drink north of the Arctic Circle',
  },
  {
    label: 'LaplandStays · Igloos',
    url: 'https://laplandstays.com/category/igloos',
    desc: 'Glass igloos for aurora chasers',
  },
];

// Featured trip deals — hand-curated showcase, each card uses one of the
// real site images so no Unsplash duplication with other sections.
// Replace with live LaplandDeals /featured feed once available.
const featuredDeals: DealCard[] = [
  {
    badge: 'Bestseller',
    title: 'Aurora chase · 3 nights',
    location: 'Saariselkä',
    price: '€485',
    oldPrice: '€640',
    url: 'https://laplandstays.com/category/igloos',
    imageSlot: 'category-aurora',
    accent: 'pink',
  },
  {
    badge: 'New',
    title: 'Cabin & sauna escape · 4 nights',
    location: 'Pyhä',
    price: '€329',
    url: 'https://laplandstays.com',
    imageSlot: 'category-cabins',
    accent: 'green',
  },
  {
    badge: '−25%',
    title: 'Nordic table · dinner tasting menu',
    location: 'Rovaniemi',
    price: '€69',
    oldPrice: '€92',
    url: 'https://laplanddining.com',
    imageSlot: 'category-food',
    accent: 'blue',
  },
];

const trendingBlogs: TrendingBlog[] = [
  {
    username: 'aurora.chase',
    title: 'Five nights, four auroras',
    location: 'Inari',
    views: '8.1k',
  },
  {
    username: 'cabinlife.no',
    title: 'A wood cabin, no wifi, 8 days',
    location: 'Pyhä',
    views: '6.0k',
  },
  {
    username: 'snowmachine',
    title: '180 km of snowmobile',
    location: 'Rovaniemi',
    views: '5.7k',
  },
  {
    username: 'ellie.skis',
    title: 'Levi black runs and a 12m drop',
    location: 'Levi',
    views: '4.2k',
  },
];

const destinations = [
  { label: 'Rovaniemi', slug: 'rovaniemi', tag: 'Capital' },
  { label: 'Levi', slug: 'levi', tag: 'Skiing' },
  { label: 'Saariselkä', slug: 'saariselka', tag: 'Igloos' },
  { label: 'Inari', slug: 'inari', tag: 'Sámi · Aurora' },
  { label: 'Pyhä', slug: 'pyha', tag: 'Wilderness' },
  { label: 'Ylläs', slug: 'yllas', tag: 'Cross-country' },
  { label: 'Sodankylä', slug: 'sodankyla', tag: 'Aurora' },
  { label: 'Kilpisjärvi', slug: 'kilpisjarvi', tag: 'Three borders' },
];

const exploreLinks = [
  { to: '/stories', label: 'All trip blogs' },
  { to: '/category/aurora', label: 'Aurora' },
  { to: '/category/cabins', label: 'Cabins' },
  { to: '/category/food', label: 'Food' },
  { to: '/category/seasons', label: 'Seasons' },
];

const platformLinks = [
  { to: '/signin', label: 'Start your blog' },
  { to: '/about', label: 'How it works' },
  { to: '/about', label: 'About Lapland.blog' },
  { to: '/#how-it-works', label: 'Three steps' },
];

const ACCENT_PILL: Record<DealCard['accent'], string> = {
  pink: 'bg-pink text-white',
  green: 'bg-aurora-green text-night',
  blue: 'bg-aurora-blue text-night',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple/25 bg-gradient-to-b from-night via-night-light/30 to-night overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-pink/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-aurora-blue/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[300px] bg-aurora-green/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* ============================================================
            BRAND ROW
            ============================================================ */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 mb-5 group">
            <span className="font-display text-3xl md:text-5xl text-snow font-light leading-none tracking-tight group-hover:text-pink transition-colors">
              lapland<span className="text-pink mx-0.5">.</span>blog
            </span>
          </Link>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A free travel-journal platform for visitors to Finnish Lapland —
            and the editorial front door into the LaplandVibes network of 12
            sites covering stays, activities, food, deals and the wilderness.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
            <Snowflake size={12} className="text-pink" />
            <span className="text-pink text-[10px] tracking-[0.4em] uppercase font-bold">
              Written from Finland
            </span>
          </div>
        </div>

        <div className="section-divider mb-16" />

        {/* ============================================================
            FEATURED DEALS — magazine ad strip
            ============================================================ */}
        <section className="mb-20" aria-labelledby="footer-deals-heading">
          <div className="flex items-end justify-between mb-7 flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-pink/10 border border-pink/40">
                <Tag size={11} className="text-pink" />
                <p className="text-pink tracking-[0.3em] text-[10px] font-bold uppercase">
                  Trip deals · Live
                </p>
              </div>
              <h3
                id="footer-deals-heading"
                className="font-display text-2xl md:text-3xl text-snow font-light tracking-tight"
              >
                Best Lapland deals this week
              </h3>
            </div>
            <a
              href="https://laplanddeals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-pink hover:text-snow text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors"
            >
              All deals
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredDeals.map((deal) => {
              const img = getImage(
                deal.imageSlot,
                '(max-width: 768px) 100vw, 33vw'
              );
              return (
              <a
                key={deal.title}
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group relative rounded-2xl overflow-hidden border border-purple/25 bg-night-light/40 hover:border-pink/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes={img.sizes}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={750}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-bold shadow-lg ${ACCENT_PILL[deal.accent]}`}
                  >
                    {deal.badge}
                  </span>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-night/85 backdrop-blur-sm text-snow text-[10px] font-semibold inline-flex items-center gap-1">
                    <MapPin size={10} className="text-pink" />
                    {deal.location}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-snow font-semibold text-sm leading-snug mb-3 group-hover:text-pink transition-colors">
                    {deal.title}
                  </h4>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-pink font-bold text-xl">
                        {deal.price}
                      </span>
                      {deal.oldPrice && (
                        <span className="text-slate-500 text-xs line-through">
                          {deal.oldPrice}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-aurora-blue font-semibold">
                      Book
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                </div>
              </a>
              );
            })}
          </div>
          <p className="mt-4 text-[10px] tracking-wider uppercase text-slate-500 text-center">
            Affiliate partners · Booked through trusted operators in the
            LaplandVibes network
          </p>
        </section>

        {/* ============================================================
            TRENDING BLOGS + DESTINATIONS — two-column showcase
            ============================================================ */}
        <section className="mb-20 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Trending blogs */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={14} className="text-aurora-green" />
              <p className="text-aurora-green tracking-[0.3em] text-[10px] font-bold uppercase">
                Trending traveler blogs
              </p>
            </div>
            <h3 className="font-display text-2xl text-snow font-light tracking-tight mb-6">
              What people are reading right now
            </h3>
            <ol className="space-y-4">
              {trendingBlogs.map((blog, i) => (
                <li key={blog.username}>
                  <Link
                    to="/stories"
                    className="group flex items-start gap-4 rounded-xl border border-purple/20 bg-night-light/30 hover:bg-night-light/50 hover:border-aurora-green/40 p-3 transition-all"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-night flex items-center justify-center text-aurora-green text-sm font-bold border border-aurora-green/40">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-snow font-semibold text-sm leading-snug group-hover:text-aurora-green transition-colors truncate">
                        {blog.title}
                      </p>
                      <p className="text-[10px] tracking-wider uppercase text-slate-500 mt-0.5">
                        @{blog.username} · {blog.location} · {blog.views} reads
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-slate-500 group-hover:text-aurora-green group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Destinations grid */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Compass size={14} className="text-aurora-blue" />
              <p className="text-aurora-blue tracking-[0.3em] text-[10px] font-bold uppercase">
                Destinations
              </p>
            </div>
            <h3 className="font-display text-2xl text-snow font-light tracking-tight mb-6">
              Trip blogs by city
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {destinations.map((dest) => (
                <Link
                  key={dest.slug}
                  to="/stories"
                  className="group rounded-xl border border-purple/20 bg-night-light/30 hover:bg-night-light/50 hover:border-aurora-blue/40 p-3.5 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-snow font-semibold text-sm group-hover:text-aurora-blue transition-colors truncate">
                      {dest.label}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="text-slate-500 group-hover:text-aurora-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    />
                  </div>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-slate-500 mt-1">
                    {dest.tag}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PARTNER ECOSYSTEM — the network
            ============================================================ */}
        <section className="mb-20" aria-labelledby="footer-network-heading">
          <div className="flex items-end justify-between mb-7 flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-aurora-green" />
                <p className="text-aurora-green tracking-[0.3em] text-[10px] font-bold uppercase">
                  LaplandVibes network
                </p>
              </div>
              <h3
                id="footer-network-heading"
                className="font-display text-2xl md:text-3xl text-snow font-light tracking-tight"
              >
                12 sites. One Lapland.
              </h3>
            </div>
            <a
              href="https://laplandvibes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-aurora-green hover:text-snow text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors"
            >
              The mothership
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ecosystem.map((site) => (
              <li key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 rounded-xl p-3 border border-purple/15 bg-night-light/20 hover:bg-night-light/40 hover:border-aurora-green/40 transition-all"
                >
                  <ExternalLink
                    size={13}
                    className="text-aurora-green mt-1 flex-shrink-0 group-hover:text-pink transition-colors"
                  />
                  <div className="min-w-0">
                    <span className="block text-snow font-semibold text-sm group-hover:text-pink transition-colors truncate">
                      {site.label}
                    </span>
                    <span className="block text-slate-400 text-xs leading-snug mt-0.5">
                      {site.desc}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ============================================================
            NEWSLETTER + LINKS COLUMNS
            ============================================================ */}
        <section className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Newsletter signup */}
          <div className="rounded-2xl border border-pink/40 bg-gradient-to-br from-pink/10 via-night-light/30 to-aurora-blue/10 p-6 md:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-night/70 border border-pink/40">
              <Mail size={11} className="text-pink" />
              <p className="text-pink tracking-[0.3em] text-[10px] font-bold uppercase">
                Newsletter
              </p>
            </div>
            <h4 className="font-display text-xl text-snow font-light leading-snug mb-3">
              One field dispatch a week.
              <br />
              From Finland, with snow.
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              New trip blogs, the best deal of the week, and what the aurora
              forecast actually says. No junk.
            </p>
            <Link
              to="/#newsletter"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink text-white font-semibold text-xs tracking-[0.18em] uppercase hover:bg-pink-dark transition-colors"
            >
              Subscribe
              <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Explore */}
          <div>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-5">
              Read
            </p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-pink text-sm transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-aurora-green tracking-[0.35em] text-[10px] font-bold uppercase mb-5">
              Platform
            </p>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-aurora-green text-sm transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust + social */}
          <div>
            <p className="text-aurora-blue tracking-[0.35em] text-[10px] font-bold uppercase mb-5">
              Follow
            </p>
            <ul className="space-y-3 mb-5">
              <li>
                <a
                  href="https://www.instagram.com/laplandvibes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-aurora-blue text-sm transition-colors"
                >
                  <InstagramIcon size={13} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/laplandvibes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-aurora-blue text-sm transition-colors"
                >
                  <FacebookIcon size={13} />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-aurora-blue text-sm transition-colors"
                >
                  <Rss size={13} />
                  RSS feed
                </a>
              </li>
              <li>
                <a
                  href="mailto:laplandvibe@gmail.com"
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-aurora-blue text-sm transition-colors"
                >
                  <Mail size={13} />
                  Email us
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-1 text-amber-300 text-xs">
              <Star size={11} className="fill-amber-300" />
              <Star size={11} className="fill-amber-300" />
              <Star size={11} className="fill-amber-300" />
              <Star size={11} className="fill-amber-300" />
              <Star size={11} className="fill-amber-300" />
              <span className="text-slate-500 ml-1">2.8k readers</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            BOTTOM ROW
            ============================================================ */}
        <div className="pt-8 border-t border-purple/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {currentYear} Lapland.blog · A field journal platform by{' '}
            <a
              href="https://laplandvibes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora-blue hover:text-pink transition-colors font-semibold"
            >
              Lapeso Oy
            </a>
            , Rovaniemi, Finland
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link
              to="/privacy"
              className="text-slate-400 hover:text-pink transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/unsubscribe"
              className="text-slate-400 hover:text-pink transition-colors"
            >
              Unsubscribe
            </Link>
            <a
              href="/sitemap.xml"
              className="text-slate-400 hover:text-pink transition-colors"
            >
              Sitemap
            </a>
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink transition-colors"
              title="RSS feed"
            >
              <Rss size={11} /> RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
