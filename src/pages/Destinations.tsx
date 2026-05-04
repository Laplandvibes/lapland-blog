// /destinations — geographic discovery for the Lapland trip blog.
// 30+ traveller arrives knowing where she's going (or wants to choose).
// Show the 8 main Lapland destinations with entry counts. Empty cells are
// "be first to write here" — converts visitors into UGC writers.

import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, PenLine } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import type { Post } from '../data/posts';

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
    region: 'Far north — fells country',
    blurb: 'Treeless tundra, glass igloos, the Urho Kekkonen national park out the back door.',
    hero: '/images/hero-dusk-lake-1920.webp',
  },
  {
    slug: 'levi',
    name: 'Levi',
    region: 'West Lapland — fell country',
    blurb: "Finland's biggest ski resort. Direct flights from Helsinki in winter. Family-friendly basecamp.",
    hero: '/images/trip-cabin-life-1200.webp',
  },
  {
    slug: 'kemi',
    name: 'Kemi',
    region: 'Bay of Bothnia coast',
    blurb: 'Snow castle, ice-breaker tours, and the southernmost Lapland coast — flatter, salt air, sea aurora.',
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
    region: 'West Lapland — northern lights belt',
    blurb: 'Pallastunturi national park edge. Among the highest aurora-visibility readings in Europe.',
    hero: '/images/pillar-cold-1200.webp',
  },
  {
    slug: 'yllas',
    name: 'Ylläs',
    region: 'West Lapland — fell country',
    blurb: 'Quieter sister to Levi. Wider trails, slower pace, the fell that owns its own seasons.',
    hero: '/images/pillar-shelter-1200.webp',
  },
  {
    slug: 'kemijarvi',
    name: 'Kemijärvi',
    region: 'East Lapland — lake country',
    blurb: "Finland's northernmost city. Frozen lake, a dozen mökki within walking distance. Quiet.",
    hero: '/images/trip-cabin-life-1200.webp',
  },
];

function countMatching(posts: Post[], slug: string): number {
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === slug)).length;
}

export default function Destinations() {
  const { posts } = usePosts();

  useSeo({
    title: 'Destinations — Lapland.blog',
    description:
      "The eight main Finnish Lapland destinations: Rovaniemi, Saariselkä, Levi, Kemi, Inari, Muonio, Ylläs, Kemijärvi. Read the field-journal entries from each, or be the first to write one.",
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
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
        <div className="absolute top-1/3 left-1/3 w-[480px] h-[480px] rounded-full bg-aurora-blue/15 blur-[140px] animate-soft-float pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night/70 border border-aurora-blue/40">
              <MapPin size={12} className="text-aurora-blue" />
              <p className="text-aurora-blue tracking-[0.35em] text-[10px] font-bold uppercase">
                Where to go
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05] tracking-tight text-snow mb-6">
              Eight places. <span className="text-aurora-blue italic">One Lapland.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Pick a destination and read the entries from there. Empty ones
              are the next ones to write — you can be the first.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="dest-grid">
        <h2 id="dest-grid" className="sr-only">All destinations</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((d, i) => {
            const count = countMatching(posts, d.slug);
            return (
              <Reveal key={d.slug} delay={(Math.min(i, 5) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                <DestinationCard d={d} count={count} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              Don't see your place?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-4">
              Plant the flag.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Going somewhere not on this list? Sodankylä, Posio, Kilpisjärvi,
              Hetta — write the first entry from there and we'll add it to
              the map.
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pink text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-pink-dark transition-colors"
            >
              Start your blog
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

function DestinationCard({ d, count }: { d: Destination; count: number }) {
  const hasEntries = count > 0;
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
        hasEntries
          ? 'border-purple/30 hover:border-pink/60'
          : 'border-purple/15 hover:border-aurora-blue/55'
      }`}
    >
      <div className="aspect-[3/2] overflow-hidden relative">
        <img
          src={d.hero}
          alt={`${d.name}, Finnish Lapland`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        {!hasEntries && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-aurora-blue/15 border border-aurora-blue/40 backdrop-blur-sm">
            <PenLine size={10} className="text-aurora-blue" />
            <span className="text-aurora-blue text-[9px] font-bold uppercase tracking-[0.25em]">
              Be the first
            </span>
          </div>
        )}
        {hasEntries && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink/15 border border-pink/40 backdrop-blur-sm">
            <span className="text-pink text-[9px] font-bold uppercase tracking-[0.25em]">
              {count} {count === 1 ? 'entry' : 'entries'}
            </span>
          </div>
        )}
      </div>
      <div className="bg-night-light/40 p-5">
        <p className="text-aurora-blue tracking-[0.3em] text-[10px] font-bold uppercase mb-2">
          {d.region}
        </p>
        <h3 className="font-display text-2xl text-snow mb-2 leading-tight">{d.name}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-5">{d.blurb}</p>
        {hasEntries ? (
          <Link
            to={`/stories?tag=${d.slug}`}
            className="inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            Read entries
            <ArrowRight size={12} />
          </Link>
        ) : (
          <Link
            to="/signin"
            className="inline-flex items-center gap-1.5 text-aurora-blue hover:text-pink text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            Be the first to write
            <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </article>
  );
}
