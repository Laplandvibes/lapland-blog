import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import AuthorBio from '../components/AuthorBio';
import { vesa } from '../data/author';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, personSchema, breadcrumbSchema } from '../lib/jsonld';

export default function About() {
  useSeo({
    title: 'About — Lapland.blog',
    description:
      "Who writes Lapland.blog, why it exists, and what you'll (and won't) find on it. Written by Vesa Pesola from Finland.",
    canonical: canonicalUrl('/about'),
  });

  useJsonLd('person', personSchema());
  useJsonLd(
    'about',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'About', url: canonicalUrl('/about') },
    ])
  );

  return (
    <div className="theme-editorial min-h-screen">
      <Nav />

      {/* ================================================================
          HERO — full-bleed contemplative wilderness photo
          ================================================================ */}
      <header className="relative pt-16">
        <div className="relative h-[60vh] min-h-[420px] max-h-[640px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1513688544456-c1a3b695728a?w=1920&q=85&fm=webp&fit=crop"
            alt="A solitary figure standing among tall snow-laden trees in a Finnish winter wilderness"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/40" />
        </div>

        {/* Title card overlapping the hero */}
        <div className="relative px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-cream)] rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] border border-[var(--color-paper-border)] px-6 py-10 md:px-14 md:py-14">
              <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-[0.35em] font-bold mb-5">
                About the blog
              </p>
              <h1
                className="text-[var(--color-ink)] font-normal leading-[1.05] tracking-[-0.01em] text-[clamp(2.25rem,6vw,4.5rem)] mb-8"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Why this blog exists.
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed">
                There are a lot of Lapland articles on the internet. Most of
                them were written by people who have never been here in
                February, or only been here for three days on a press trip.
                This one is written from Finland, by someone who actually lives
                with the weather.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="divider-editorial max-w-3xl mx-auto mb-12" />

      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="prose-editorial">
          <p>
            {vesa.longBio}
          </p>

          <h2>What you'll find here</h2>
          <p>
            Slow pieces about Lapland life — the trips, the cabins, the cold,
            the food, the saunas, the weather, the silences in between. I try
            to include at least one real temperature, one real time of day,
            and one small embarrassment in every post. Those are the details
            that age well.
          </p>

          <h2>What you won't find</h2>
          <p>
            Sponsored posts. Affiliate shopping lists. The words{' '}
            <em>unforgettable</em>, <em>bucket list</em>, <em>magical</em>, or{' '}
            <em>winter wonderland</em>. I've banned them from my own drafts.
            They're bad for writing and bad for readers.
          </p>

          <h2>About the newsletter</h2>
          <p>
            One email when a new post drops. No weekly roundups, no sponsor
            plugs, no "top 10 Arctic hotels" listicles. The sign-up is on every
            page of this site — including the bottom of this one. If you read
            the blog and want the next one, that's the whole pitch.
          </p>

          <h2>About the network</h2>
          <p>
            Lapland.blog is part of the LaplandVibes ecosystem — a small
            network of Finnish-owned sites about Lapland. The other sites tell
            you <em>where</em> to go, <em>where</em> to stay, and <em>what</em>{' '}
            to do. This one tells you what it was actually like. If you want
            the practical side of a trip, the sister sites in the footer are
            where to go. This blog is where to come back to after.
          </p>

          <h2>Get in touch</h2>
          <p>
            If you want to say hello, correct a factual error, or send a
            photograph I can credit, you can email{' '}
            <a href="mailto:laplandvibe@gmail.com">laplandvibe@gmail.com</a>.
            I read everything and I try to answer within a week, unless I'm in
            a cabin with no wifi, which happens more than you'd think.
          </p>

          <hr />

          <p>
            Written from Finnish Lapland, at the temperature and the hour it
            actually happened.
          </p>
        </div>

        <AuthorBio variant="editorial" />

        <div className="max-w-[65ch] mx-auto text-center">
          <Link
            to="/stories"
            className="inline-block mt-4 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Start reading the stories →
          </Link>
        </div>
      </main>

      <div className="bg-night text-snow">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
