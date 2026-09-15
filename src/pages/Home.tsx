// Home — narrative editorial landing page.
// Top-to-bottom: cinematic hero, three real stories, three-step "how it works",
// three editorial pillars, latest stories grid, personal aside, FAQ, newsletter.

import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, PenLine, MapPin, BookOpen, Share2 } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';
import PostCard from '../components/PostCard';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, publisherSchema, faqPageSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';
import { getImage } from '../lib/images';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import type { CategorySlug } from '../data/categories';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AppPromoHero } from '../components/AppPromo';
import { AD_SLOTS } from '../data/adSlots';

const META: Record<Lang, { seoTitle: string; seoDescription: string }> = {
  'en': {
    seoTitle: 'Lapland.blog · Start & Share Your Lapland Travel Blog',
    seoDescription: 'Turn your Finnish Lapland trip into a travel blog. Keep a diary as you go and share it to social media in one tap. Free and ready in minutes.',
  },
  'fi': {
    seoTitle: 'Lapland.blog · Aloita ja jaa Lapin-matkablogisi',
    seoDescription: 'Tee Suomen Lapin matkastasi matkablogi. Pidä päiväkirjaa matkan aikana ja jaa se someen yhdellä napautuksella. Ilmainen ja valmis parissa minuutissa.',
  },
  'de': {
    seoTitle: 'Lapland.blog · Starten Sie Ihren Lappland-Reiseblog',
    seoDescription: 'Machen Sie aus Ihrer Finnisch-Lappland-Reise einen Reiseblog. Unterwegs Tagebuch führen, mit einem Fingertipp teilen. Kostenlos, in Minuten fertig.',
  },
  'ja': {
    seoTitle: 'Lapland.blog · ラップランド旅行ブログを作って共有',
    seoDescription: 'フィンランド・ラップランドの旅を旅行ブログに。旅しながら日記をつけ、ワンタップでSNSにシェア。無料で、数分で始められます。',
  },
  'es': {
    seoTitle: 'Lapland.blog · Cree y comparta su blog de viaje',
    seoDescription: 'Convierta su viaje a la Laponia finlandesa en un blog de viaje: lleve un diario sobre la marcha y compártalo en redes con un solo toque. Gratis y listo en minutos.',
  },
  'pt-BR': {
    seoTitle: 'Lapland.blog · Crie e compartilhe seu blog de viagem',
    seoDescription: 'Transforme sua viagem à Lapônia finlandesa em um blog de viagem: faça um diário durante o trajeto e compartilhe nas redes com um toque. Grátis e pronto em minutos.',
  },
  'zh-CN': {
    seoTitle: 'Lapland.blog · 创建并分享你的拉普兰旅行博客',
    seoDescription: '把你的芬兰拉普兰之旅变成旅行博客：边走边写日记，一键分享到社交媒体。免费，几分钟即可开始。',
  },
  'ko': {
    seoTitle: 'Lapland.blog · 라플란드 여행 블로그 만들기와 공유하기',
    seoDescription: '핀란드 라플란드 여행을 나만의 여행 블로그로 만들어 보세요. 여행하면서 일기를 쓰고, 한 번의 탭으로 소셜 미디어에 공유하세요. 무료이며 몇 분이면 시작할 수 있습니다.',
  },
  'fr': {
    seoTitle: 'Lapland.blog · Créez et partagez votre blog de voyage',
    seoDescription: 'Transformez votre voyage en Laponie finlandaise en blog de voyage : tenez un journal en chemin et partagez-le sur les réseaux en un geste. Gratuit, prêt en quelques minutes.',
  },
  'it': {
    seoTitle: 'Lapland.blog · Crei e condivida il Suo blog di viaggio',
    seoDescription: 'Trasformi il Suo viaggio in Lapponia finlandese in un blog di viaggio: tenga un diario strada facendo e lo condivida sui social con un tocco. Gratis e pronto in pochi minuti.',
  },
  'nl': {
    seoTitle: 'Lapland.blog · Start en deel uw Lapland-reisblog',
    seoDescription: 'Maak van uw reis door Fins Lapland een reisblog: houd onderweg een dagboek bij en deel het met één tik op social media. Gratis en in enkele minuten klaar.',
  },
  'sv': {
    seoTitle: 'Lapland.blog · Starta och dela din reseblogg om Lappland',
    seoDescription: 'Gör din resa i finska Lappland till en reseblogg: för dagbok under resan och dela den på sociala medier med ett tryck. Gratis och klart på några minuter.',
  },
};

const heroImage = getImage('hero-aurora', '100vw', 'Lapland landscape');

const asideImage = getImage(
  'aside-vesa',
  '(max-width: 768px) 100vw, 260px',
  'Solitary figure with a headlamp standing under a giant aurora arc over Lapland tundra'
);

type AccentColor = 'pink' | 'green' | 'blue';

interface PillarMeta {
  accent: AccentColor;
  image: ReturnType<typeof getImage>;
  /** Category slugs — labels resolve from COPY[lang].category.themes so the
      link chips localize like everything else. */
  links: { slug: CategorySlug; to: string }[];
}

const PILLAR_META: PillarMeta[] = [
  {
    accent: 'green',
    image: getImage('pillar-cold', '(max-width: 768px) 100vw, 33vw'),
    links: [
      { slug: 'aurora', to: '/category/aurora' },
      { slug: 'seasons', to: '/category/seasons' },
    ],
  },
  {
    accent: 'pink',
    image: getImage('pillar-shelter', '(max-width: 768px) 100vw, 33vw'),
    links: [
      { slug: 'cabins', to: '/category/cabins' },
      { slug: 'food', to: '/category/food' },
    ],
  },
  {
    accent: 'blue',
    image: getImage('pillar-people', '(max-width: 768px) 100vw, 33vw'),
    links: [
      { slug: 'people', to: '/category/people' },
      { slug: 'stories', to: '/category/stories' },
    ],
  },
];

// Per-question links into the pages that back each FAQ answer (Vesa
// 2026-07-07: FAQ answers must point to our own supporting content).
// Labels come from the existing nav translations — no new keys.
const FAQ_LINKS: { route: string; label: 'startHere' | 'topReads' | 'destinations' | 'tripDiaries' | 'about' }[][] = [
  [{ route: '/start-here', label: 'startHere' }],                                        // 1 how to start
  [{ route: '/about', label: 'about' }],                                                 // 2 is it free
  [{ route: '/start-here', label: 'startHere' }, { route: '/about', label: 'about' }],   // 3 sharing to IG/FB
  [{ route: '/about', label: 'about' }, { route: '/destinations', label: 'destinations' }], // 4 must I be in Lapland
  [{ route: '/top-reads', label: 'topReads' }, { route: '/stories', label: 'tripDiaries' }], // 5 what to write
];

export default function Home() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].home;
  const { posts: allPosts, loading } = usePosts({ limit: 12 });
  // Kolme nostoa heti heron alle, loput uusimpiin — sama juttu ei esiinny kahdesti.
  const leadPosts = allPosts.slice(0, 3);
  const recent = allPosts.slice(3, 9);

  const m = META[lang];
  useSeo({
    title: m.seoTitle,
    description: m.seoDescription,
    image: 'https://lapland.blog/og/page-home.jpg',
    canonical: canonicalUrl('/'),
    jsonLd: faqPageSchema(c.faq),
  });

  useJsonLd('website', websiteSchema());
  useJsonLd('publisher', publisherSchema());

  const pillarBodies = [
    { kicker: c.pillar1Kicker, title: c.pillar1Title, body: c.pillar1Body, ...PILLAR_META[0] },
    { kicker: c.pillar2Kicker, title: c.pillar2Title, body: c.pillar2Body, ...PILLAR_META[1] },
    { kicker: c.pillar3Kicker, title: c.pillar3Title, body: c.pillar3Body, ...PILLAR_META[2] },
  ];

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[100svh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden pt-16">
        <img
          src={heroImage.src}
          srcSet={heroImage.srcSet}
          sizes={heroImage.sizes}
          alt={heroImage.alt}
          className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          fetchPriority="high"
          decoding="async"
          width={2560}
          height={1097}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/72 via-night/40 to-night/95" />
        <div className="absolute inset-0 hero-scrim-radial pointer-events-none" />
        <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/60 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[640px] h-[640px] rounded-full bg-pink/15 blur-[140px] animate-hero-pulse" />
        </div>
        <div className="absolute top-1/3 left-1/4 pointer-events-none hidden md:block">
          <div className="w-[320px] h-[320px] rounded-full bg-aurora-blue/10 blur-[120px] animate-soft-float" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 pointer-events-none hidden md:block">
          <div
            className="w-[280px] h-[280px] rounded-full bg-aurora-green/10 blur-[110px] animate-soft-float"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
              {c.heroEyebrow.split('·').map((part, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/40 text-pink tracking-[0.4em] text-[11px] uppercase font-bold whitespace-nowrap"
                >
                  {i === 0 && <Snowflake size={12} className="text-pink" />}
                  {part.trim()}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.25rem,6.5vw,5.25rem)] leading-[1.03] tracking-tight mb-6 text-snow font-light hero-text-shadow xl:text-[clamp(84px,1.3125vw_+_67.2px,100.8px)]">
              {c.heroLine1}
              <br />
              <span className="text-pink italic font-light">{c.heroLine2}</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="max-w-2xl xl:max-w-4xl mx-auto text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed hero-text-shadow-sm xl:text-2xl">
              {c.heroLead}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to={to('/signin')}
                className="group cursor-pointer px-8 py-3.5 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:ring-offset-2 focus:ring-offset-night"
              >
                {c.heroPrimaryCta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="cursor-pointer px-8 py-3.5 border border-aurora-blue/60 text-aurora-blue hover:bg-aurora-blue/10 hover:border-aurora-blue rounded-full transition-colors duration-200 tracking-wide font-semibold focus:outline-none focus:ring-2 focus:ring-aurora-blue/40 focus:ring-offset-2 focus:ring-offset-night"
              >
                {c.heroSecondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-slate-300">
              {c.heroFootnote}
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-night pointer-events-none" />
      </section>

      {/* PÄÄKUMPPANI-banneri HETI heron alle (LV Media; tyhjä → house-ad).
          Tumma pinta — istuu sivun bg-night-taustaan. */}
      <MainPartnerBanner config={AD_SLOTS} locale={lang} />

      {/* READ THESE FIRST — kolme oikeaa juttua heti heron alle (Vesa 2026-09-15:
          "eikö tässä pitäisi heti tulla muutama esimerkki? sellaista vauhdin hurmaa").
          Korvasi kesäbannerin, jonka teksti oli kovakoodattu "Keskiyön aurinko 6.6. → 7.7."
          ja joka siis mainosti mennyttä kautta joka syksy ja talvi. */}
      <section
        className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="readfirst-heading"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-10">
              <div className="max-w-2xl">
                <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
                  {c.readFirstEyebrow}
                </p>
                <h2
                  id="readfirst-heading"
                  className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight leading-[1.05]"
                >
                  {c.readFirstH2}
                </h2>
              </div>
              <Link
                to={to('/stories')}
                className="lv-tap inline-flex items-center gap-2 text-sm font-semibold text-pink-300 hover:text-snow transition-colors"
              >
                {c.readFirstCta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-5 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-night-light/60 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {leadPosts.map((post, i) => (
                <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <Link
                    to={to(`/post/${post.slug}`)}
                    className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-purple/20 hover:border-pink/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                  >
                    <img
                      src={post.heroImage}
                      alt={post.heroAlt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      width={1200}
                      height={1500}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/5" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="text-pink-300 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                        {post.kicker}
                      </p>
                      <h3 className="font-display text-2xl text-snow font-medium leading-[1.15] mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-snow/90">
                        {c.readFirstRead}
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
        aria-labelledby="how-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/25 to-night" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-purple/10 blur-[160px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-night/70 backdrop-blur-sm border border-pink/50">
                <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
                <p className="text-pink-200 tracking-[0.35em] text-[10px] font-bold uppercase">
                  {c.howEyebrow}
                </p>
              </div>
              <h2
                id="how-heading"
                className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5"
              >
                {c.howH2Pre}{' '}
                <span className="text-pink italic">{c.howH2Italic}</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {c.howLead}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { Icon: MapPin, accent: 'green', kicker: c.howStep1Kicker, title: c.howStep1Title, body: c.howStep1Body },
              { Icon: BookOpen, accent: 'pink', kicker: c.howStep2Kicker, title: c.howStep2Title, body: c.howStep2Body },
              { Icon: Share2, accent: 'blue', kicker: c.howStep3Kicker, title: c.howStep3Title, body: c.howStep3Body },
            ].map((step, i) => {
              // Icon keeps the vivid brand accent (large enough to pass at 3:1).
              const accentIcon =
                step.accent === 'green'
                  ? 'text-pink-400'
                  : step.accent === 'pink'
                    ? 'text-pink'
                    : 'text-pink-300';
              // The small uppercase kicker label needs a much lighter tint —
              // brand pink at 10px on the dark card fails WCAG AA. pink-200/300
              // lift these to ~9:1 so they actually read as a label.
              const accentKicker =
                step.accent === 'green'
                  ? 'text-pink-200'
                  : step.accent === 'pink'
                    ? 'text-pink-200'
                    : 'text-pink-300';
              const accentBg =
                step.accent === 'green'
                  ? 'bg-pink/15 border-pink/45'
                  : step.accent === 'pink'
                    ? 'bg-pink/15 border-pink/45'
                    : 'bg-aurora-blue/15 border-aurora-blue/45';
              const hoverBorder =
                step.accent === 'green'
                  ? 'hover:border-pink/60'
                  : step.accent === 'pink'
                    ? 'hover:border-pink/60'
                    : 'hover:border-aurora-blue/60';
              const Icon = step.Icon;
              return (
                <Reveal key={step.kicker} delay={(i + 1) as 1 | 2 | 3}>
                  <article
                    className={`h-full rounded-2xl border border-purple/40 bg-night-lighter/40 ring-1 ring-inset ring-white/5 backdrop-blur-sm p-8 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)] transition-colors ${hoverBorder}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center mb-6 ${accentBg}`}
                    >
                      <Icon className={accentIcon} size={20} />
                    </div>
                    <p className={`${accentKicker} text-[10px] tracking-[0.35em] uppercase font-bold mb-3`}>
                      {step.kicker}
                    </p>
                    <h3
                      className="font-display text-2xl text-snow font-medium leading-snug mb-4"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{step.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={4}>
            <div className="mt-14 text-center">
              <Link
                to={to('/signin')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:ring-offset-2 focus:ring-offset-night"
              >
                {c.howCta}
                <ArrowRight size={18} />
              </Link>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-slate-400">
                {c.howFootnote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <HomeAdSlots config={AD_SLOTS} locale={lang} />

      {/* The app announcement — same fixed block as every other site in the
          network, below the paid partner slots (they are sold on being first). */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AppPromoHero />
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* FEATURED */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="pillars-heading">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-pink-300 tracking-[0.35em] text-[10px] font-bold uppercase mb-4 text-center">
              {c.pillarsEyebrow}
            </p>
            <h2
              id="pillars-heading"
              className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-5 text-center"
            >
              {c.pillarsH2Pre}{' '}
              <span className="text-pink italic">{c.pillarsH2Italic}</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto text-center mb-16 leading-relaxed">
              {c.pillarsLead}
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {pillarBodies.map((pillar, i) => {
              // Small uppercase kicker + link labels: the remapped "green"
              // (#DB2777) only hits ~3.5:1 on the dark card and fails WCAG AA,
              // so lift that branch to a lighter pink tint. Brand pink
              // (#EC4899) clears AA, so the pink branch stays as-is.
              const accentColor =
                pillar.accent === 'pink'
                  ? 'text-pink'
                  : pillar.accent === 'green'
                    ? 'text-pink-300'
                    : 'text-aurora-blue';
              const borderHover =
                pillar.accent === 'pink'
                  ? 'hover:border-pink/55'
                  : pillar.accent === 'green'
                    ? 'hover:border-aurora-green/55'
                    : 'hover:border-aurora-blue/55';
              return (
                <Reveal key={pillar.kicker} delay={(i + 1) as 1 | 2 | 3}>
                  <article
                    className={`group h-full rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm overflow-hidden transition-colors ${borderHover}`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={pillar.image.src}
                        srcSet={pillar.image.srcSet}
                        sizes={pillar.image.sizes}
                        alt={pillar.image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={800}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night-light/90 via-night-light/20 to-transparent" />
                    </div>
                    <div className="p-8">
                      <p className={`text-[10px] tracking-[0.35em] uppercase font-bold mb-4 ${accentColor}`}>
                        {pillar.kicker}
                      </p>
                      <h3
                        className="font-display text-2xl text-snow font-medium leading-snug mb-5"
                        style={{ fontFamily: 'var(--font-editorial)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-7">{pillar.body}</p>
                      <div className="flex flex-wrap gap-3">
                        {pillar.links.map((link) => (
                          <Link
                            key={link.to}
                            to={to(link.to)}
                            className={`group/link inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold ${accentColor} hover:opacity-80 transition-opacity`}
                          >
                            {COPY[lang].category.themes[link.slug].name}
                            <ArrowRight
                              size={12}
                              className="group-hover/link:translate-x-0.5 transition-transform"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* LATEST STORIES */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-pink-300 tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                  {c.latestEyebrow}
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight">
                  {c.latestH2}
                </h2>
              </div>
              <Link
                to={to('/stories')}
                className="group inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-xs tracking-wider uppercase font-semibold transition-colors"
              >
                {c.latestEvery}{' '}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {loading && recent.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
              <p className="mt-4">{c.latestLoading}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((post, i) => (
                <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* PERSONAL ASIDE */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        aria-labelledby="aside-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-center">
            <Reveal>
              <div className="relative aspect-[3/2] md:aspect-[4/5] rounded-2xl overflow-hidden border border-purple/25 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                <img
                  src={asideImage.src}
                  srcSet={asideImage.srcSet}
                  sizes={asideImage.sizes}
                  alt={asideImage.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-[10px] tracking-[0.25em] uppercase font-semibold">
                    {c.asidePill}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div>
                <div className="inline-flex items-center gap-2 mb-5">
                  <PenLine size={16} className="text-pink" />
                  <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                    {c.asideEyebrow}
                  </p>
                </div>
                <h2
                  id="aside-heading"
                  className="font-display font-light text-3xl md:text-4xl leading-[1.12] tracking-tight mb-6 text-snow"
                >
                  {c.asideH2}
                </h2>
                <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
                  <p>{c.asideP1}</p>
                  <p>{c.asideP2}</p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <Link
                    to={to('/signin')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-cta text-white font-semibold uppercase tracking-[0.2em] text-xs whitespace-nowrap hover:bg-[#8F3525] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C1543B]/40"
                  >
                    {c.asideCta1}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to={to('/about')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pink/40 text-pink-300 font-semibold uppercase tracking-[0.2em] text-xs whitespace-nowrap hover:bg-[#C1543B]/10 transition-colors"
                  >
                    {c.asideCta2}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8" />

      {/* FAQ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="faq-heading"
              className="font-display text-4xl md:text-5xl text-snow font-light tracking-tight mb-12 text-center"
            >
              {c.faqHeading}
            </h2>
          </Reveal>
          <dl className="space-y-6">
            {c.faq.map((item, faqIndex) => (
              <Reveal key={item.q}>
                <div className="rounded-2xl border border-purple/25 bg-night-light/50 backdrop-blur-sm p-6">
                  <dt className="font-display text-xl text-snow font-medium leading-snug mb-3">{item.q}</dt>
                  <dd className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {item.a}
                    {(FAQ_LINKS[faqIndex] ?? []).length > 0 && (
                      <span className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                        {FAQ_LINKS[faqIndex].map(({ route, label }) => (
                          <Link
                            key={route}
                            to={to(route)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-snow transition-colors"
                          >
                            {COPY[lang].nav[label]} <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                        ))}
                      </span>
                    )}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
