// Home, photo first (Vesa 2026-11-05: "eikä tämä edelleenkään sivuna aiheuta
// sellaista instagram buumia … ajatusta että haluan ottaa kuvan ja lisätä
// tänne, liian seesteinen?").
//
// Top to bottom: hero with a wall of real trip photos (own, October 2026,
// temperatures measured by the Finnish Meteorological Institute at the
// moment of each photo), the story card the writer gets, editors' stories,
// readers' latest photos once there are enough of them to show, then the
// network blocks (partner slots, app, FAQ, newsletter, footer).
//
// Not here on purpose: invented "users", sample feeds, a counter of writers.
// The readers' grid appears only when real readers have posted.

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, Thermometer } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, publisherSchema, faqPageSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { postTextLang } from '../lib/postLang';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AppPromoHero } from '../components/AppPromo';
import PhotoCredits from '../components/PhotoCredits';
import { AD_SLOTS } from '../data/adSlots';
import { manropeEm } from '../lib/otsikkoRivit';
import { supabase } from '../lib/supabase';
import { cardUrl } from '../lib/uploadImage';
import { formatTemp } from '../lib/fmiWeather';

type Copy = (typeof COPY)['en']['home']['photo'];

/**
 * The photo wall. Own photos from the October 2026 road trip, reserved for
 * lapland.blog with _kuvavaihto-20261004/claim.mjs on 2026-11-05. Temperature
 * = FMI open data t2m from the nearest station at the photo's EXIF time
 * (src/lib/fmiWeather.ts), read 2026-11-05; null = not shown (the stove
 * photo is indoors, an outdoor reading next to a fire would mislead).
 */
const WALL: {
  file: string;
  place: keyof Pick<Copy, 'placeUtsjoki' | 'placeKevo' | 'placeKemijarvi'>;
  alt: keyof Pick<Copy, 'altKoivut' | 'altTeno' | 'altKevo' | 'altRuska' | 'altKamiina'>;
  date: string;
  temp: number | null;
  ratio: string;
}[] = [
  { file: 'utsjoki-koivut', place: 'placeUtsjoki', alt: 'altKoivut', date: '2026-10-13', temp: -3, ratio: 'aspect-[9/14]' },
  { file: 'kemijarvi-ruska', place: 'placeKemijarvi', alt: 'altRuska', date: '2026-10-09', temp: 0, ratio: 'aspect-[4/5]' },
  { file: 'kevo-koski', place: 'placeKevo', alt: 'altKevo', date: '2026-10-13', temp: -4, ratio: 'aspect-square' },
  { file: 'kemijarvi-kamiina', place: 'placeKemijarvi', alt: 'altKamiina', date: '2026-10-10', temp: null, ratio: 'aspect-[9/14]' },
  { file: 'utsjoki-teno', place: 'placeUtsjoki', alt: 'altTeno', date: '2026-10-13', temp: -2, ratio: 'aspect-[9/14]' },
];
const COLUMNS = [[0, 1], [2, 3], [4]];

// Per-question links into the pages that back each FAQ answer (Vesa
// 2026-07-07: FAQ answers must point to our own supporting content).
const FAQ_LINKS: { route: string; label: 'startHere' | 'topReads' | 'destinations' | 'tripDiaries' | 'about' }[][] = [
  [{ route: '/start-here', label: 'startHere' }],
  [{ route: '/about', label: 'about' }],
  [{ route: '/start-here', label: 'startHere' }, { route: '/about', label: 'about' }],
  [{ route: '/about', label: 'about' }, { route: '/destinations', label: 'destinations' }],
  [{ route: '/top-reads', label: 'topReads' }, { route: '/stories', label: 'tripDiaries' }],
];
const STORY = WALL[0];

interface ReaderPost {
  slug: string;
  title: string;
  hero_image: string;
  hero_alt: string;
  location: string | null;
  weather_note: string | null;
  lang: string;
}

/** Readers' latest published photo posts; shown only when there are at least 6. */
function useReaderPosts(): ReaderPost[] {
  const [rows, setRows] = useState<ReaderPost[]>([]);
  useEffect(() => {
    let cancelled = false;
    void supabase
      .from('blog_posts')
      .select('slug, title, hero_image, hero_alt, location, weather_note, lang')
      .eq('status', 'published')
      .eq('moderation_hidden', false)
      .not('author_id', 'is', null)
      .order('published_at', { ascending: false })
      .limit(12)
      .then(({ data }) => {
        if (!cancelled && Array.isArray(data)) setRows(data as ReaderPost[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return rows.length >= 6 ? rows : [];
}

function Stamp({ place, date, temp }: { place: string; date: string; temp: number | null }) {
  return (
    <span className="absolute left-2.5 bottom-2.5 max-w-[calc(100%-1.25rem)] inline-flex flex-wrap items-baseline gap-x-2 rounded-xl bg-night/80 px-2.5 py-1.5 text-[13px] font-semibold text-white">
      {temp !== null && <b className="font-display font-extrabold text-[15px] whitespace-nowrap">{formatTemp(temp)}</b>}
      <span>{place}</span>
      <span className="font-medium text-slate-300 whitespace-nowrap">{date}</span>
    </span>
  );
}

export default function Home() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].home;
  const p = c.photo;
  const { posts, loading } = usePosts({ limit: 6, editorialOnly: true });
  const readers = useReaderPosts();
  const themes = COPY[lang].category.themes;
  const locale = lang === 'pt-BR' ? 'pt-BR' : lang === 'zh-CN' ? 'zh-CN' : lang;
  const shortDate = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }), [locale]);
  const longDate = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }), [locale]);
  const day = (iso: string, f: Intl.DateTimeFormat) => f.format(new Date(`${iso}T12:00:00Z`));
  // Desktop: both lines fit their column; Manrope 800 runs ~8 % wider than the 700 calibration.
  const h1Em = Math.max(manropeEm(p.line1), manropeEm(p.line2)) * 1.08;
  const cjk = lang === 'ja' || lang === 'zh-CN';

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
    image: 'https://lapland.blog/og/page-home.jpg',
    canonical: canonicalUrl('/'),
    jsonLd: faqPageSchema(c.faq),
  });
  useJsonLd('website', websiteSchema());
  useJsonLd('publisher', publisherSchema());

  const tile = (i: number, eager: boolean) => {
    const w = WALL[i];
    return (
      <figure key={w.file} className={`relative overflow-hidden rounded-2xl bg-night-light ${w.ratio} shrink-0 w-[54vw] max-w-[240px] snap-start lg:w-auto lg:max-w-none`}>
        <img
          src={`/images/kuvaseina/${w.file}-480.webp`}
          srcSet={`/images/kuvaseina/${w.file}-480.webp 480w, /images/kuvaseina/${w.file}-960.webp 960w`}
          sizes="(min-width: 1024px) 200px, 54vw"
          alt={p[w.alt]}
          width={480}
          height={600}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Stamp place={p[w.place]} date={day(w.date, shortDate)} temp={w.temp} />
      </figure>
    );
  };

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* HERO */}
      <section className="pt-20 lg:pt-28 pb-12 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="@container order-2 lg:order-1 w-full">
            <p className="text-center lg:text-left text-pink-300 font-semibold mb-4">{p.kicker}</p>
            <h1
              className={`font-display font-extrabold tracking-tight leading-[1.05] text-center lg:text-left text-[clamp(2.25rem,8vw,3.25rem)] lg:[font-size:min(3.6rem,calc(100cqi/var(--h1-em)))] mb-5${cjk ? ' [word-break:keep-all]' : ''}`}
              style={{ ['--h1-em' as string]: h1Em.toFixed(2) }}
            >
              <span className="block lg:whitespace-nowrap">{p.line1}</span>
              <span className="block lg:whitespace-nowrap text-pink">{p.line2}</span>
            </h1>
            <p className="text-slate-200 text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">{p.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to={to('/me/new')}
                className="h-14 px-7 rounded-full bg-pink-cta text-white font-bold inline-flex items-center justify-center gap-2 hover:bg-[#BE185D] transition-colors"
                data-umami-event="photo_cta"
                data-umami-event-surface="home_hero"
              >
                <Camera size={19} /> {p.cta}
              </Link>
              <a
                href="#tarinakuva"
                className="h-14 px-7 rounded-full border border-slate-500 font-semibold inline-flex items-center justify-center hover:border-snow transition-colors"
              >
                {p.cta2}
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-400 text-center lg:text-left">{p.fine}</p>
          </div>

          <div className="order-1 lg:order-2 min-w-0">
            <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-1 lg:mx-0 lg:px-0 lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-3.5 lg:items-start [scrollbar-width:none]">
              {COLUMNS.map((col, ci) => (
                <div key={ci} className={`contents lg:flex lg:flex-col lg:gap-3.5 ${ci === 1 ? 'lg:pt-12' : ci === 2 ? 'lg:self-center' : ''}`}>
                  {col.map((i) => tile(i, i === 0))}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400 text-left lg:text-right">{p.wallCredit}</p>
          </div>
        </div>
      </section>

      {/* Paid main partner slot: sold as "right under the hero". */}
      <MainPartnerBanner config={AD_SLOTS} locale={lang} />

      {/* STORY CARD */}
      <section id="tarinakuva" className="scroll-mt-24 border-t border-slate-800 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
          <div className="mx-auto w-[250px] sm:w-[280px] aspect-[9/18] rounded-[40px] border-[10px] border-night-light overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <img
              src={`/images/kuvaseina/${STORY.file}-960.webp`}
              alt={p[STORY.alt]}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-night/80 px-3 py-1 font-logo text-xl leading-none tracking-wide" translate="no">
              <span className="text-pink">#</span>LAPLAND<span className="text-pink">.BLOG</span>
            </span>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-24 bg-gradient-to-t from-night/95 via-night/60 to-transparent">
              <p className="font-display font-extrabold text-6xl leading-none tracking-tight">{formatTemp(STORY.temp ?? 0)}</p>
              <p className="font-display font-bold text-xl mt-2">{p[STORY.place]}</p>
              <p className="text-sm text-slate-300 mt-1">{day(STORY.date, longDate)}</p>
              <p className="text-sm font-semibold text-pink-300 mt-3" translate="no">lapland.blog</p>
            </div>
          </div>
          <div>
            <h2 className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight mb-4 text-center lg:text-left${cjk ? ' [word-break:keep-all]' : ''}`}>
              {p.shareH2}
            </h2>
            <p className="text-slate-200 text-lg leading-relaxed mb-7 max-w-2xl mx-auto lg:mx-0">{p.shareLead}</p>
            <ol className="grid gap-3.5 mb-8 max-w-xl mx-auto lg:mx-0">
              {[p.step1, p.step2, p.step3].map((s, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 items-start text-slate-100 leading-relaxed">
                  <span className="w-8 h-8 rounded-full border border-slate-600 bg-night-light flex items-center justify-center font-display font-extrabold text-sm text-pink-300">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <div className="flex justify-center lg:justify-start">
              <Link
                to={to('/me/new')}
                className="h-14 px-7 rounded-full bg-pink-cta text-white font-bold inline-flex items-center justify-center gap-2 hover:bg-[#BE185D] transition-colors"
                data-umami-event="photo_cta"
                data-umami-event-surface="home_story"
              >
                <Camera size={19} /> {p.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* READERS' PHOTOS: only when real readers have posted enough to fill a grid. */}
      {readers.length > 0 && (
        <section className="border-t border-slate-800 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-8 text-center lg:text-left">{p.readersH2}</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {readers.slice(0, 8).map((r) => (
                <li key={r.slug}>
                  <Link to={to(`/post/${r.slug}`)} className="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-night-light">
                    <img src={cardUrl(r.hero_image)} alt={r.hero_alt} lang={r.lang} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    {(r.location || r.weather_note) && (
                      <span className="absolute left-2.5 bottom-2.5 max-w-[calc(100%-1.25rem)] inline-flex flex-wrap items-center gap-x-2 rounded-xl bg-night/80 px-2.5 py-1.5 text-[13px] font-semibold text-white">
                        {r.weather_note && (
                          <span className="inline-flex items-center gap-1 whitespace-nowrap">
                            <Thermometer size={12} /> {r.weather_note}
                          </span>
                        )}
                        {r.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {r.location}
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* EDITORS' STORIES */}
      <section className="border-t border-slate-800 py-16 lg:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="trips-heading">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-8 text-center lg:text-left">
            <h2 id="trips-heading" className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">{p.tripsH2}</h2>
            <Link to={to('/stories')} className="lv-tap inline-flex items-center justify-center gap-1.5 font-semibold text-pink-300 hover:text-snow">
              {p.tripsAll} <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-night-light/60 animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={to(`/post/${post.slug}`)}
                    className="group h-full flex flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-night-light/60 hover:border-pink/50 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={post.heroImage}
                        alt={post.heroAlt}
                        lang={postTextLang(post, lang)}
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={900}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-2">
                      <p className="text-sm font-semibold text-pink-300">{themes[post.category]?.name}</p>
                      <h3 lang={postTextLang(post, lang)} className="font-display font-bold text-xl leading-snug">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <HomeAdSlots config={AD_SLOTS} locale={lang} />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AppPromoHero />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="faq-heading" className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-10 text-center">
            {c.faqHeading}
          </h2>
          <dl className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {c.faq.map((item, i) => (
              <div key={item.q} className="h-full rounded-2xl p-6 border border-slate-700/80 bg-night-light/60">
                <dt className="font-display font-bold text-lg text-snow leading-snug mb-2">{item.q}</dt>
                <dd className="text-slate-300 leading-relaxed">
                  {item.a}
                  {(FAQ_LINKS[i] ?? []).length > 0 && (
                    <span className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                      {FAQ_LINKS[i].map(({ route, label }) => (
                        <Link key={route} to={to(route)} className="lv-tap inline-flex items-center gap-1.5 text-sm font-semibold text-pink-300 hover:text-snow">
                          {COPY[lang].nav[label]} <ArrowRight size={14} />
                        </Link>
                      ))}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PhotoCredits srcs={posts.map((x) => x.heroImage)} />
      <Newsletter />
      <Footer />
    </div>
  );
}
