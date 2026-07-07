// /destinations — geographic discovery for the Lapland trip blog.
// 30+ traveller arrives knowing where she's going (or wants to choose).
// Show the 8 main Lapland destinations with entry counts. Empty cells are
// "be first to write here" — converts visitors into UGC writers.

import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, PenLine, BedDouble } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import type { Post } from '../data/posts';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

interface Destination {
  slug: string;            // matches the lower-case tag
  name: string;
  region: string;          // e.g. "South Lapland", "Far North"
  blurb: string;
  hero: string;            // local /images/* webp
}

// 8 destinations — match the LV ecosystem geography. Empty ones become
// "be the first to write" prompts.
const DESTINATIONS: Destination[] = [
  {
    slug: 'rovaniemi',
    name: 'Rovaniemi',
    region: 'On the Arctic Circle',
    blurb: "Lapland's capital. Where most flights land. The base camp for everything north of here.",
    hero: '/images/category-aurora-1200.webp',
  },
  {
    slug: 'saariselka',
    name: 'Saariselkä',
    region: 'Far north, fells country',
    blurb: 'Treeless tundra, glass igloos, the Urho Kekkonen national park out the back door.',
    hero: '/images/trip-forest-walk-1200.webp',
  },
  {
    slug: 'levi',
    name: 'Levi',
    region: 'West Lapland, fell country',
    blurb: "Finland's biggest ski resort. Direct flights from Helsinki in winter. Family-friendly basecamp.",
    hero: '/images/trip-cabin-life-1200.webp',
  },
  {
    slug: 'kemi',
    name: 'Kemi',
    region: 'Bay of Bothnia coast',
    blurb: 'Snow castle, ice-breaker tours, and the southernmost Lapland coast. Flatter ground, salt air, sea aurora.',
    hero: '/images/trip-aurora-chase-1200.webp',
  },
  {
    slug: 'inari',
    name: 'Inari',
    region: 'Sámi heartland',
    blurb: "Finland's third-largest lake. The Sámi cultural centre Siida. Where Lapland feels furthest from Europe.",
    hero: '/images/category-seasons-1200.webp',
  },
  {
    slug: 'muonio',
    name: 'Muonio',
    region: 'West Lapland, northern lights belt',
    blurb: 'Pallastunturi national park edge. Among the highest aurora-visibility readings in Europe.',
    hero: '/images/pillar-cold-1200.webp',
  },
  {
    slug: 'yllas',
    name: 'Ylläs',
    region: 'West Lapland, fell country',
    blurb: 'Quieter sister to Levi. Wider trails, slower pace, the fell that owns its own seasons.',
    hero: '/images/pillar-shelter-1200.webp',
  },
  {
    slug: 'kemijarvi',
    name: 'Kemijärvi',
    region: 'East Lapland, lake country',
    blurb: "Finland's northernmost city. Frozen lake, a dozen mökki within walking distance. Quiet.",
    hero: '/images/trip-silence-1200.webp',
  },
];

function countMatching(posts: Post[], slug: string): number {
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === slug)).length;
}

export default function Destinations() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].destinations;
  const { posts } = usePosts();

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
    image: 'https://lapland.blog/og/page-destinations.jpg',
    canonical: canonicalUrl('/destinations'),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd(
    'destinations-breadcrumb',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'Destinations', url: canonicalUrl('/destinations') },
    ])
  );

  return (
    <div className="theme-editorial min-h-screen">
      <Nav />

      {/* ================================================================
          HERO — full-bleed image + cream title plate (matches Post/About).
          Lifts the page out of the old dark, cold treatment into the light
          editorial system the rest of the blog uses.
          ================================================================ */}
      <header className="relative pt-16">
        <div className="relative h-[52vh] min-h-[380px] max-h-[560px] overflow-hidden bg-[var(--color-cream-deep)]">
          <picture>
            <source srcSet="/images/hero-dusk-lake-1920.avif 1920w, /images/hero-dusk-lake-1200.avif 1200w" type="image/avif" />
            <source srcSet="/images/hero-dusk-lake-1920.webp 1920w, /images/hero-dusk-lake-1200.webp 1200w" type="image/webp" />
            <img
              src="/images/hero-dusk-lake-1920.webp"
              alt="Frozen lake in Lapland at blue-hour dusk, snow-covered pines along the shore"
              className="absolute inset-0 w-full h-full object-cover object-[50%_45%]"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={823}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 mb-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-cream)] rounded-[1.25rem] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.55)] border border-[var(--color-paper-border)] px-6 py-9 md:px-12 md:py-12">
              <p className="inline-flex items-center gap-2 text-[var(--color-accent)] tracking-[0.32em] text-[11px] font-bold uppercase mb-5">
                <MapPin size={13} /> {c.eyebrow}
              </p>
              <h1
                className="text-[var(--color-ink)] leading-[1.04] tracking-[-0.015em] text-[clamp(2.25rem,5.5vw,3.75rem)] mb-5"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}
              >
                {c.h1Pre} <span className="text-[var(--color-accent)]">{c.h1Italic}</span>
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed">
                {c.lead}
              </p>
            </div>
          </div>
        </div>
      </header>

      <PageBreadcrumb editorial />

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="dest-grid">
        <h2 id="dest-grid" className="sr-only">All destinations</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DESTINATIONS.map((d, i) => {
            const count = countMatching(posts, d.slug);
            return (
              <Reveal key={d.slug} delay={(Math.min(i, 5) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                <DestinationCard d={d} count={count} c={c} to={to} lang={lang} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA — warm cream panel */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] px-6 py-12 md:px-12 text-center">
              <p className="text-[var(--color-accent)] tracking-[0.32em] text-[10px] font-bold uppercase mb-4">
                {c.dontSeeEyebrow}
              </p>
              <h2
                className="text-[var(--color-ink)] text-3xl md:text-4xl mb-4"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
              >
                {c.plantH2}
              </h2>
              <p className="text-[var(--color-ink-soft)] text-base leading-relaxed mb-8 max-w-xl mx-auto">
                {c.plantLead}
              </p>
              <Link
                to={to('/signin')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-[var(--color-accent-dark)] transition-colors"
              >
                {c.plantCta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-night text-snow">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

type DestCopy = typeof COPY['en']['destinations'];
function DestinationCard({
  d,
  count,
  c,
  to,
  lang,
}: {
  d: Destination;
  count: number;
  c: DestCopy;
  to: (p: string) => string;
  lang: 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';
}) {
  const hasEntries = count > 0;
  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--color-cream)] border border-[var(--color-paper-border)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(26,24,21,0.35)] transition-all duration-300">
      <div className="aspect-[3/2] overflow-hidden relative">
        <img
          src={d.hero}
          alt={`${d.name}, Finnish Lapland`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        {!hasEntries ? (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-cream)]/95 border border-[var(--color-accent)]/30 backdrop-blur-sm">
            <PenLine size={10} className="text-[var(--color-accent)]" />
            <span className="text-[var(--color-accent)] text-[9px] font-bold uppercase tracking-[0.25em]">
              {c.beTheFirst}
            </span>
          </div>
        ) : (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-cream)]/95 border border-[var(--color-accent)]/30 backdrop-blur-sm">
            <span className="text-[var(--color-accent)] text-[9px] font-bold uppercase tracking-[0.25em]">
              {count} {count === 1 ? c.entrySingular : c.entryPlural}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[var(--color-ink-mute)] tracking-[0.28em] text-[10px] font-bold uppercase mb-2">
          {d.region}
        </p>
        <h3
          className="text-2xl text-[var(--color-ink)] mb-2 leading-tight"
          style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
        >
          {d.name}
        </h3>
        <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed mb-5">{d.blurb}</p>

        <div className="space-y-3 mt-auto pt-4 border-t border-[var(--color-paper-border)]">
          {hasEntries ? (
            <Link
              to={to(`/stories?tag=${d.slug}`)}
              className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] text-xs uppercase tracking-[0.2em] font-bold transition-colors"
            >
              {c.readEntries}
              <ArrowRight size={12} />
            </Link>
          ) : (
            <Link
              to={to('/signin')}
              className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] text-xs uppercase tracking-[0.2em] font-bold transition-colors"
            >
              {c.beFirstWrite}
              <ArrowRight size={12} />
            </Link>
          )}

          {/* Sales CTA — every destination card gets a Hotels.com hook */}
          <a
            href={`https://go.laplandvibes.com/go/hotels?sid=destinations_${d.slug}&ss=${encodeURIComponent(d.name)}%2C+Lapland%2C+Finland&locale=${lang === 'fi' ? 'fi_FI' : lang === 'de' ? 'de_DE' : 'en_US'}`}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-1.5 text-[var(--color-ink-mute)] hover:text-[var(--color-accent)] text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            <BedDouble size={11} />
            {c.findStayPrefix} {d.name}
            <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </article>
  );
}
