import { Link } from 'react-router-dom';
import { MapPin, PenLine, Share2, Check, X } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function About() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].about;

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
    image: 'https://lapland.blog/og/page-about.jpg',
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

      <header className="relative pt-16">
        <div className="relative h-[58vh] min-h-[420px] max-h-[620px] overflow-hidden bg-[var(--color-cream-deep)]">
          <picture>
            <source srcSet="/images/aside-vesa-1200.avif" type="image/avif" />
            <source srcSet="/images/aside-vesa-1200.webp" type="image/webp" />
            <img
              src="/images/aside-vesa-1200.webp"
              alt="A lone figure with a headlamp standing under a vast green aurora arc over Lapland tundra"
              className="absolute inset-0 w-full h-full object-cover object-[50%_38%]"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1080}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/35" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 -mt-28 md:-mt-36 mb-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-cream)] rounded-[1.25rem] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.55)] border border-[var(--color-paper-border)] px-6 py-10 md:px-14 md:py-14">
              <p className="text-[var(--color-accent)] text-[11px] uppercase tracking-[0.32em] font-bold mb-5">
                {c.eyebrow}
              </p>
              <h1
                className="text-[var(--color-ink)] leading-[1.04] tracking-[-0.015em] text-[clamp(2.25rem,6vw,4.25rem)] mb-7"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}
              >
                {c.h1}
              </h1>
              <p className="text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed">
                {c.lead}
              </p>
            </div>
          </div>
        </div>
      </header>

      <PageBreadcrumb editorial />

      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        {/* Intro */}
        <div className="prose-editorial">
          <p>{c.intro}</p>
        </div>

        {/* How it works — three visual steps */}
        <section className="max-w-5xl mx-auto mt-14 mb-4">
          <h2
            className="text-[var(--color-ink)] text-2xl md:text-3xl mb-8 text-center"
            style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
          >
            {c.howHeading}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { Icon: MapPin, label: '01' },
              { Icon: PenLine, label: '02' },
              { Icon: Share2, label: '03' },
            ].map((step, i) => (
              <div
                key={step.label}
                className="rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream)] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25 flex items-center justify-center">
                    <step.Icon size={18} className="text-[var(--color-accent)]" />
                  </span>
                  <span className="text-[var(--color-ink-mute)] text-xs font-bold tracking-[0.3em]">
                    {step.label}
                  </span>
                </div>
                <p className="text-[var(--color-ink-soft)] text-[0.95rem] leading-relaxed">
                  {i === 0 ? c.howStepPin : i === 1 ? c.howStepWrite : c.howStepShare}
                </p>
              </div>
            ))}
          </div>
          <div className="prose-editorial mt-8">
            <p>{c.howBody}</p>
          </div>
        </section>

        {/* What's free / What you won't find — two-column contrast panel */}
        <section className="max-w-5xl mx-auto mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-cream)] p-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[var(--color-accent)]/12 flex items-center justify-center">
                <Check size={16} className="text-[var(--color-accent)]" />
              </span>
              <h3
                className="text-[var(--color-ink)] text-xl"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
              >
                {c.freeHeading}
              </h3>
            </div>
            <p className="text-[var(--color-ink-soft)] text-[0.95rem] leading-relaxed">{c.freeBody}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] p-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[var(--color-ink-mute)]/15 flex items-center justify-center">
                <X size={16} className="text-[var(--color-ink-mute)]" />
              </span>
              <h3
                className="text-[var(--color-ink)] text-xl"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
              >
                {c.notHeading}
              </h3>
            </div>
            <p className="text-[var(--color-ink-soft)] text-[0.95rem] leading-relaxed">{c.notBody}</p>
          </div>
        </section>

        {/* The seed entries — highlighted editorial callout */}
        <section className="max-w-3xl mx-auto mt-10">
          <div className="rounded-2xl border-l-4 border-[var(--color-accent)] bg-[var(--color-cream-deep)] px-6 py-7 md:px-8">
            <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-[0.32em] font-bold mb-3">
              {c.seedHeading}
            </p>
            <p className="text-[var(--color-ink-soft)] text-[1.05rem] leading-relaxed">{c.seedBody}</p>
          </div>
        </section>

        {/* Network + contact — back to prose */}
        <div className="prose-editorial mt-12">
          <h2>{c.networkHeading}</h2>
          <p>{c.networkBody}</p>
          <h2>{c.contactHeading}</h2>
          <p>{c.contactBody}</p>
          <hr />
          <p>{c.closing}</p>
        </div>

        <div className="max-w-[65ch] mx-auto text-center mt-12">
          <Link
            to={to('/signin')}
            className="inline-block px-7 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-semibold uppercase tracking-wider text-xs hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            {c.ctaPrimary}
          </Link>
          <p className="text-[var(--color-ink-mute)] text-sm mt-4">
            {c.ctaSecondary}{' '}
            <Link to={to('/stories')} className="text-[var(--color-accent)] underline">
              {c.ctaSecondaryLink}
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
