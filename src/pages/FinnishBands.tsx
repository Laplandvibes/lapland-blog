// /finnish-bands — "Did you know these are Finnish?": 15 Finnish acts, one official YouTube song each.
//
// Vesa 2026-10-25 approved the list and asked for a page "jonne upotettaisiin yksi YouTube biisi joka
// bändiltä". Lives on lapland.blog to bring readers there (same reason as /fan-league, which links
// both ways).
//
// 🔴 Nothing from Google loads before the reader presses play: the preview is an own LaplandVibes
//    photo (never a YouTube thumbnail, never a band photo) and the iframe is created on click, from
//    youtube-nocookie.com. The click is measured with data-umami-event (06-mittaus: link-like CTA).
// 🔴 Band names and song titles are never translated; numbers and dates come from Intl in the
//    reader's language, and every number carries its reading date (src/data/finnishBands.ts).

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageBreadcrumb from '../components/PageBreadcrumb';
import ShareBar from '../components/ShareBar';
import { ShareButton } from '../shared/ShareBar/ShareBar';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath, LANG_PREFIX, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { fillCopy } from '../lib/copyTemplate';
import { BANDS, HERO, SPOTIFY_READ, YOUTUBE_READ, type Band } from '../data/finnishBands';

const IMG = '/images/finnish-bands';
const PATH = '/finnish-bands';

const utc = (ymd: string) => { const [y, m, d] = ymd.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
const fullDate = (lang: Lang, ymd: string) =>
  new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(utc(ymd));
const compact = (lang: Lang, n: number) =>
  new Intl.NumberFormat(lang, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
/** The hub uses the same language prefixes as the blog (checked live 25.10.2026, 12/12 × 2 towns). */
const hubUrl = (lang: Lang, href: string) => {
  const p = LANG_PREFIX[lang];
  return p ? href.replace('laplandvibes.com/', `laplandvibes.com/${p}/`) : href;
};

function Player({ band, lang }: { band: Band; lang: Lang }) {
  const c = COPY[lang].finnishBands;
  const b = c.bands[band.id];
  const [on, setOn] = useState(false);
  const label = fillCopy(c.play, { song: band.song });
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-night-light">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${band.videoId}?autoplay=1&rel=0`}
          title={`${band.name}: ${band.song}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          data-umami-event="band_play"
          data-umami-event-band={band.id}
          aria-label={`${label} (${band.name})`}
          className="lv-tap group absolute inset-0 block h-full w-full text-left"
        >
          <img
            src={`${IMG}/${band.photo}-1280.webp`}
            srcSet={`${IMG}/${band.photo}-640.webp 640w, ${IMG}/${band.photo}-1280.webp 1280w`}
            sizes="(min-width: 1024px) 640px, 100vw"
            width={1280}
            height={720}
            alt={b.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
          {/* Darkening only under the text strip (feedback_image_overlay_only_under_text). */}
          <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" aria-hidden="true" />
          <span className="absolute left-4 right-4 bottom-4 flex items-center gap-3">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pink-cta text-white shadow-lg transition-transform duration-200 ease-out group-hover:scale-105">
              <Play size={26} className="translate-x-[2px]" fill="currentColor" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-slate-200">{c.playShort}</span>
              <span className="block font-display font-extrabold text-lg sm:text-xl text-white leading-tight truncate" translate="no">{band.song}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function FinnishBands() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].finnishBands;

  useSeo({ title: c.metaTitle, description: c.metaDescription, canonical: canonicalUrl(PATH) });
  useJsonLd('website', websiteSchema());
  useJsonLd(
    'finnishbands-breadcrumb',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: c.breadcrumb, url: canonicalUrl(PATH) },
    ])
  );
  useJsonLd('finnishbands-list', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.h1,
    numberOfItems: BANDS.length,
    itemListElement: BANDS.map((band, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MusicRecording',
        name: band.song,
        byArtist: { '@type': 'MusicGroup', name: band.name },
        url: `https://www.youtube.com/watch?v=${band.videoId}`,
      },
    })),
  });

  const ytDate = fullDate(lang, YOUTUBE_READ);
  const spDate = fullDate(lang, SPOTIFY_READ);
  const h2 = 'font-display font-extrabold text-snow text-[clamp(1.75rem,3.6vw,2.4rem)] leading-tight tracking-tight';

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center lg:text-left">
          <p className="text-pink-300 font-bold text-sm tracking-[0.18em] uppercase">{c.kicker}</p>
          <h1 className="font-display font-extrabold text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.04] tracking-tight mt-4 mb-5 text-balance">
            {c.h1}
          </h1>
          {/* Below 1024 px only headings, kickers and buttons are centred; running text stays left (Vesa 18.10.). */}
          <p className="text-left text-slate-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto lg:mx-0 text-pretty">{c.lead}</p>
          {/* Share at the top and at the end (feedback_artikkelissa_jakonappi): canonical ShareButton here, the blog's ShareBar at the end, as on posts. */}
          <div className="flex justify-center lg:justify-start">
            <ShareButton lang={lang} title={c.h1} excerpt={c.lead} tone="dark" className="mt-6" />
          </div>
        </div>
        <figure className="max-w-6xl mx-auto mt-10">
          <img
            src={`${IMG}/${HERO.stem}-1600.webp`}
            srcSet={`${IMG}/${HERO.stem}-960.webp 960w, ${IMG}/${HERO.stem}-1600.webp 1600w, ${IMG}/${HERO.stem}-2400.webp 2400w`}
            sizes="(min-width: 1152px) 1152px, 100vw"
            width={1600}
            height={900}
            alt={c.photoAlt}
            fetchPriority="high"
            className="w-full h-auto rounded-xl bg-night-light"
          />
          <figcaption className="mt-3 text-sm text-slate-400 leading-relaxed">
            {c.photoCaption} <span className="text-slate-500">{c.photoBy}</span>
          </figcaption>
        </figure>
      </section>

      <PageBreadcrumb />

      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <section className="pt-14 max-w-3xl" aria-labelledby="fb-how">
            <h2 id="fb-how" className={`${h2} text-center lg:text-left`}>{c.howH2}</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mt-3 text-pretty">{c.how}</p>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">{c.playNote}</p>
          </section>

          <section className="pt-14" aria-labelledby="fb-list">
            <h2 id="fb-list" className="sr-only">{c.listH2}</h2>
            <ol className="space-y-16 lg:space-y-20">
              {BANDS.map((band, i) => {
                const b = c.bands[band.id];
                return (
                  <li key={band.id} id={band.id} className="scroll-mt-24 border-t-2 border-snow pt-6">
                    <article className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10 items-start">
                      <header className="lg:col-span-2 text-center lg:text-left">
                        <p className="font-display font-extrabold text-pink text-2xl leading-none">{i + 1}</p>
                        <h3 className="font-display font-extrabold text-[clamp(1.9rem,4.4vw,2.9rem)] leading-tight tracking-tight mt-2" translate="no">
                          {band.name}
                        </h3>
                        <p className="mt-1 text-slate-300">
                          {b.origin}
                          {band.lapland && (
                            <span className="ml-2 inline-block rounded-full border border-pink-300/60 px-2.5 py-0.5 text-xs font-semibold text-pink-200 align-middle">
                              {c.fromLapland}
                            </span>
                          )}
                        </p>
                      </header>
                      <figure>
                        <Player band={band} lang={lang} />
                        <figcaption className="mt-2 text-right text-xs text-slate-500">
                          {fillCopy(c.photoCredit, { place: b.place })}
                        </figcaption>
                      </figure>
                      <div>
                        <p className="font-display font-bold text-xl text-snow">
                          <span translate="no">{band.song}</span> <span className="text-slate-400 font-semibold">({band.songYear})</span>
                        </p>
                        <p className="text-slate-200 text-base md:text-lg leading-relaxed mt-3 text-pretty">{b.blurb}</p>
                        {band.lapland && b.laplandLink && (
                          <p className="mt-4">
                            <a
                              href={hubUrl(lang, band.lapland.href)}
                              data-umami-event="bands_lapland_link"
                              data-umami-event-band={band.id}
                              className="lv-tap inline-flex items-center gap-1.5 font-semibold text-pink-300 hover:text-pink-200"
                            >
                              {b.laplandLink}
                              <ArrowRight size={16} aria-hidden="true" />
                            </a>
                          </p>
                        )}
                        <ul className="mt-5 space-y-1 text-sm text-slate-400 tabular-nums">
                          <li>{fillCopy(c.views, { n: compact(lang, band.youtubeViews), date: ytDate })}</li>
                          <li>{fillCopy(c.listeners, { n: compact(lang, band.spotifyListeners), date: spDate })}</li>
                          <li>
                            {fillCopy(band.channelKind === 'band' ? c.channelBand : c.channelLabel, { channel: '\u0000' })
                              .split('\u0000')
                              .flatMap((part, k) => (k === 0 ? [part] : [
                                <a key="ch" href={band.channelUrl} target="_blank" rel="noopener" translate="no"
                                  className="underline underline-offset-2 hover:text-snow">{band.channel}</a>,
                                part,
                              ]))}
                          </li>
                          <li>
                            {c.sources}:{' '}
                            {band.sources.map((s, k) => (
                              <span key={s.url}>
                                {k > 0 && ', '}
                                <a href={s.url} target="_blank" rel="noopener" lang="en" translate="no"
                                  className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-snow">
                                  {s.label}<ExternalLink size={12} aria-hidden="true" />
                                </a>
                              </span>
                            ))}
                          </li>
                        </ul>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="pt-20 text-center lg:text-left" aria-labelledby="fb-fan">
            <h2 id="fb-fan" className={h2}>{c.fanH2}</h2>
            <p className="text-left text-slate-300 text-base md:text-lg leading-relaxed mt-3 max-w-2xl mx-auto lg:mx-0 text-pretty">{c.fanLead}</p>
            <Link
              to={to('/fan-league')}
              data-umami-event="bands_fanleague_cta"
              className="lv-tap mt-6 inline-flex items-center gap-2 rounded-full bg-pink-cta hover:bg-pink-dark px-7 py-3.5 font-display font-bold text-white"
            >
              {c.fanCta}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>

          <div className="pt-14 pb-24 flex justify-center lg:justify-start">
            <ShareBar slug="finnish-bands" path={PATH} title={c.h1} excerpt={c.lead} hashtags="#LaplandVibes #FinnishMusic" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
