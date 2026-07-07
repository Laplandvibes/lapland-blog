// /top-reads — curated editorial lists.
// What women landing on Lapland.blog actually look for: "where do I start",
// "best aurora pieces", "best food entries". Static curation for now;
// when traffic data exists, swap in real most-read sort.
//
// Design: this page used to be a flat stack of identical dark PostCard grids
// ("tosi karu"). It is now an editorial "reading list" — an inviting header
// with a contents rail, a framed editor's #1, and ranked accent-rail list
// cards with category chips, so it reads as a curated magazine table of
// contents rather than a dark wall of cards. No new imagery is introduced.

import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Snowflake, Utensils, Mountain, Clock, Crown } from 'lucide-react';
import type { ComponentType } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PageBreadcrumb from '../components/PageBreadcrumb';
import type { Post } from '../data/posts';
import { categoryBySlug } from '../data/categories';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

type IconType = ComponentType<{ size?: number; className?: string }>;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function TopReads() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].topReads;
  const chrome = COPY[lang].chrome;
  const { posts } = usePosts();

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
    canonical: canonicalUrl('/top-reads'),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd(
    'topreads-breadcrumb',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'Top reads', url: canonicalUrl('/top-reads') },
    ])
  );

  // Curated picks — mapped by slug. As more posts ship, these lists grow.
  const bySlug = (slug: string) => posts.find((p) => p.slug === slug);
  const editorsTop = bySlug('the-night-the-sky-broke-open-over-kemi') ?? posts[0];
  const firstTimer = ['why-i-stopped-chasing-the-aurora-with-an-app', 'five-nights-in-a-forest-cabin', 'living-between-two-suns']
    .map(bySlug)
    .filter((p): p is Post => Boolean(p));
  const aurora = posts.filter((p) => p.tags.includes('aurora'));
  const food = posts.filter((p) => p.category === 'food' || p.tags.includes('food'));
  const seasonal = posts.filter((p) => p.category === 'seasons' || p.tags.includes('seasons') || p.tags.includes('kaamos') || p.tags.includes('polar-night'));
  const cabins = posts.filter((p) => p.category === 'cabins' || p.tags.includes('cabins') || p.tags.includes('mokki'));

  // Build the list-section model so we can also render a "contents" rail.
  const sections: { id: string; eyebrow: string; title: string; subtitle: string; posts: Post[]; Icon: IconType }[] = [
    { id: 'first-timers', eyebrow: c.firstTimersEyebrow, title: c.firstTimersTitle, subtitle: c.firstTimersSubtitle, posts: firstTimer, Icon: Mountain },
    { id: 'aurora', eyebrow: c.auroraEyebrow, title: c.auroraTitle, subtitle: c.auroraSubtitle, posts: aurora, Icon: Sparkles },
    { id: 'cabins', eyebrow: c.cabinsEyebrow, title: c.cabinsTitle, subtitle: c.cabinsSubtitle, posts: cabins, Icon: Snowflake },
    { id: 'food', eyebrow: c.foodEyebrow, title: c.foodTitle, subtitle: c.foodSubtitle, posts: food, Icon: Utensils },
    { id: 'seasonal', eyebrow: c.seasonalEyebrow, title: c.seasonalTitle, subtitle: c.seasonalSubtitle, posts: seasonal, Icon: Snowflake },
  ].filter((s) => s.posts.length > 0);

  const totalReads = sections.reduce((n, s) => n + s.posts.length, 0) + (editorsTop ? 1 : 0);

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* ================================================================
          HERO — inviting masthead + curated-list contents rail
          ================================================================ */}
      <section className="relative pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
        <div className="absolute -top-10 right-1/4 w-[460px] h-[460px] rounded-full bg-pink/15 blur-[150px] pointer-events-none animate-hero-pulse" />
        <div className="absolute top-1/2 left-0 w-[360px] h-[360px] rounded-full bg-purple/12 blur-[150px] pointer-events-none animate-soft-float" />

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-night/70 border border-pink/45 backdrop-blur-sm">
              <Sparkles size={13} className="text-pink-300" />
              <p className="text-pink-200 tracking-[0.32em] text-[10px] font-bold uppercase">
                {c.eyebrow}
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.98] tracking-tight text-snow mb-6">
              {c.h1}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-2xl">
              {c.lead}
            </p>
          </Reveal>

          {/* Contents rail — jump chips. Gives the page a magazine "in this
              issue" feel and immediate orientation instead of an endless scroll. */}
          {sections.length > 0 && (
            <Reveal delay={3}>
              <nav aria-label="On this page" className="mt-9 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 text-slate-400 text-[11px] uppercase tracking-[0.25em] font-semibold mr-1">
                  <span className="w-6 h-px bg-pink/50" />
                  <span className="text-pink-200 tabular-nums">{totalReads}</span>
                  {c.eyebrow}
                </span>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-night-light/60 border border-purple/30 text-slate-200 text-xs font-semibold tracking-wide transition-all hover:border-pink/60 hover:bg-night-light hover:-translate-y-0.5"
                  >
                    <s.Icon size={13} className="text-pink-300" />
                    {s.eyebrow}
                  </a>
                ))}
              </nav>
            </Reveal>
          )}
        </div>
      </section>

      <PageBreadcrumb />

      {/* ================================================================
          EDITOR'S #1 — framed, numbered "the one to read first"
          ================================================================ */}
      {editorsTop && (
        <section className="px-4 sm:px-6 lg:px-8 pt-14 pb-20" aria-labelledby="editors-pick">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-pink to-pink-600 text-white shadow-[0_8px_30px_-8px_rgba(236,72,153,0.6)]">
                  <Crown size={18} />
                </span>
                <div>
                  <p className="text-pink-200 tracking-[0.32em] text-[10px] font-bold uppercase">
                    {c.onlyEyebrow}
                  </p>
                  <h2 id="editors-pick" className="font-display text-3xl md:text-4xl tracking-tight text-snow leading-tight">
                    {c.onlyH2}
                  </h2>
                </div>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-9 max-w-2xl">
                {c.onlyLead}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <FeaturedReadCard post={editorsTop} to={to} minRead={chrome.minRead} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ================================================================
          CURATED LISTS — ranked accent-rail cards (the core de-bleak)
          ================================================================ */}
      {sections.map((s, idx) => (
        <ListSection
          key={s.id}
          id={s.id}
          eyebrow={s.eyebrow}
          title={s.title}
          subtitle={s.subtitle}
          posts={s.posts}
          Icon={s.Icon}
          to={to}
          minRead={chrome.minRead}
          shaded={idx % 2 === 1}
        />
      ))}

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-pink/30 bg-gradient-to-br from-night-light/80 via-night-light/40 to-night/60 p-10 md:p-14 text-center">
              <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-pink/15 blur-[120px] pointer-events-none" />
              <div className="relative">
                <p className="text-pink-200 tracking-[0.32em] text-[10px] font-bold uppercase mb-4">
                  {c.ctaEyebrow}
                </p>
                <h2 className="font-display text-3xl md:text-4xl tracking-tight text-snow mb-4">
                  {c.ctaH2}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl mx-auto">
                  {c.ctaLead}
                </p>
                <Link
                  to={to('/signin')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-pink text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300"
                >
                  {c.ctaButton}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------
   Editor's #1 — a wide hero-style card. Big image left, framed copy
   right, with a "01 / editor's pick" rail so it clearly reads as THE
   recommendation, not just another grid tile.
   ------------------------------------------------------------------ */
function FeaturedReadCard({ post, to, minRead }: { post: Post; to: (p: string) => string; minRead: string }) {
  const cat = categoryBySlug(post.category);
  return (
    <Link
      to={to(`/post/${post.slug}`)}
      className="group block relative overflow-hidden rounded-3xl border border-purple/30 bg-night-light/40 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-pink/55 hover:-translate-y-1 hover:shadow-[0_50px_110px_-50px_rgba(236,72,153,0.4)]"
      aria-label={`Read the editor's pick: ${post.title}`}
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[360px] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={1000}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-night-light/60" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-night/85 backdrop-blur-sm text-pink-200 text-[10px] font-bold uppercase tracking-[0.25em] border border-pink/45">
            <Crown size={11} /> 01
          </span>
        </div>

        <div className="relative flex flex-col justify-center p-7 md:p-10">
          {/* Accent rail */}
          <span className="hidden md:block absolute left-0 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-pink to-pink-600" />
          {cat && (
            <span className="inline-flex self-start items-center px-2.5 py-1 mb-4 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] bg-pink/15 text-pink-200 border border-pink/35">
              {cat.name}
            </span>
          )}
          <h3 className="font-display text-2xl md:text-[2rem] leading-[1.08] tracking-tight text-snow group-hover:text-pink transition-colors mb-4">
            {post.title}
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} /> {post.readTimeMinutes} {minRead}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-pink-300 font-semibold uppercase tracking-[0.2em] text-[11px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              Read <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------
   A curated list section — a header band + ranked accent-rail cards.
   ------------------------------------------------------------------ */
interface ListSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  posts: Post[];
  Icon: IconType;
  to: (p: string) => string;
  minRead: string;
  shaded?: boolean;
}

function ListSection({ id, eyebrow, title, subtitle, posts, Icon, to, minRead, shaded }: ListSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 sm:px-6 lg:px-8 py-16 ${shaded ? 'bg-night-light/20' : ''}`}
      aria-labelledby={`${id}-h`}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-start gap-4 mb-9">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-night-light/70 border border-pink/30 shrink-0">
              <Icon size={19} className="text-pink-300" />
            </span>
            <div>
              <p className="text-pink-200 tracking-[0.32em] text-[10px] font-bold uppercase mb-1.5">
                {eyebrow}
              </p>
              <h2 id={`${id}-h`} className="font-display text-3xl md:text-4xl tracking-tight text-snow leading-tight">
                {title}
              </h2>
            </div>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-9 max-w-2xl md:pl-[3.75rem]">
            {subtitle}
          </p>
        </Reveal>

        <div className="space-y-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}>
              <ReadListCard post={p} rank={i + 1} to={to} minRead={minRead} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Ranked list card — thumbnail + rank number + accent rail + chip.
   Horizontal, editorial, hover-lift. Replaces the flat 3-col grid that
   made the page read "karu".
   ------------------------------------------------------------------ */
function ReadListCard({ post, rank, to, minRead }: { post: Post; rank: number; to: (p: string) => string; minRead: string }) {
  const cat = categoryBySlug(post.category);
  return (
    <Link
      to={to(`/post/${post.slug}`)}
      className="group relative flex items-stretch gap-4 sm:gap-6 rounded-2xl border border-purple/25 bg-night-light/45 overflow-hidden transition-all duration-300 hover:border-pink/55 hover:bg-night-light/70 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(236,72,153,0.45)]"
      aria-label={`Read: ${post.title}`}
    >
      {/* Accent rail — lights up on hover */}
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-pink/0 group-hover:bg-gradient-to-b group-hover:from-pink group-hover:to-pink-600 transition-colors" />

      {/* Thumbnail */}
      <div className="relative w-28 sm:w-44 md:w-52 shrink-0 overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.heroAlt}
          loading="lazy"
          decoding="async"
          width={640}
          height={420}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/10 to-night-light/70" />
        <span className="absolute top-2 left-2 inline-flex items-center justify-center min-w-[1.6rem] h-6 px-1.5 rounded-full bg-night/85 backdrop-blur-sm text-pink-200 text-[11px] font-bold tabular-nums border border-pink/40">
          {String(rank).padStart(2, '0')}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 py-4 pr-4 sm:py-5 sm:pr-6 flex flex-col justify-center">
        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
          {cat && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.22em] bg-pink/15 text-pink-200 border border-pink/30">
              {cat.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-slate-400 text-[11px] tracking-wide">
            <Clock size={11} /> {post.readTimeMinutes} {minRead}
          </span>
          <span className="text-slate-500 text-[11px] hidden sm:inline">·</span>
          <time className="text-slate-400 text-[11px] hidden sm:inline" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="font-display text-lg sm:text-xl md:text-2xl leading-snug tracking-tight text-snow group-hover:text-pink transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="hidden sm:block text-slate-300 text-sm leading-relaxed mt-2 line-clamp-2">
          {post.excerpt}
        </p>
      </div>

      {/* Arrow */}
      <span className="self-center pr-4 sm:pr-6 text-pink-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        <ArrowUpRight size={20} />
      </span>
    </Link>
  );
}
