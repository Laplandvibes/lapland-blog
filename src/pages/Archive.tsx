import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { categories } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

type Filter = 'all' | (typeof categories)[number]['slug'];

export default function Archive() {
  const lang = useLang();
  const c = COPY[lang].archive;
  // Localized filter-chip labels — categories.ts names are EN-only data.
  const themes = COPY[lang].category.themes;
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag')?.toLowerCase() ?? null;
  const { posts, loading } = usePosts();

  // Pre-fill the search box from ?tag= so /destinations links filter Archive.
  useEffect(() => {
    if (tagParam) setQuery(tagParam);
  }, [tagParam]);

  useSeo({
    title: c.pageTitle,
    description: c.pageDescription,
    image: 'https://lapland.blog/og/page-stories.jpg',
    canonical: canonicalUrl('/stories'),
  });

  useJsonLd(
    'archive',
    breadcrumbSchema([
      { name: 'Home', url: canonicalUrl('/') },
      { name: 'Stories', url: canonicalUrl('/stories') },
    ])
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .filter((p) => (filter === 'all' ? true : p.category === filter))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [filter, query, posts]);

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero — moody full-bleed twilight backdrop */}
      <section className="relative px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[56vh] md:min-h-[62vh] flex items-center pt-16">
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
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.80) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.50) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/4 w-[420px] h-[420px] rounded-full bg-pink/10 blur-[140px] pointer-events-none animate-hero-pulse" />
        <div className="relative max-w-5xl mx-auto w-full py-16 md:py-20">
          <Reveal>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              {c.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-snow font-light tracking-tight mb-5 hero-text-shadow">
              {c.h1}
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed hero-text-shadow-sm">
              {c.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <PageBreadcrumb />

      {/* Filters + search */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={c.filterAria}
            >
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                  filter === 'all'
                    ? 'bg-pink text-white'
                    : 'bg-night-light/60 text-slate-300 border border-purple/25 hover:border-pink/60'
                }`}
              >
                {c.all}
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => setFilter(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                    filter === cat.slug
                      ? 'bg-pink text-white'
                      : 'bg-night-light/60 text-slate-300 border border-purple/25 hover:border-pink/60'
                  }`}
                >
                  {themes[cat.slug].name}
                </button>
              ))}
            </div>

            <div className="relative md:w-72">
              <label htmlFor="archive-search" className="sr-only">
                {c.searchSr}
              </label>
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-night-light/60 text-snow placeholder:text-slate-500 border border-purple/25 focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/60 text-sm"
              />
            </div>
          </div>
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
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-xl mb-2">{c.emptyTitle}</p>
              <p className="text-sm">{c.emptyBody}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
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

      <Newsletter />
      <Footer />
    </div>
  );
}
