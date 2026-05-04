// /start-here — the welcoming front door for new visitors.
// 30+ traveller lands here from Google or social and needs to figure out:
// (a) what is this site, (b) where do I start, (c) is this for me.
// Three clear paths: planning a trip, writing a trip, just reading.

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, MapPinned, PenLine } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';

export default function StartHere() {
  const { posts } = usePosts({ limit: 4 });
  const intro = posts[0];
  const more = posts.slice(1, 4);

  useSeo({
    title: 'Start here — Lapland.blog',
    description:
      "New to Lapland.blog? Three paths in: read the seed entries, find your destination, or write your own trip. Made for visitors going to Finnish Lapland.",
    canonical: canonicalUrl('/start-here'),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd(
    'starthere-breadcrumb',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'Start here', url: canonicalUrl('/start-here') },
    ])
  );

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-pink/15 blur-[140px] animate-hero-pulse pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-night/70 border border-pink/40">
              <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                Welcome
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight text-snow mb-6">
              Hi. Three ways in.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Lapland.blog is a free, slow, photo-led travel-journal site for
              people who actually go to Finnish Lapland. Whether you're
              planning a trip, in the middle of one, or back home wishing you'd
              written it down — pick your path.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three paths */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20" aria-labelledby="paths-heading">
        <h2 id="paths-heading" className="sr-only">Choose your path</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <PathCard
              accent="pink"
              kicker="01 · Reading"
              title="I'm planning a trip to Lapland."
              body="Read the seed entries — the one about cabin packing, the salmon-soup story, the night the sky broke open. They're written from inside Finland, not from a brochure."
              cta="Top reads"
              to="/top-reads"
              Icon={BookOpenText}
            />
          </Reveal>
          <Reveal delay={1}>
            <PathCard
              accent="aurora-blue"
              kicker="02 · Place"
              title="I know where I'm going."
              body="Saariselkä, Rovaniemi, Levi, Kemi — pick the place you'll be and read the entries already written from there. Or be the first to write one."
              cta="Browse destinations"
              to="/destinations"
              Icon={MapPinned}
            />
          </Reveal>
          <Reveal delay={2}>
            <PathCard
              accent="aurora-green"
              kicker="03 · Writing"
              title="I'm here. I want a blog of my trip."
              body="Sign in with email or Google. Get a corner of lapland.blog. Pin places, write entries, share to friends. Free, no catches, no premium tier."
              cta="Start your blog"
              to="/signin"
              Icon={PenLine}
            />
          </Reveal>
        </div>
      </section>

      {/* If you only read one… */}
      {intro && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                If you only read one
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-2">
                Read this one.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-2xl">
                The newest field-journal entry. Real temperature, real time of
                day, no brochure voice.
              </p>
              <PostCard post={intro} variant="dark" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Then these */}
      {more.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                Then these
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-10">
                More from the field.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6}>
                  <PostCard post={p} variant="dark" />
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 text-pink hover:text-aurora-blue text-xs tracking-[0.25em] uppercase font-semibold transition-colors"
              >
                Every entry
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}

interface PathCardProps {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  accent: 'pink' | 'aurora-blue' | 'aurora-green';
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function PathCard({ kicker, title, body, cta, to, accent, Icon }: PathCardProps) {
  const accentText =
    accent === 'pink' ? 'text-pink' : accent === 'aurora-blue' ? 'text-aurora-blue' : 'text-aurora-green';
  const accentBorder =
    accent === 'pink'
      ? 'hover:border-pink/55'
      : accent === 'aurora-blue'
        ? 'hover:border-aurora-blue/55'
        : 'hover:border-aurora-green/55';
  return (
    <Link
      to={to}
      className={`group block h-full rounded-2xl border border-purple/25 bg-night-light/40 p-7 transition-all duration-300 hover:bg-night-light/60 hover:-translate-y-1 ${accentBorder}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <Icon size={20} className={accentText} />
        <p className={`tracking-[0.3em] text-[10px] font-bold uppercase ${accentText}`}>
          {kicker}
        </p>
      </div>
      <h3 className="font-display text-2xl text-snow mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">{body}</p>
      <span
        className={`inline-flex items-center gap-1.5 ${accentText} text-xs uppercase tracking-[0.2em] font-semibold`}
      >
        {cta}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
