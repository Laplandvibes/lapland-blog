// /top-reads — curated editorial lists.
// What women landing on Lapland.blog actually look for: "where do I start",
// "best aurora pieces", "best food entries". Static curation for now;
// when traffic data exists, swap in real most-read sort.

import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Snowflake, Utensils, Mountain } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import FeaturedPost from '../components/FeaturedPost';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';

export default function TopReads() {
  const { posts } = usePosts();

  useSeo({
    title: 'Top reads — Lapland.blog',
    description:
      "Where to start on Lapland.blog. Curated lists: best entries for first-timers, best aurora pieces, best food entries, the seasonal ones. Picked by the editor.",
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
    .filter(Boolean);
  const aurora = posts.filter((p) => p.tags.includes('aurora'));
  const food = posts.filter((p) => p.category === 'food' || p.tags.includes('food'));
  const seasonal = posts.filter((p) => p.category === 'seasons' || p.tags.includes('seasons') || p.tags.includes('kaamos') || p.tags.includes('polar-night'));
  const cabins = posts.filter((p) => p.category === 'cabins' || p.tags.includes('cabins') || p.tags.includes('mokki'));

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/25 to-night" />
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-pink/15 blur-[140px] pointer-events-none animate-hero-pulse" />
        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night/70 border border-pink/40">
              <Sparkles size={12} className="text-pink" />
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                Editor's curated lists
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05] tracking-tight text-snow mb-6">
              Top reads.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Where to start. Curated by the editor, not by clicks. As more
              field-journal entries ship, these lists grow.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 mb-16" />

      {/* If you only read one */}
      {editorsTop && (
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-2">
                If you only read one
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-2">
                The editor's #1.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-10 max-w-2xl">
                Aurora over the Bay of Bothnia, minus twenty-three at 3:47 AM,
                and the photo none of us got. The piece that defines the
                Lapland.blog voice.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <FeaturedPost post={editorsTop} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Best for first-timers */}
      {firstTimer.length > 0 && (
        <ListSection
          eyebrow="For first-timers"
          title="Best three to read before you go."
          subtitle="Why people get aurora wrong, what to pack for a cabin, and why the polar dark is fine actually. Read these and you'll arrive less surprised."
          posts={firstTimer.filter((p): p is NonNullable<typeof p> => Boolean(p))}
          Icon={Mountain}
        />
      )}

      {/* Aurora collection */}
      {aurora.length > 0 && (
        <ListSection
          eyebrow="Aurora pieces"
          title="The night-sky entries."
          subtitle="On chasing it, photographing it, and the nights it shows up anyway."
          posts={aurora}
          Icon={Sparkles}
        />
      )}

      {/* Cabins */}
      {cabins.length > 0 && (
        <ListSection
          eyebrow="The cabins"
          title="Mökki entries."
          subtitle="What it's actually like in a Finnish forest cabin: fire, sauna, silence, the bit nobody mentions about the outhouse at minus thirty."
          posts={cabins}
          Icon={Snowflake}
        />
      )}

      {/* Food */}
      {food.length > 0 && (
        <ListSection
          eyebrow="Food + drink"
          title="The kitchen pieces."
          subtitle="Forty-two-euro salmon soup, rye bread that survives a backpack, and the coffee you drink at 2 AM because the sun forgot to set."
          posts={food}
          Icon={Utensils}
        />
      )}

      {/* Seasonal */}
      {seasonal.length > 0 && (
        <ListSection
          eyebrow="Seasonal"
          title="What the cold actually does."
          subtitle="Kaamos, the eight Lapland seasons most lists forget, and the small business of getting through December without the sun."
          posts={seasonal}
          Icon={Snowflake}
        />
      )}

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-aurora-blue tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              Your trip next?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-4">
              Be the next entry on this page.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              The lists above grow when readers write. Sign in, write a few
              entries, and the editor will feature the ones that earn it.
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

interface ListSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  posts: { slug: string; title: string; excerpt: string; heroImage: string; readTimeMinutes: number; publishedAt: string; tags: string[]; category: string; kicker: string; heroAlt: string }[];
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function ListSection({ eyebrow, title, subtitle, posts, Icon }: ListSectionProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-3">
            <Icon size={14} className="text-pink" />
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-3">
            {title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-10 max-w-2xl">
            {subtitle}
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}>
              <PostCard post={p as never} variant="dark" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
