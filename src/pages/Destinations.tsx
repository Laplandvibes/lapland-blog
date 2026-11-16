// /destinations — geographic discovery for the Lapland trip blog.
// 30+ traveller arrives knowing where she's going (or wants to choose).
// Show the 8 main Lapland destinations with entry counts. Empty cells are
// "be first to write here" — converts visitors into UGC writers.

import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BedDouble } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { usePosts } from '../hooks/usePosts';
import { DESTINATIONS, placeName, stayUrl, postMatchesDestination, type Destination } from '../data/destinations';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import type { Post } from '../data/posts';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { postTextLang } from '../lib/postLang';
import PhotoCredits from '../components/PhotoCredits';


function postsFor(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => postMatchesDestination(p.tags, slug));
}

export default function Destinations() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].destinations;
  const { posts } = usePosts();

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
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
    <div className="theme-editorial theme-night min-h-screen">
      <Nav />

      {/* HERO — kuva + otsikko suoraan sen paalle. Aiempi versio nosti otsikon
          erilliseen kerman variseen laatikkoon kuvan alareunan yli (Vesa 2026-09-15:
          "miksi tuo h1 tällä sivulla on laatikossa?"); muilla sivuilla otsikko on
          kuvan paalla, joten sivut nayttivat eri sivustoilta. */}
      <header className="lv-night relative pt-16">
        <div className="relative min-h-[58vh] md:min-h-[64vh] flex items-center overflow-hidden">
          <picture>
            <source srcSet="/images/hero-aurora-winter-1200.webp 1200w, /images/hero-aurora-winter-1920.webp 1920w, /images/hero-aurora-winter-2560.webp 2560w" sizes="100vw" type="image/webp" />
            <img
              src="/images/hero-aurora-winter-1200.webp"
              alt={COPY[lang].images.auroraPinesAlt}
              className="absolute inset-0 w-full h-full object-cover object-[50%_45%]"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={800}
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.62) 45%, rgba(15,23,42,0.35) 100%)' }}
          />
          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 text-white text-sm font-bold mb-5">
                <MapPin size={13} /> {c.eyebrow}
              </p>
              <h1
                className="text-snow leading-[1.04] tracking-[-0.015em] text-[clamp(2.25rem,5.5vw,3.75rem)] mb-5 hero-text-shadow"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}
              >
                {c.h1Pre} <span className="text-pink">{c.h1Italic}</span>
              </h1>
              <p className="text-slate-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto max-lg:w-fit max-lg:text-left hero-text-shadow-sm">
                {c.lead}
              </p>
            </div>
          </div>
        </div>
      </header>

      <PageBreadcrumb editorial />

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="dest-grid">
        <h2 id="dest-grid" className="sr-only">{COPY[lang].destination.backToAll}</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {DESTINATIONS.map((d, i) => {
            const own = postsFor(posts, d.slug);
            return (
              <Reveal key={d.slug} delay={(Math.min(i, 5) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                <DestinationCard d={d} own={own} c={c} to={to} lang={lang} />
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
              <p className="text-[var(--color-accent)] text-sm font-bold mb-4">
                {c.dontSeeEyebrow}
              </p>
              <h2
                className="text-[var(--color-ink)] text-3xl md:text-4xl mb-4"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
              >
                {c.plantH2}
              </h2>
              <p className="text-[var(--color-ink-soft)] text-base leading-relaxed mb-8 max-w-xl mx-auto max-lg:w-fit max-lg:text-left">
                {c.plantLead}
              </p>
              <Link
                to={to('/signin')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pink-cta text-white font-semibold text-sm hover:bg-pink transition-colors"
              >
                {c.plantCta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-night text-snow">
        <PhotoCredits srcs={['/images/hero-aurora-winter-1200.webp', ...DESTINATIONS.map((d) => d.hero)]} />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}

type DestCopy = typeof COPY['en']['destinations'];
type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
/**
 * Kohdekortti (Vesa 16.11.2026: "mikä tämän funktio on? en itsekkään tajua, miten asiakas voisi tajuta?").
 * Funktio sanottuna kortissa itsessään: paikan kuva ja kuvaus, paikan oikeat jutut otsikkoina ja kaksi
 * nappia: paikan sivu (jutut + verkoston oppaat) ja majoitukset. Ei "ole ensimmäinen kirjoittaja" -kehotteita.
 */
function DestinationCard({ d, own, c, to, lang }: { d: Destination; own: Post[]; c: DestCopy; to: (p: string) => string; lang: Lang }) {
  const name = placeName(d, lang);
  const meta = c.places[d.slug as keyof DestCopy['places']];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#0F172A]/10 bg-white shadow-[0_14px_34px_-24px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-26px_rgba(15,23,42,0.4)]">
      <Link to={to(`/destinations/${d.slug}`)} className="block aspect-[3/2] overflow-hidden relative" tabIndex={-1} aria-hidden="true">
        <img
          src={d.hero}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {own.length > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-[#BE185D] shadow-sm">
            {own.length} {own.length === 1 ? c.entrySingular : c.entryPlural}
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[#BE185D] text-sm font-semibold mb-1">{meta?.region ?? d.region}</p>
        <h3 className="text-2xl text-[#0F172A] mb-2 leading-tight" style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}>
          <Link to={to(`/destinations/${d.slug}`)} className="hover:text-[#BE185D] transition-colors">
            {name}
          </Link>
        </h3>
        <p className="text-[#334155] text-base leading-relaxed mb-4">{meta?.blurb ?? d.blurb}</p>
        {own.length > 0 && (
          <ul className="mb-5 grid gap-2">
            {own.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link
                  to={to(`/post/${p.slug}`)}
                  lang={postTextLang(p, lang)}
                  className="flex items-start gap-2 rounded-xl bg-[#F4F7FB] px-3 py-2.5 text-[15px] font-semibold leading-snug text-[#0F172A] hover:bg-[#FDF2F8] hover:text-[#BE185D] transition-colors"
                >
                  <ArrowRight size={15} className="mt-1 shrink-0 text-[#DB2777]" />
                  <span>{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto grid gap-2.5">
          <Link
            to={to(`/destinations/${d.slug}`)}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#DB2777] px-4 text-[15px] font-semibold text-white hover:bg-[#BE185D] transition-colors"
          >
            {c.openPlace}
          </Link>
          <a
            href={stayUrl(d, `destinations_${d.slug}`, lang)}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-[#0F172A]/15 px-4 text-[15px] font-semibold text-[#0F172A] hover:border-[#DB2777] hover:text-[#BE185D] transition-colors"
          >
            <BedDouble size={16} />
            {c.stayButton}
          </a>
        </div>
      </div>
    </article>
  );
}
