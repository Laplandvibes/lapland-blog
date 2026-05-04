// /start-here — the welcoming front door for new visitors.
// 30+ traveller lands here from Google or social and needs to figure out:
// (a) what is this site, (b) where do I start, (c) is this for me.
// Three clear paths: planning a trip, writing a trip, just reading.

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, MapPinned, PenLine, BedDouble, Plane, Compass, Utensils } from 'lucide-react';
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
              kicker="01 · Planning"
              title="I'm planning a trip to Lapland."
              body="Where to stay, how to get there, what to do, where to eat — the practical side. Jump into the LaplandVibes sister sites that handle the bookings."
              cta="Plan your trip"
              to="#plan-your-trip"
              Icon={Compass}
              isAnchor
            />
          </Reveal>
          <Reveal delay={1}>
            <PathCard
              accent="aurora-blue"
              kicker="02 · Reading"
              title="I want to read what others wrote."
              body="Curated seed entries from inside Finland: cabin packing, the salmon-soup night, the aurora over Kemi. Real temperatures, real time of day, no brochure voice."
              cta="Top reads"
              to="/top-reads"
              Icon={BookOpenText}
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

      {/* ================================================================
          PLAN YOUR TRIP — sister-site cross-sell hub.
          Path 01 anchors here. Each card links out to a LaplandVibes spoke
          where the actual booking / sales happens. This is the
          monetisation seam — see project_lv_monetisation_doctrine.md.
          ================================================================ */}
      <section
        id="plan-your-trip"
        aria-labelledby="plan-heading"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-night to-night-light/40 scroll-mt-20"
      >
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-pink/10 blur-[140px] pointer-events-none animate-soft-float" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-night/70 border border-pink/40">
                <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
                <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                  Plan your trip
                </p>
              </div>
              <h2
                id="plan-heading"
                className="font-display text-3xl md:text-5xl font-light tracking-tight text-snow mb-4"
              >
                The practical side, on the sister sites.
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Lapland.blog is the journal. The booking happens on the
                LaplandVibes spokes — each one focused on one thing it does
                well.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Reveal delay={1}>
              <PlanCard
                Icon={BedDouble}
                kicker="Stay"
                title="Cabins, igloos, hotels"
                body="Compare 1,200+ Lapland stays — glass igloos, log cabins, ski resorts."
                href="https://laplandstays.com"
                cta="laplandstays.com"
                rel="noopener"
              />
            </Reveal>
            <Reveal delay={2}>
              <PlanCard
                Icon={Plane}
                kicker="Get there"
                title="Flights, trains, buses"
                body="Helsinki → Rovaniemi/Kittilä/Ivalo — flights, night trains, the practical routes."
                href="https://laplandtransport.com"
                cta="laplandtransport.com"
                rel="noopener"
              />
            </Reveal>
            <Reveal delay={3}>
              <PlanCard
                Icon={MapPinned}
                kicker="Do"
                title="Husky, snowmobile, sauna"
                body="Bookable activities from the actual operators, with reviews — not a press release."
                href="https://laplandactivities.online"
                cta="laplandactivities.online"
                rel="noopener"
              />
            </Reveal>
            <Reveal delay={4}>
              <PlanCard
                Icon={Utensils}
                kicker="Eat"
                title="Food + drink"
                body="Where to actually eat — the salmon soup, the rye, the bars that have seen better decades."
                href="https://laplanddining.com"
                cta="laplanddining.com"
                rel="noopener"
              />
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://laplandvibes.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-aurora-blue hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
            >
              Or browse all 21+ sites at laplandvibes.com
              <ArrowRight size={14} />
            </a>
          </div>
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
  isAnchor?: boolean;
}

function PathCard({ kicker, title, body, cta, to, accent, Icon, isAnchor }: PathCardProps) {
  const accentText =
    accent === 'pink' ? 'text-pink' : accent === 'aurora-blue' ? 'text-aurora-blue' : 'text-aurora-green';
  const accentBorder =
    accent === 'pink'
      ? 'hover:border-pink/55'
      : accent === 'aurora-blue'
        ? 'hover:border-aurora-blue/55'
        : 'hover:border-aurora-green/55';
  const inner = (
    <>
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
    </>
  );
  const cls = `group block h-full rounded-2xl border border-purple/25 bg-night-light/40 p-7 transition-all duration-300 hover:bg-night-light/60 hover:-translate-y-1 ${accentBorder}`;
  if (isAnchor) {
    return (
      <a href={to} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}

interface PlanCardProps {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  rel?: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function PlanCard({ kicker, title, body, href, cta, rel, Icon }: PlanCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel={rel ?? 'noopener'}
      className="group block h-full rounded-2xl border border-purple/25 bg-night-light/50 p-6 transition-all duration-300 hover:bg-night-light/70 hover:-translate-y-1 hover:border-pink/55"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-pink" />
        <p className="text-pink tracking-[0.3em] text-[10px] font-bold uppercase">
          {kicker}
        </p>
      </div>
      <h3 className="font-display text-xl text-snow mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-5">{body}</p>
      <span className="inline-flex items-center gap-1.5 text-aurora-blue group-hover:text-pink text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors">
        {cta}
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}
