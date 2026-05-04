import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import { categories } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';

type Filter = 'all' | (typeof categories)[number]['slug'];

export default function Archive() {
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
    title: 'All stories — Lapland.blog',
    description:
      'Every story on Lapland.blog. Aurora, cabins, food, seasons, people, gear and long-form reads from Finnish Lapland.',
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
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[60vh] flex items-end">
        <img
          src="/images/hero-dusk-lake-1920.webp"
          alt="Frozen lake in Lapland at blue-hour dusk, snow-covered pines along the shore"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/55 to-night pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[420px] h-[420px] rounded-full bg-pink/10 blur-[140px] pointer-events-none animate-hero-pulse" />
        <div className="relative max-w-5xl mx-auto w-full">
          <Reveal>
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase mb-4">
              Archive
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-snow font-light tracking-tight mb-5 hero-text-shadow">
              Every story.
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed hero-text-shadow-sm">
              No algorithm, no curation trick. The newest is on top. Use the
              filter to narrow things down, or search if you already know what
              you're looking for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters + search */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
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
                All
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
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative md:w-72">
              <label htmlFor="archive-search" className="sr-only">
                Search stories
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
                placeholder="Search titles, tags…"
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
              <p className="mt-4 text-sm">Loading stories…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-xl mb-2">No stories match that.</p>
              <p className="text-sm">
                Try clearing the filter or searching for a different word.
              </p>
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
