// /start-here — the welcoming front door for new visitors.

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, MapPinned, PenLine, BedDouble, Plane, Compass, Utensils } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { usePosts } from '../hooks/usePosts';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, websiteSchema, breadcrumbSchema } from '../lib/jsonld';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// Localized title/description — kept in sync with scripts/routes.json
// (/start-here fallbackTitleByLang) so the client-side document.title matches
// the prerendered <title> on /fi, /de, … instead of staying English.
const TITLE: Record<Lang, string> = {
  en: 'Start Here · Your First Steps on Lapland.blog',
  fi: 'Aloita tästä · ensiaskeleet Lapland.blogissa',
  de: 'Hier starten · deine ersten Schritte auf Lapland.blog',
  ja: 'はじめに · Lapland.blogの歩き方',
  es: 'Empieza aquí · tus primeros pasos en Lapland.blog',
  'pt-BR': 'Comece aqui · seus primeiros passos no Lapland.blog',
  'zh-CN': '从这里开始 · Lapland.blog 新手指引',
  ko: '여기서 시작 · Lapland.blog 첫걸음',
  fr: 'Commencez ici · vos premiers pas sur Lapland.blog',
  it: 'Inizia qui · i primi passi su Lapland.blog',
  nl: 'Begin hier · je eerste stappen op Lapland.blog',
};
const DESCRIPTION: Record<Lang, string> = {
  en: 'New to Lapland.blog? Three ways in: read the field-journal entries, find your Finnish Lapland destination, or start your own free travel blog.',
  fi: 'Uusi Lapland.blogissa? Kolme reittiä sisään: lue kenttäpäiväkirjamerkinnät, löydä Suomen Lapin kohteesi tai aloita oma ilmainen matkablogi.',
  de: 'Neu auf Lapland.blog? Drei Wege hinein: lies die Feldtagebuch-Einträge, finde dein Ziel in Finnisch-Lappland oder starte deinen eigenen kostenlosen Reiseblog.',
  ja: 'Lapland.blogは初めて？入口は三つ。フィールド日記の記事を読む、フィンランド・ラップランドの目的地を探す、または無料で自分の旅行ブログを始める。',
  es: '¿Nuevo en Lapland.blog? Tres caminos: lee las entradas del diario de campo, encuentra tu destino en la Laponia finlandesa o empieza tu propio blog de viaje gratis.',
  'pt-BR': 'Novo no Lapland.blog? Três caminhos: leia as entradas do diário de campo, encontre seu destino na Lapônia finlandesa ou comece seu próprio blog de viagem grátis.',
  'zh-CN': '初到 Lapland.blog？三种入门方式：读田野日志文章、找到你的芬兰拉普兰目的地，或免费开始你自己的旅行博客。',
  ko: 'Lapland.blog가 처음이신가요? 들어가는 세 가지 길: 현장 일기 글 읽기, 핀란드 라플란드 여행지 찾기, 또는 나만의 무료 여행 블로그 시작하기.',
  fr: 'Nouveau sur Lapland.blog ? Trois entrées : lisez les entrées du carnet de terrain, trouvez votre destination en Laponie finlandaise ou lancez votre blog de voyage gratuit.',
  it: 'Nuovo su Lapland.blog? Tre vie d\'accesso: leggi le voci del diario di campo, trova la tua destinazione in Lapponia finlandese o avvia il tuo blog di viaggio gratuito.',
  nl: 'Nieuw op Lapland.blog? Drie manieren om te beginnen: lees de veldnotities, vind je bestemming in Fins Lapland of start je eigen gratis reisblog.',
};

export default function StartHere() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].startHere;
  const { posts } = usePosts({ limit: 4 });
  const intro = posts[0];
  const more = posts.slice(1, 4);

  useSeo({
    title: TITLE[lang],
    description: DESCRIPTION[lang],
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

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <picture><source srcSet="/images/hero-dusk-lake-1920.avif" type="image/avif" /><source srcSet="/images/hero-dusk-lake-1920.webp" type="image/webp" /><img
          src="/images/hero-dusk-lake-1920.webp"
          alt="Frozen lake in Lapland at blue-hour dusk, snow-covered pines along the shore"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080} /></picture>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.45) 100%)' }}
        />
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-pink/15 blur-[140px] animate-hero-pulse pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-night/70 border border-pink/40">
              <span className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
                {c.eyebrow}
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight text-snow mb-6 hero-text-shadow">
              {c.h1}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-slate-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto hero-text-shadow-sm">
              {c.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <PageBreadcrumb />

      <section className="px-4 sm:px-6 lg:px-8 pb-20" aria-labelledby="paths-heading">
        <h2 id="paths-heading" className="sr-only">Paths</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <PathCard
              accent="pink"
              kicker={c.path1Kicker}
              title={c.path1Title}
              body={c.path1Body}
              cta={c.path1Cta}
              to="#plan-your-trip"
              Icon={Compass}
              isAnchor
            />
          </Reveal>
          <Reveal delay={1}>
            <PathCard
              accent="pink"
              kicker={c.path2Kicker}
              title={c.path2Title}
              body={c.path2Body}
              cta={c.path2Cta}
              to={to('/top-reads')}
              Icon={BookOpenText}
            />
          </Reveal>
          <Reveal delay={2}>
            <PathCard
              accent="pink"
              kicker={c.path3Kicker}
              title={c.path3Title}
              body={c.path3Body}
              cta={c.path3Cta}
              to={to('/signin')}
              Icon={PenLine}
            />
          </Reveal>
        </div>
      </section>

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
                  {c.planEyebrow}
                </p>
              </div>
              <h2
                id="plan-heading"
                className="font-display text-3xl md:text-5xl font-light tracking-tight text-snow mb-4"
              >
                {c.planH2}
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {c.planLead}
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Reveal delay={1}>
              <PlanCard
                Icon={BedDouble}
                kicker={c.planStay.kicker}
                title={c.planStay.title}
                body={c.planStay.body}
                href="https://laplandstays.com"
                cta="laplandstays.com"
              />
            </Reveal>
            <Reveal delay={2}>
              <PlanCard
                Icon={Plane}
                kicker={c.planTransport.kicker}
                title={c.planTransport.title}
                body={c.planTransport.body}
                href="https://laplandtransport.com"
                cta="laplandtransport.com"
              />
            </Reveal>
            <Reveal delay={3}>
              <PlanCard
                Icon={MapPinned}
                kicker={c.planDo.kicker}
                title={c.planDo.title}
                body={c.planDo.body}
                href="https://laplandactivities.online"
                cta="laplandactivities.online"
              />
            </Reveal>
            <Reveal delay={4}>
              <PlanCard
                Icon={Utensils}
                kicker={c.planEat.kicker}
                title={c.planEat.title}
                body={c.planEat.body}
                href="https://laplanddining.com"
                cta="laplanddining.com"
              />
            </Reveal>
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://laplandvibes.com"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-pink hover:text-snow text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
            >
              {c.planAllSites}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {intro && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                {c.onlyEyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-2">
                {c.onlyH2}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-2xl">
                {c.onlyLead}
              </p>
              <PostCard post={intro} variant="dark" />
            </Reveal>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-3">
                {c.thenEyebrow}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-snow mb-10">
                {c.thenH2}
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
                to={to('/stories')}
                className="inline-flex items-center gap-2 text-pink hover:text-snow text-xs tracking-[0.25em] uppercase font-semibold transition-colors"
              >
                {c.everyEntry}
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
  /** Brand accent — all paths use vibe-pink to match the logo, nav and primary CTA. */
  accent: 'pink';
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  isAnchor?: boolean;
}

function PathCard({ kicker, title, body, cta, to, Icon, isAnchor }: PathCardProps) {
  const inner = (
    <>
      <div className="flex items-center gap-3 mb-5">
        <Icon size={20} className="text-pink" />
        <p className="tracking-[0.3em] text-[10px] font-bold uppercase text-pink">
          {kicker}
        </p>
      </div>
      <h3 className="font-display text-2xl text-snow mb-3 leading-tight">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">{body}</p>
      <span className="inline-flex items-center gap-1.5 text-pink group-hover:text-snow text-xs uppercase tracking-[0.2em] font-semibold transition-colors">
        {cta}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </>
  );
  const cls = `group block h-full rounded-2xl border border-purple/25 bg-night-light/40 p-7 transition-all duration-300 hover:bg-night-light/60 hover:-translate-y-1 hover:border-pink/55`;
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
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

function PlanCard({ kicker, title, body, href, cta, Icon }: PlanCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group block h-full rounded-2xl border border-purple/25 bg-night-light/50 p-6 transition-all duration-300 hover:bg-night-light/70 hover:-translate-y-1 hover:border-pink/55"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-pink" />
        <p className="text-pink tracking-[0.3em] text-[10px] font-bold uppercase">{kicker}</p>
      </div>
      <h3 className="font-display text-xl text-snow mb-2 leading-tight">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-5">{body}</p>
      <span className="inline-flex items-center gap-1.5 text-pink group-hover:text-snow text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors">
        {cta}
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  );
}
