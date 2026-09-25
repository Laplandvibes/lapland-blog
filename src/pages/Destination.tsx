// /destinations/:slug — yhden kohteen sivu.
//
// ── Miksi tämä sivu on olemassa (Vesa 2026-09-16) ─────────────────────────
// "nämä kohteet? ne ei juuri anna mitään lukijalle? pitäisi olla linkit että
// lue lisää kohteesta ja jonnekin sisarsivulle missä on avattu enemmän."
//
// Ennen tätä kohde oli kortti kahdella linkillä (juttuhaku + majoitus), eikä
// kohteelle ollut omaa sivua lainkaan. Verkostossa on samaan aikaan 38 sivua
// näistä kahdeksasta paikasta, ja kortit linkittivät niistä nollaan.
//
// Sivun arvo on mitattua tietoa ja oikeita polkuja eteenpäin, ei uutta
// proosaa: kohteen omat merkinnät, ja se mitä samasta paikasta on avattu
// muualla verkostossa. Linkit tulevat data/destinationLinks.ts:stä, joka on
// luettu sivustojen omista sitemapeista — puuttuva linkki jätetään pois, koska
// kuollut linkki on lukijalle pahempi kuin puuttuva.

import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, PenLine, MapPin } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { destinationBySlug, stayUrl } from '../data/destinations';
import { networkLinksFor } from '../data/destinationLinks';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function Destination() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].destination;
  const cd = COPY[lang].destinations;
  const { slug } = useParams<{ slug: string }>();
  const d = slug ? destinationBySlug(slug) : undefined;
  const { posts, loading } = usePosts();

  const paikka = d ? cd.places[d.slug as keyof typeof cd.places] : undefined;
  const alue = paikka?.region ?? d?.region ?? '';
  const kuvaus = paikka?.blurb ?? d?.blurb ?? '';

  // Kohteen merkinnät: tagi täsmää slugiin. Sama sääntö kuin listasivun laskuri.
  const omat = d ? posts.filter((p) => p.tags.some((t) => t.toLowerCase() === d.slug)) : [];
  const verkosto = d ? networkLinksFor(d.slug) : [];

  // ja/zh eivät välistä virkkeitä: täysleveän 。！？ jälkeen ei välilyöntiä.
  // Korea ja latinalaiset kielet välistävät. Sama sääntö kuin routes.json:n
  // prerender-kuvauksissa ja kanonisen prerenderin [LV-CJK-JOIN]-liitoksessa.
  const liitos = /^(ja|zh)/.test(lang) && /[。！？]$/.test(kuvaus) ? '' : ' ';

  useSeo({
    title: d ? `${d.name}` : 'Lapland.blog',
    description: d ? `${kuvaus}${liitos}${c.metaSuffix}` : '',
    image: 'https://lapland.blog/og/page-destinations.jpg',
    canonical: canonicalUrl(d ? `/destinations/${d.slug}` : '/destinations'),
  });

  useJsonLd(
    'destination',
    d
      ? breadcrumbSchema([
          { name: 'Home', url: canonicalUrl('/') },
          { name: 'Destinations', url: canonicalUrl('/destinations') },
          { name: d.name, url: canonicalUrl(`/destinations/${d.slug}`) },
        ])
      : null
  );

  if (!d) return <Navigate to="/404" replace />;

  return (
    <div className="theme-editorial min-h-screen">
      <Nav />

      {/* ── HERO: kuva + nimi ─────────────────────────────────────────── */}
      <header className="relative">
        <div className="relative h-[42vh] min-h-[280px] md:h-[52vh] overflow-hidden">
          <img
            src={d.hero}
            alt={`${d.name}, Finnish Lapland`}
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        </div>

        <div className="relative -mt-16 md:-mt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[var(--color-cream)] border border-[var(--color-paper-border)] rounded-[1.5rem] px-5 py-8 sm:px-8 md:px-12 md:py-12">
            <Link
              to={to('/destinations')}
              className="lv-tap inline-flex items-center gap-1.5 text-[var(--color-ink-mute)] hover:text-[var(--color-accent)] text-[11px] uppercase tracking-[0.25em] font-bold mb-5"
            >
              <ArrowLeft size={12} />
              {c.backToAll}
            </Link>

            <p className="text-[var(--color-ink-mute)] tracking-[0.28em] text-[10px] font-bold uppercase mb-3 flex items-center gap-1.5">
              <MapPin size={11} className="text-[var(--color-accent)]" />
              {alue}
            </p>
            <h1
              className="text-[var(--color-ink)] text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800 }}
            >
              {d.name}
            </h1>
            <p className="text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed">{kuvaus}</p>
          </div>
        </div>
      </header>

      <PageBreadcrumb editorial />

      {/* ── MUUALLA VERKOSTOSSA ───────────────────────────────────────────
          Tämä on se osio jota Vesa pyysi. Näytetään vain mitatut linkit. */}
      {verkosto.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16" aria-labelledby="dest-network">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[var(--color-accent)] tracking-[0.32em] text-[10px] font-bold uppercase mb-3">
                {c.networkEyebrow}
              </p>
              <h2
                id="dest-network"
                className="text-[var(--color-ink)] text-3xl md:text-4xl mb-3"
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
              >
                {c.networkH2}
              </h2>
              <p className="text-[var(--color-ink-soft)] text-base leading-relaxed mb-8 max-w-2xl">
                {c.networkLead}
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {verkosto.map(({ site, url }, i) => (
                <Reveal key={site.key} delay={(Math.min(i, 5) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    data-umami-event="dest_network_click"
                    data-umami-event-site={site.key}
                    className="lv-tap group flex items-center justify-between gap-3 min-h-[44px] rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] px-4 py-3.5 hover:border-[var(--color-accent)] transition-colors"
                  >
                    <span className="min-w-0">
                      <span className="block text-[var(--color-ink)] text-sm font-semibold leading-snug">
                        {c.siteLabels[site.key]}
                      </span>
                      <span className="block text-[var(--color-ink-mute)] text-[11px] truncate">
                        {site.host}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-[var(--color-ink-mute)] group-hover:text-[var(--color-accent)] transition-colors"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── KOHTEEN MERKINNÄT ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4" aria-labelledby="dest-entries">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2
              id="dest-entries"
              className="text-[var(--color-ink)] text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
            >
              {c.entriesH2}
            </h2>
          </Reveal>

          {loading ? (
            <p className="text-[var(--color-ink-mute)] text-sm">{c.loading}</p>
          ) : omat.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {omat.map((p, i) => (
                  <Reveal key={p.slug} delay={(Math.min(i, 5) + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <Link
                  to={to(`/stories?place=${d.slug}`)}
                  className="lv-tap inline-flex items-center gap-1.5 mt-8 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] text-xs uppercase tracking-[0.25em] font-bold min-h-[44px]"
                >
                  {c.allEntriesLink}
                  <ArrowRight size={12} />
                </Link>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] px-6 py-10 md:px-10 text-center">
                <PenLine size={22} className="text-[var(--color-accent)] mx-auto mb-4" />
                <h3
                  className="text-[var(--color-ink)] text-2xl mb-3"
                  style={{ fontFamily: 'var(--font-editorial)', fontWeight: 700 }}
                >
                  {c.emptyH3}
                </h3>
                <p className="text-[var(--color-ink-soft)] text-base leading-relaxed mb-7 max-w-lg mx-auto">
                  {c.emptyLead}
                </p>
                <Link
                  to={to('/signin')}
                  className="lv-tap inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent)] text-white font-semibold uppercase tracking-[0.2em] text-[11px] min-h-[44px]"
                >
                  {c.emptyCta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── MAJOITUS ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <a
              href={stayUrl(d, `destination_${d.slug}`, lang)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="lv-tap group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] px-6 py-6 md:px-8 hover:border-[var(--color-accent)] transition-colors min-h-[44px]"
            >
              <span className="flex items-center gap-3 min-w-0">
                <BedDouble size={20} className="shrink-0 text-[var(--color-accent)]" />
                <span className="min-w-0">
                  <span className="block text-[var(--color-ink)] text-base font-semibold">
                    {c.stayH3}
                  </span>
                  <span className="block text-[var(--color-ink-mute)] text-xs mt-0.5">
                    {d.name} · {c.stayNote}
                  </span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-xs uppercase tracking-[0.25em] font-bold">
                {c.stayCta}
                <ArrowRight size={12} />
              </span>
            </a>
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
