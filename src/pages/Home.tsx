// Home — narrative editorial landing page.
// Top-to-bottom: cinematic hero, manifesto strip, featured story, three-pillar
// editorial index, latest stories grid, personal aside, newsletter, footer.
// The site's "magazine cover" — and the storytelling pitch in 30 seconds.

import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, PenLine, MapPin, BookOpen, Share2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';
import TripBlogsCarousel from '../components/TripBlogsCarousel';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, personSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';
import { getImage, getImagePreloadSrc } from '../lib/images';

// Cinematic home hero — real generated image, aurora over a frozen river in Lapland.
const heroImage = getImage('hero-aurora', '100vw');
const HOME_HERO = getImagePreloadSrc('hero-aurora');

// Aside portrait — the tiny figure under the aurora arc.
const asideImage = getImage(
  'aside-vesa',
  '(max-width: 768px) 100vw, 260px',
  'Solitary figure with a headlamp standing under a giant aurora arc over Lapland tundra'
);

interface Pillar {
  kicker: string;
  title: string;
  body: string;
  links: { label: string; to: string }[];
  accent: 'pink' | 'green' | 'blue';
  image: ReturnType<typeof getImage>;
}

const PILLARS: Pillar[] = [
  {
    kicker: 'I · The cold',
    title: 'What the cold actually does',
    body:
      'Aurora nights, the polar dark, the eight seasons most lists forget. The weather is the main character here — not a backdrop. I write about what minus twenty-three feels like at 03:47, and what it does to a phone battery, and to a person.',
    links: [
      { label: 'Aurora', to: '/category/aurora' },
      { label: 'Seasons', to: '/category/seasons' },
    ],
    accent: 'green',
    image: getImage('pillar-cold', '(max-width: 768px) 100vw, 33vw'),
  },
  {
    kicker: 'II · The shelter',
    title: 'Where I sleep, where I eat',
    body:
      'Wooden cabins, glass igloos, saunas that work and saunas that do not. The forty-two-euro bowl of salmon soup that turned out to be worth it. The rye bread my grandmother would have approved of, and the coffee you drink at 2am because the sun forgot to set.',
    links: [
      { label: 'Cabins', to: '/category/cabins' },
      { label: 'Food', to: '/category/food' },
    ],
    accent: 'pink',
    image: getImage('pillar-shelter', '(max-width: 768px) 100vw, 33vw'),
  },
  {
    kicker: 'III · The other people',
    title: 'Who else lives up here',
    body:
      'Reindeer herders, ski patrollers, sauna masters, the man at the petrol station outside Sodankylä who spoke four languages. Lapland is quiet, but it is never empty. These are the long-form pieces about the people you actually meet.',
    links: [
      { label: 'People', to: '/category/people' },
      { label: 'Stories', to: '/category/stories' },
    ],
    accent: 'blue',
    image: getImage('pillar-people', '(max-width: 768px) 100vw, 33vw'),
  },
];

export default function Home() {
  const { posts: allPosts, loading } = usePosts({ limit: 12 });
  // Featured: the post flagged `featured` if present, otherwise the newest.
  const feature = allPosts.find((p) => p.featured) ?? allPosts[0];
  // Latest six excluding the featured one.
  const recent = allPosts
    .filter((p) => !feature || p.slug !== feature.slug)
    .slice(0, 6);

  useSeo({
    title:
      'Lapland.blog — Start a travel blog of your Finnish Lapland trip',
    description:
      'A free travel-journal platform for visitors to Finnish Lapland. Pin where you saw the aurora, photograph the cabin, write what the temperature did. Build a beautiful blog of your trip your friends can follow.',
    image: HOME_HERO,
    canonical: canonicalUrl('/'),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd('person', personSchema());

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* ================================================================
          1 · HERO — full-bleed cinematic aurora, kenburns
          ================================================================ */}
      <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-16">
        <img
          src={heroImage.src}
          srcSet={heroImage.srcSet}
          sizes={heroImage.sizes}
          alt={heroImage.alt}
          className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          fetchPriority="high"
          decoding="async"
          width={2560}
          height={1097}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/72 via-night/40 to-night/95" />
        <div className="absolute inset-0 hero-scrim-radial pointer-events-none" />
        <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/60 to-transparent" />

        {/* Pulsing aurora orbs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[640px] h-[640px] rounded-full bg-pink/15 blur-[140px] animate-hero-pulse" />
        </div>
        <div className="absolute top-1/3 left-1/4 pointer-events-none hidden md:block">
          <div className="w-[320px] h-[320px] rounded-full bg-aurora-blue/10 blur-[120px] animate-soft-float" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 pointer-events-none hidden md:block">
          <div
            className="w-[280px] h-[280px] rounded-full bg-aurora-green/10 blur-[110px] animate-soft-float"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
              <Snowflake size={12} className="text-pink" />
              <span className="text-pink tracking-[0.4em] text-[11px] uppercase font-bold">
                Travel journal · Map · Share
              </span>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.25rem,6.5vw,5.25rem)] leading-[1.03] tracking-tight mb-6 text-snow font-light hero-text-shadow">
              Going to Lapland?
              <br />
              <span className="text-pink italic font-light">
                Start a blog of your trip.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="max-w-2xl mx-auto text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed hero-text-shadow-sm">
              Pin where you saw the aurora. Photograph the cabin. Write what
              the temperature did. Build a beautiful blog of your trip — one
              your friends can actually follow.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to="/signin"
                className="group cursor-pointer px-8 py-3.5 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:ring-offset-2 focus:ring-offset-night"
              >
                Start your trip blog
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="#how-it-works"
                className="cursor-pointer px-8 py-3.5 border border-aurora-blue/60 text-aurora-blue hover:bg-aurora-blue/10 hover:border-aurora-blue rounded-full transition-colors duration-200 tracking-wide font-semibold focus:outline-none focus:ring-2 focus:ring-aurora-blue/40 focus:ring-offset-2 focus:ring-offset-night"
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-slate-300">
              Free · Made in Finland · Share to Instagram · No ads
            </p>
          </Reveal>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-night pointer-events-none" />
      </section>

      {/* ================================================================
          1.5 · SEASONAL BAND — the midnight sun is the marketing gap
          The 32-night window when Lapland flips from white to amber.
          Warm cream + coral overlay breaks up the long dark hero scroll.
          ================================================================ */}
      <section
        aria-labelledby="seasonal-heading"
        className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#FCE9D2] to-[#F4B36A] text-[#1A1815]"
      >
        {/* Soft sun glow */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#F8C770]/55 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-32 w-[640px] h-[640px] rounded-full bg-[#E97C46]/30 blur-[160px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/65 backdrop-blur-sm border border-[#C1543B]/35">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E97C46] animate-pulse" />
                  <p className="tracking-[0.3em] text-[10px] font-bold uppercase text-[#8F3525]">
                    Midnight sun · Jun 6 → Jul 7
                  </p>
                </div>
                <h2
                  id="seasonal-heading"
                  className="font-normal text-4xl md:text-5xl leading-[1.05] tracking-[-0.01em] text-[#1A1815] mb-6"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Lapland's other postcard.
                </h2>
                <p className="text-[#3B3935] text-base md:text-lg leading-relaxed mb-7 max-w-[55ch]">
                  Thirty-two nights when the sun refuses to set. The forest
                  goes amber. The lakes mirror sky. Most visitors only ever
                  hear about the white version of Lapland — but summer is the
                  trip you'll come back to write about. Start the journal
                  while you're still in it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1A1815] text-white font-semibold uppercase tracking-[0.18em] text-xs hover:bg-[#3B3935] transition-colors"
                  >
                    Start a summer trip blog
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/category/seasons"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#8F3525] font-semibold uppercase tracking-[0.18em] text-xs border border-[#C1543B]/35 transition-colors"
                  >
                    Read summer entries
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/65 backdrop-blur-sm border border-white/80 p-5 shadow-[0_30px_60px_-30px_rgba(143,53,37,0.25)]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F3525] font-bold mb-2">
                    01 · Light
                  </p>
                  <p
                    className="text-[#1A1815] text-lg leading-snug"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    24 h golden hour
                  </p>
                  <p className="text-sm text-[#3B3935] mt-2 leading-relaxed">
                    The sun grazes the horizon. Photographers call it the
                    longest blue hour on earth.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/65 backdrop-blur-sm border border-white/80 p-5 shadow-[0_30px_60px_-30px_rgba(143,53,37,0.25)] mt-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F3525] font-bold mb-2">
                    02 · Forest
                  </p>
                  <p
                    className="text-[#1A1815] text-lg leading-snug"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    Cloudberry season
                  </p>
                  <p className="text-sm text-[#3B3935] mt-2 leading-relaxed">
                    Late July: the bog turns gold. Locals call it the second
                    harvest.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/65 backdrop-blur-sm border border-white/80 p-5 shadow-[0_30px_60px_-30px_rgba(143,53,37,0.25)]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F3525] font-bold mb-2">
                    03 · Water
                  </p>
                  <p
                    className="text-[#1A1815] text-lg leading-snug"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    Sauna, then a swim
                  </p>
                  <p className="text-sm text-[#3B3935] mt-2 leading-relaxed">
                    14°C lake at midnight, 90°C sauna five steps away. Repeat.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/65 backdrop-blur-sm border border-white/80 p-5 shadow-[0_30px_60px_-30px_rgba(143,53,37,0.25)] mt-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F3525] font-bold mb-2">
                    04 · Quiet
                  </p>
                  <p
                    className="text-[#1A1815] text-lg leading-snug"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    No-one else
                  </p>
                  <p className="text-sm text-[#3B3935] mt-2 leading-relaxed">
                    The cabins that book out in winter sit empty in July.
                    Same forest, no queue.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          2 · HOW IT WORKS — three steps to your trip blog
          ================================================================ */}
      <section
        id="how-it-works"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
        aria-labelledby="how-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/25 to-night" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-purple/10 blur-[160px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
                <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
                <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                  How it works
                </p>
              </div>
              <h2
                id="how-heading"
                className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5"
              >
                Three steps. One trip.{' '}
                <span className="text-pink italic">A blog worth keeping.</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Lapland.blog is a free travel-journal platform built for
                visitors to Finnish Lapland. Your trip becomes a beautiful
                blog you actually want to share.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={1}>
              <article className="h-full rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm p-8 hover:border-aurora-green/55 transition-colors">
                <div className="w-12 h-12 rounded-full bg-aurora-green/15 border border-aurora-green/40 flex items-center justify-center mb-6">
                  <MapPin className="text-aurora-green" size={20} />
                </div>
                <p className="text-aurora-green text-[10px] tracking-[0.35em] uppercase font-bold mb-3">
                  Step 01 · Plan
                </p>
                <h3
                  className="font-display text-2xl text-snow font-medium leading-snug mb-4"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Pin the places.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Drop pins on the Lapland map for the cabin you booked, the
                  restaurant you want to try, and the dark-sky spot for the
                  aurora. Build your route before you fly.
                </p>
              </article>
            </Reveal>

            <Reveal delay={2}>
              <article className="h-full rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm p-8 hover:border-pink/55 transition-colors">
                <div className="w-12 h-12 rounded-full bg-pink/15 border border-pink/40 flex items-center justify-center mb-6">
                  <BookOpen className="text-pink" size={20} />
                </div>
                <p className="text-pink text-[10px] tracking-[0.35em] uppercase font-bold mb-3">
                  Step 02 · Journal
                </p>
                <h3
                  className="font-display text-2xl text-snow font-medium leading-snug mb-4"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Write as you go.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  From your phone, in the cabin, in the car, in the sauna.
                  Add photos, the temperature, what the soup tasted like.
                  Each entry pins itself to the day and the place.
                </p>
              </article>
            </Reveal>

            <Reveal delay={3}>
              <article className="h-full rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm p-8 hover:border-aurora-blue/55 transition-colors">
                <div className="w-12 h-12 rounded-full bg-aurora-blue/15 border border-aurora-blue/40 flex items-center justify-center mb-6">
                  <Share2 className="text-aurora-blue" size={20} />
                </div>
                <p className="text-aurora-blue text-[10px] tracking-[0.35em] uppercase font-bold mb-3">
                  Step 03 · Share
                </p>
                <h3
                  className="font-display text-2xl text-snow font-medium leading-snug mb-4"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Your trip, told well.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Your entries become a beautiful public blog at{' '}
                  <span className="text-aurora-blue">
                    lapland.blog/your-name
                  </span>
                  . Friends can follow it. Each post exports to an Instagram
                  story so the trip lives twice.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={4}>
            <div className="mt-14 text-center">
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:ring-offset-2 focus:ring-offset-night"
              >
                Start your trip blog
                <ArrowRight size={18} />
              </Link>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-slate-400">
                Free for travel journals · No card required · Sign in with Google
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* ================================================================
          2.5 · LIVE TRIP BLOGS — carousel of traveler blogs (action imagery)
          ================================================================ */}
      <section
        id="live-blogs"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="live-blogs-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/15 to-night pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[700px] h-[400px] rounded-full bg-pink/8 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-aurora-blue/8 blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4 px-2">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
                  <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                    Live trip blogs
                  </p>
                </div>
                <h2
                  id="live-blogs-heading"
                  className="font-display text-4xl md:text-5xl lg:text-6xl text-snow font-light tracking-tight leading-[1.05]"
                >
                  Real trips.{' '}
                  <span className="text-pink italic">Real travelers.</span>
                  <br />
                  Yours is next.
                </h2>
              </div>
              <Link
                to="/stories"
                className="group inline-flex items-center gap-1.5 text-aurora-blue hover:text-pink text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                Browse all blogs
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mb-12 leading-relaxed px-2">
              Skiing the black runs at Levi. Hunting aurora at Inari. 60 km on a
              husky sled in Saariselkä. Every blog you see here was written by a
              visitor on a single trip — and built in under five minutes.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <TripBlogsCarousel />
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-14 text-center">
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-10 py-4 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:ring-offset-2 focus:ring-offset-night text-base"
              >
                Start my trip blog
                <ArrowRight size={18} />
              </Link>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-slate-400">
                Free · No card · 2 minutes to your first entry
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* ================================================================
          3 · FOUNDER'S EXAMPLE JOURNAL — show what a great trip blog looks like
          ================================================================ */}
      <section
        id="featured"
        className="relative py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-pink animate-pulse" />
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                Founder's example journal
              </p>
              <div className="flex-1 h-px bg-gradient-to-r from-pink/30 to-transparent" />
              <Link
                to="/stories"
                className="text-slate-400 hover:text-pink text-[10px] tracking-[0.3em] uppercase font-semibold transition-colors"
              >
                Every entry →
              </Link>
            </div>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
              This is what your own trip blog could look like. The five seed
              entries below were written by The Field Journal — the editorial
              voice of Lapland.blog — across one Lapland winter. Real
              temperatures, real cabins, real soup. Read one and picture your
              own.
            </p>
          </Reveal>

          <Reveal delay={1}>
            {feature ? (
              <FeaturedPost post={feature} />
            ) : (
              <div className="min-h-[520px] rounded-3xl border border-purple/25 flex items-center justify-center">
                <p className="text-slate-400 text-sm">
                  {loading ? 'Loading example…' : 'No example entries yet.'}
                </p>
              </div>
            )}
          </Reveal>

          {feature && (
            <Reveal delay={2}>
              <div className="mt-8 max-w-3xl mx-auto text-center">
                <Link
                  to={`/post/${feature.slug}`}
                  className="inline-flex items-center gap-2 text-pink hover:text-aurora-blue text-xs tracking-[0.25em] uppercase font-semibold transition-colors"
                >
                  Read this entry
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* ================================================================
          4 · WHAT TO JOURNAL — three categories of trip content
          ================================================================ */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="pillars-heading"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-aurora-blue tracking-[0.35em] text-[10px] font-bold uppercase mb-4 text-center">
              What to journal
            </p>
            <h2
              id="pillars-heading"
              className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5 text-center"
            >
              The Lapland trip,{' '}
              <span className="text-pink italic">in three threads.</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto text-center mb-16 leading-relaxed">
              Browse what other travellers have logged — and pick the threads
              you'll write about on your own trip. Aurora, cabins, food, the
              cold, the people, the silences in between.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar, i) => {
              const accentColor =
                pillar.accent === 'pink'
                  ? 'text-pink'
                  : pillar.accent === 'green'
                  ? 'text-aurora-green'
                  : 'text-aurora-blue';
              const borderHover =
                pillar.accent === 'pink'
                  ? 'hover:border-pink/55'
                  : pillar.accent === 'green'
                  ? 'hover:border-aurora-green/55'
                  : 'hover:border-aurora-blue/55';
              return (
                <Reveal key={pillar.kicker} delay={(i + 1) as 1 | 2 | 3}>
                  <article
                    className={`group h-full rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm overflow-hidden transition-colors ${borderHover}`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={pillar.image.src}
                        srcSet={pillar.image.srcSet}
                        sizes={pillar.image.sizes}
                        alt={pillar.image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={800}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night-light/90 via-night-light/20 to-transparent" />
                    </div>
                    <div className="p-8">
                      <p
                        className={`text-[10px] tracking-[0.35em] uppercase font-bold mb-4 ${accentColor}`}
                      >
                        {pillar.kicker}
                      </p>
                      <h3
                        className="font-display text-2xl text-snow font-medium leading-snug mb-5"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-7">
                        {pillar.body}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {pillar.links.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className={`group/link inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold ${accentColor} hover:opacity-80 transition-opacity`}
                          >
                            {link.label}
                            <ArrowRight
                              size={12}
                              className="group-hover/link:translate-x-0.5 transition-transform"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* ================================================================
          5 · LATEST STORIES GRID
          ================================================================ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-aurora-green tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                  Example entries
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight">
                  See what a trip blog looks like.
                </h2>
              </div>
              <Link
                to="/stories"
                className="group inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-xs tracking-wider uppercase font-semibold transition-colors"
              >
                Every entry{' '}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </Reveal>

          {loading && recent.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
              <p className="mt-4">Loading stories…</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((post, i) => (
                <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* ================================================================
          6 · PERSONAL ASIDE — cream editorial band, intimate
          ================================================================ */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#1A1815]"
        aria-labelledby="aside-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-center">
            <Reveal>
              <div className="relative aspect-[3/2] md:aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8E2D6] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
                <img
                  src={asideImage.src}
                  srcSet={asideImage.srcSet}
                  sizes={asideImage.sizes}
                  alt={asideImage.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-[10px] tracking-[0.25em] uppercase font-semibold">
                    Your trip · Your blog
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div>
                <div className="inline-flex items-center gap-2 mb-5">
                  <PenLine size={16} className="text-[#C1543B]" />
                  <p className="text-[#C1543B] tracking-[0.35em] text-[10px] font-bold uppercase">
                    Why this exists
                  </p>
                </div>
                <h2
                  id="aside-heading"
                  className="font-normal text-3xl md:text-4xl leading-[1.15] mb-6 text-[#1A1815]"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Lapland is not a brochure. Your trip shouldn't be either.
                </h2>
                <div className="space-y-5 text-[#3B3935] text-base md:text-lg leading-relaxed">
                  <p>
                    Every year, thousands of visitors arrive in Lapland, see
                    something extraordinary, and lose it to a phone roll they
                    never look at again. The aurora over the cabin. The
                    fingertip-numb walk back from the sauna. The bowl of
                    salmon soup that was somehow worth €42. Gone in a week.
                  </p>
                  <p>
                    Lapland.blog is a small free tool to fix that. Pin where
                    you were. Write what you saw. Photograph the soup. By the
                    time you fly home, you have a real blog of your trip —
                    one your friends can actually follow, one you'll still
                    want to read in five years. No stock photos. No{' '}
                    <em>magical winter wonderland.</em> Just your own honest
                    version of the place.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1543B] text-white font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#8F3525] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C1543B]/40"
                  >
                    Start your own
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#C1543B]/40 text-[#C1543B] font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#C1543B]/10 transition-colors"
                  >
                    About lapland.blog
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          7 · NEWSLETTER
          ================================================================ */}
      <Newsletter />

      <Footer />
    </div>
  );
}
