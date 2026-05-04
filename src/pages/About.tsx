import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';

export default function About() {
  useSeo({
    title: 'About — Lapland.blog',
    description:
      "Lapland.blog is a free travel-journal platform for visitors to Finnish Lapland. Pin places, write entries, share to friends. Your trip, told well.",
    canonical: canonicalUrl('/about'),
  });

  useJsonLd('website', websiteSchema());
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
            src="/images/aside-vesa-1200.webp"
            alt="A tiny figure with a headlamp standing under a giant aurora arc over Lapland tundra"
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
                About the platform
              </p>
              <h1
                className="text-[var(--color-ink)] font-normal leading-[1.05] tracking-[-0.01em] text-[clamp(2.25rem,6vw,4.5rem)] mb-8"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                A travel journal worth keeping.
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed">
                Lapland.blog is a free travel-journal platform for visitors to
                Finnish Lapland. Pin where you saw the aurora. Photograph the
                cabin. Write what the temperature did. By the time you fly home
                you have a beautiful blog of your trip — one your friends can
                actually follow, and one you'll still want to read in five years.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="divider-editorial max-w-3xl mx-auto mb-12" />

      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="prose-editorial">
          <p>
            Most Lapland blogs read like a brochure. Most travel-journal apps
            either get abandoned in a phone roll or get shared as a single
            Instagram post that disappears in a day. Lapland.blog is the
            in-between thing: a real, slow, photo-led blog of your trip,
            hosted under a name that already gets traffic, kept for as long as
            you want it kept.
          </p>

          <h2>How it works</h2>
          <p>
            Sign in with your email or Google. Get a corner of lapland.blog at
            <em> lapland.blog/me</em>. Each entry takes a hero image, a place
            pin, and the words you want to say. Save drafts, publish when
            ready, share the link to friends. Every published entry is indexed
            and searchable — your trip becomes a small piece of the bigger
            Lapland archive.
          </p>

          <h2>What's free</h2>
          <p>
            Writing entries. Hosting your own travel blog under
            <em> lapland.blog/me/yourname</em>. Photos. The newsletter. There
            is no paywall and no premium tier on the writer side.
          </p>

          <h2>What you won't find</h2>
          <p>
            Sponsored posts inside reader entries. Affiliate shopping lists
            stuffed into your blog. The words <em>unforgettable</em>,
            <em> bucket list</em>, <em>magical</em>, or <em>winter
            wonderland</em> — they're banned from the editorial drafts and
            we'd encourage you to ban them from yours too. They're bad for
            writing and bad for readers.
          </p>

          <h2>The seed entries</h2>
          <p>
            The five entries already on the site are written by{' '}
            <em>The Field Journal</em>, the editorial voice of Lapland.blog.
            They're there to show what an honest, slow, photo-led trip blog
            can read like — real temperatures, real times of day, no
            brochure voice. Read one and picture your own.
          </p>

          <h2>About the network</h2>
          <p>
            Lapland.blog is part of the LaplandVibes ecosystem — a network of
            Finnish-owned sites about Lapland. The other sites tell you
            <em> where</em> to go, <em>where</em> to stay, and <em>what</em>{' '}
            to do. This one is where the trip itself gets written down.
          </p>

          <h2>Get in touch</h2>
          <p>
            If you want to say hello, correct a factual error, or send a
            photograph we can credit, email{' '}
            <a href="mailto:info@lapland.blog">info@lapland.blog</a>. We read
            everything and try to answer within a week.
          </p>

          <hr />

          <p>
            Written from Finnish Lapland, at the temperature and the hour it
            actually happened.
          </p>
        </div>

        <div className="max-w-[65ch] mx-auto text-center mt-12">
          <Link
            to="/signin"
            className="inline-block px-7 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Start your own journal →
          </Link>
          <p className="text-[var(--color-ink-mute)] text-sm mt-4">
            Or{' '}
            <Link to="/stories" className="text-[var(--color-accent)] underline">
              read the seed entries first
            </Link>
            .
          </p>
        </div>
      </main>

      <div className="bg-night text-snow">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
