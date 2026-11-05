import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Clock, Calendar, MapPin, Thermometer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import AuthorBio from '../components/AuthorBio';
import PostCard from '../components/PostCard';
import PhotoCredits from '../components/PhotoCredits';
import { wideSrcSet } from '../data/photoCredits';
import ShareBar from '../components/ShareBar';
import { ShareButton } from '../shared/ShareBar/ShareBar';
import BannerAd from '../components/BannerAd';
import HighlightShare from '../components/HighlightShare';
import type { PostBlock } from '../data/posts';
import { authors, vesa } from '../data/author';
import { categoryBySlug } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import { POST_META } from '../lib/postMeta.gen';
import {
  useJsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from '../lib/jsonld';
import { trackPostRead } from '../lib/analytics';
import { generateHashtags, formatHashtags } from '../lib/hashtags';
import { detectCrossSiteLinks } from '../lib/crossSiteLinks';
import { ilmanValeja, kahdenRivinEm } from '../lib/otsikkoRivit';
import { usePost, useRelated } from '../hooks/usePost';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { formatPostDate } from '../lib/dates';
import { postTextLang } from '../lib/postLang';

/**
 * Render a single content block. H2s receive anchor ids derived from index
 * so the TableOfContents can link to them.
 */
function Block({ block, index, sourcesLabel }: { block: PostBlock; index: number; sourcesLabel: string }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>;
    case 'heading': {
      const id = `h-${index}`;
      if (block.level === 2) return <h2 id={id}>{block.text}</h2>;
      return <h3 id={id}>{block.text}</h3>;
    }
    case 'pullquote':
      return <blockquote className="pullquote">{block.text}</blockquote>;
    case 'divider':
      return <hr />;
    case 'list':
      if (block.check) {
        return (
          <ul className="check-list">
            {block.items.map((item, i) => (
              <li key={i}>
                <span aria-hidden="true" className="check-box" />
                <span><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children }) => <>{children}</> }}>{item}</ReactMarkdown></span>
              </li>
            ))}
          </ul>
        );
      }
      if (block.ordered) {
        return (
          <ol>
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className={block.full ? 'figure-full' : undefined}>
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'sources':
      // Lähteet erottuvat muusta tekstistä: oma laatikko, oma otsikko ja
      // klikattavat linkit. Sisältö on sama teksti joka ennen oli jutun
      // viimeinen kappale — se ei vain näyttänyt lähteeltä.
      return (
        <aside className="post-sources markdown-block mt-12 rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] px-5 py-4 md:px-6 md:py-5">
          <p className="text-[var(--color-ink-mute)] tracking-[0.28em] text-[10px] font-bold uppercase mb-2">
            {sourcesLabel}
          </p>
          {/* Lähderivi on virkkeitä ⇒ leipätekstiä, 16 px eikä 14 (§33, Vesa 20.9.2026): lähde ei saa
              olla jutun vaikein rivi lukea. SOURCES-otsake yllä on silmäotsikko ja saa olla pieni. */}
          <div className="text-base leading-relaxed text-[var(--color-ink-soft)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.text}</ReactMarkdown>
          </div>
        </aside>
      );
    case 'markdown':
      return (
        <div className="markdown-block">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.text}</ReactMarkdown>
        </div>
      );
    default:
      return null;
  }
}

export default function Post() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].post;
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, notFound } = usePost(slug);
  const { related } = useRelated(post?.slug, post?.category, 2);

  // Generate hashtags for the post (brand + category + location-detected)
  const hashtags = post
    ? generateHashtags(post.category, post.content)
    : [];
  const hashtagString = formatHashtags(hashtags);

  // Network cards under the article. Read from the post's category + tags,
  // never from its text: the text is written in one language and this page
  // is read in twelve. See src/lib/crossSiteLinks.ts.
  const crossSiteLinks = useMemo(
    () => (post ? detectCrossSiteLinks({ category: post.category, tags: post.tags }) : []),
    [post],
  );

  // Hooks must always run — move them above the early return.
  // Branded 1200×630 OG card (generated by scripts/generate-og-images.mjs) for
  // the seed posts; user-written posts fall back to their own hero image.
  const SEED_OG_SLUGS = new Set([
    'the-night-the-sky-broke-open-over-kemi',
    'why-i-stopped-chasing-the-aurora-with-an-app',
    'five-nights-in-a-forest-cabin',
    'a-bowl-of-salmon-soup-that-cost-more-than-the-flight',
    'living-between-two-suns',
    'the-sun-did-not-set-it-just-circled-the-house',
    'twelve-kilometres-at-one-in-the-morning',
    'strawberry-hour-at-the-rovaniemi-market',
    'the-sauna-thermometer-said-eighty-two',
    'what-july-in-lapland-actually-asks-you-to-pack',
  ]);
  const ogImage = post
    ? SEED_OG_SLUGS.has(post.slug)
      ? `https://lapland.blog/og/${post.slug}.jpg`
      : post.heroImage
    : undefined;
  // <title>, kuvaus ja canonical samasta kentästä kuin esirenderöidyssä HTML:ssä (scripts/routes.json →
  // src/lib/postMeta.gen.ts): englannin hakuotsikko voi erota jutun otsikosta, joka on h1 ja tulee
  // kannasta. Puuttuva kieli = englanti, kuten esirenderöinnissä. Esirenderöidyn jutun slug luetaan
  // osoitteesta, joten arvot ovat oikein jo ennen kuin kanta vastaa (latauksen ajan canonical osoitti
  // ennen etusivulle). Reitittömällä (uudella) jutulla ei ole esirenderöityä sivua, joten sille kannan
  // otsikko ja ingressi, kun juttu on latautunut.
  const urlSlug = slug && Object.hasOwn(POST_META, slug) ? slug : undefined;
  const seoSlug = post?.slug ?? urlSlug;
  const seoMeta = seoSlug && Object.hasOwn(POST_META, seoSlug) ? POST_META[seoSlug] : undefined;
  useSeo({
    title: (seoMeta && (seoMeta.title[lang] ?? seoMeta.title.en)) ?? post?.title ?? 'Loading',
    description: (seoMeta && (seoMeta.description[lang] ?? seoMeta.description.en)) ?? post?.excerpt ?? 'Story on Lapland.blog',
    image: ogImage,
    canonical: seoSlug ? canonicalUrl(`/post/${seoSlug}`) : canonicalUrl('/'),
    type: post ? 'article' : 'website',
    publishedAt: post?.publishedAt,
    modifiedAt: post?.publishedAt,
    author: (post && authors[post.author]?.name) || vesa.name,
    tags: post?.tags ? [...post.tags, ...hashtags] : hashtags,
  });

  useJsonLd(
    'post',
    post
      ? [
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: 'Home', url: canonicalUrl('/') },
            { name: 'Stories', url: canonicalUrl('/stories') },
            {
              name: categoryBySlug(post.category)?.name ?? 'Story',
              url: canonicalUrl(`/category/${post.category}`),
            },
            { name: post.title, url: canonicalUrl(`/post/${post.slug}`) },
          ]),
        ]
      : null
  );

  useEffect(() => {
    if (post) trackPostRead(post.slug, post.title, post.category);
  }, [post]);

  // Loading state — don't flash 404 while Supabase is still fetching.
  if (loading) {
    return (
      <div className="min-h-screen bg-night text-snow">
        <Nav />
        <div className="pt-40 pb-40 px-4 text-center">
          <div className="inline-block w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-[var(--color-ink-mute)] text-sm">{c.loadingStory}</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/404" replace />;
  }

  const cat = categoryBySlug(post.category);
  const catName = cat ? COPY[lang].category.themes[cat.slug].name : null;
  // Editorial pen for the byline + bio card; unknown handles fall back to the
  // umbrella Field Journal voice.
  const voice = authors[post.author] ?? vesa;
  // The post's own text keeps its own language: a German page shows the English
  // original, the page chrome around it stays German.
  const textLang = postTextLang(post, lang);
  // Pääotsikko tietokoneella enintään kaksi riviä (gate:otsikkorivit, Vesa 23.10.2026): 60 px:llä kahdeksan otsikkoa
  // oli 760 px:n arkissa kolmella rivillä, koska paras kahden rivin jako vie 800–919 px. Koko = pienempi kahdesta,
  // suunniteltu tai 100cqi / jaon em-leveys. manropeEm on kalibroitu painolle 700; painolla 800 ja -0,015 em:n
  // välistyksellä se arvioi 0,954–0,990 mitatusta (8 otsikkoa 23.10.), joten × 1,08 pitää arvion aina yläkanttiin.
  const h1Em = ilmanValeja(textLang ?? lang) ? null : kahdenRivinEm(post.title);

  // Byline: a reader's own post shows their name and links to their trip page;
  // editorial posts keep the editorial pen.
  const bylineName = post.byReader ? post.readerName ?? voice.name : voice.name;
  const bylineTo = post.byReader && post.readerHandle ? to(`/by/${post.readerHandle}`) : to('/about');
  const initials = post.byReader
    ? (bylineName || '?').trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : voice.initials;

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />
      <ReadingProgress />

      {/* ================================================================
          HERO (Vesa 2026-11-05: "layout aivan kamala"). The photo is shown
          whole: on a computer the title sits on its lower edge over a
          gradient under the text only; on phones and tablets the photo is
          clean and the title comes below it (network rule 2026-10-03).
          ================================================================ */}
      <header className="relative pt-16 lg:h-[min(76vh,720px)] lg:min-h-[480px]">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:absolute lg:inset-0 lg:top-16 overflow-hidden bg-night-light">
          <img
            src={post.heroImage}
            srcSet={wideSrcSet(post.heroImage)}
            sizes="100vw"
            alt={post.heroAlt}
            lang={textLang}
            className="absolute inset-0 w-full h-full object-cover object-[50%_45%]"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8 pt-7 lg:pt-40 lg:pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-night/92 lg:via-night/60 lg:to-transparent">
          <div className="max-w-[72rem] mx-auto text-center lg:text-left">
            {catName && cat && (
              <Link
                to={to(`/category/${cat.slug}`)}
                className="lv-tap inline-flex text-pink-300 font-semibold hover:text-snow transition-colors mb-3"
              >
                {catName}
              </Link>
            )}
            <div className="@container">
              <h1
                lang={textLang}
                className={`text-snow leading-[1.06] tracking-[-0.015em] text-[clamp(2rem,6vw,3.6rem)] lg:max-w-[52rem] text-balance lg:[text-shadow:0_2px_18px_rgba(15,23,42,0.55)]${h1Em ? ' lg:[--h1-max:3.6rem] lg:[font-size:min(var(--h1-max),calc(min(100cqi,52rem)/var(--h1-em)))]' : ''}`}
                style={{ fontFamily: 'var(--font-editorial)', fontWeight: 800, ...(h1Em ? { ['--h1-em' as string]: (h1Em * 1.08).toFixed(2) } : {}) }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Byline, place, temperature and the share button, on the night ground. */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[72rem] mx-auto py-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 text-[15px] text-slate-300">
          <Link to={bylineTo} className="inline-flex items-center gap-2.5 hover:text-snow transition-colors">
            <span className="w-10 h-10 rounded-full bg-pink-cta text-white flex items-center justify-center text-xs font-bold" aria-hidden="true">
              {initials}
            </span>
            <span className="font-semibold text-snow">{bylineName}</span>
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={15} />
            <time dateTime={post.visitDate ?? post.publishedAt}>{formatPostDate(post.visitDate ?? post.publishedAt, lang)}</time>
          </span>
          {post.location && (
            <span className="inline-flex items-center gap-1.5" lang={textLang}>
              <MapPin size={15} /> {post.location}
            </span>
          )}
          {post.weatherNote && (
            <span className="inline-flex items-center gap-1.5" title={c.tempSource}>
              <Thermometer size={15} /> {post.weatherNote}
            </span>
          )}
          {!post.byReader && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} />
              {post.readTimeMinutes} {c.minRead}
            </span>
          )}
          <ShareButton lang={lang} title={post.title} excerpt={post.excerpt} tone="dark" className="lg:ml-auto" />
        </div>
      </div>

      {/* ================================================================
          READING SHEET + side column. One left edge for every text element
          inside the sheet (index.css .prose-editorial); figures may run to
          the sheet's edges. The side column (contents, ad) sits on the
          night ground beside it from 1024 px up.
          ================================================================ */}
      <main className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[72rem] mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10 lg:items-start">
          <article
            data-theme={post.theme ?? 'yo'}
            className="theme-editorial lv-paper rounded-[1.5rem] px-5 py-8 sm:px-10 sm:py-11 lg:px-14 lg:py-12"
          >
            {post.excerpt && (
              <p lang={textLang} className="text-[var(--color-ink-soft)] text-lg md:text-[1.3rem] leading-relaxed max-w-[38rem] mb-2">
                {post.excerpt}
              </p>
            )}

            <div id="post-body" lang={textLang} className="prose-editorial mt-8">
              {post.content.map((block, i) => (
                <Block key={i} block={block} index={i} sourcesLabel={c.sourcesLabel} />
              ))}
            </div>
            {post.weatherNote && <p className="mt-8 text-sm text-[var(--color-ink-mute)]">{c.tempSource}</p>}

            <HighlightShare containerSelector="#post-body" url={canonicalUrl(`/post/${post.slug}`)} slug={post.slug} />

            {/* Network cards, chosen from the post's category + tags, labels from COPY */}
            {crossSiteLinks.length > 0 && (
              <div className="mt-12 rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] p-6">
                <p className="font-semibold text-[var(--color-ink)] mb-4">{c.exploreMore}</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {crossSiteLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1.5 rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream)] p-4 hover:border-[var(--color-accent)] hover:shadow-sm transition-all"
                    >
                      <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        {c.networkCards[link.key].label}
                      </span>
                      <span className="text-sm text-[var(--color-ink-mute)] leading-snug">{c.networkCards[link.key].blurb}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <ShareBar slug={post.slug} title={post.title} excerpt={post.excerpt} hashtags={hashtagString} />

            {!post.byReader && <AuthorBio variant="editorial" author={post.author} />}
          </article>

          {/* Side column on the night ground: dark inks via theme-night. */}
          <aside className="theme-night hidden lg:flex lg:flex-col lg:gap-8 lg:sticky lg:top-24 lg:self-start">
            <TableOfContents blocks={post.content} textLang={textLang} />
            {/* A reader's own post carries no ads: the home FAQ promises it. */}
            {!post.byReader && <BannerAd partner="hotels" sid="post_sidebar_hotels" destination="Rovaniemi" />}
          </aside>
        </div>
      </main>

      {/* READ NEXT */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-[72rem] mx-auto">
            <h2 className="text-snow text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center lg:text-left" style={{ fontFamily: 'var(--font-editorial)' }}>
              {c.readNextH2}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo credit of the hero and of the cards above. */}
      <PhotoCredits srcs={[post.heroImage, ...related.map((p) => p.heroImage)]} />

      <Newsletter />
      <Footer />
    </div>
  );
}
