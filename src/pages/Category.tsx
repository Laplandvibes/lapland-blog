import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import { categoryBySlug, categories } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { trackCategoryView } from '../lib/analytics';
import { useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function Category() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].category;
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categoryBySlug(slug) : undefined;
  const theme = category ? c.themes[category.slug] : undefined;
  const { posts: postsInCat, loading } = usePosts({
    category: category?.slug,
  });

  // Hooks before any early return.
  useSeo({
    title: theme ? theme.metaTitle : 'Category · Lapland.blog',
    description: theme?.metaDescription ?? 'Browse Lapland.blog stories by theme.',
    canonical: category ? canonicalUrl(`/category/${category.slug}`) : canonicalUrl('/stories'),
  });

  useJsonLd(
    'category',
    category
      ? breadcrumbSchema([
          { name: 'Home', url: canonicalUrl('/') },
          { name: 'Stories', url: canonicalUrl('/stories') },
          {
            name: theme?.name ?? category.name,
            url: canonicalUrl(`/category/${category.slug}`),
          },
        ])
      : null
  );

  useEffect(() => {
    if (category) trackCategoryView(category.slug);
  }, [category]);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/25 to-night pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-pink/10 blur-[150px] pointer-events-none animate-hero-pulse" />

        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <Link
              to={to('/stories')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-pink text-xs uppercase tracking-[0.25em] font-semibold mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> {c.allStoriesBack}
            </Link>

            <p className="text-pink-300 tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              {c.categoryPrefix} · {postsInCat.length} {postsInCat.length === 1 ? c.storySingular : c.storyPlural}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-snow font-light tracking-tight mb-6 hero-text-shadow">
              {theme?.name ?? category.name}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              {theme?.description ?? category.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-24 text-slate-400">
              <div className="inline-block w-6 h-6 border-2 border-pink border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-sm">{c.loading}</p>
            </div>
          ) : postsInCat.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-xl mb-3">{c.emptyTitle}</p>
              <p className="text-sm mb-6">{c.emptyBody}</p>
              <Link
                to={to('/stories')}
                className="inline-flex items-center gap-1.5 text-pink hover:text-aurora-blue text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {c.emptyLink}
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {postsInCat.map((post, i) => (
                <Reveal
                  key={post.slug}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="section-divider mb-16" />
          <p className="text-aurora-blue tracking-[0.35em] text-[10px] font-bold uppercase mb-4 text-center">
            {c.keepExploringEyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-snow font-light tracking-tight text-center mb-10">
            {c.otherThemes}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories
              .filter((other) => other.slug !== category.slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  to={to(`/category/${cat.slug}`)}
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-night-light/60 border border-purple/30 hover:border-pink hover:bg-night-light transition-all"
                >
                  <span className="font-display text-base text-snow group-hover:text-pink transition-colors">
                    {c.themes[cat.slug]?.name ?? cat.name}
                  </span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                    {c.themes[cat.slug]?.tagline ?? cat.tagline}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
