import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import PhotoCredits from '../components/PhotoCredits';
import Reveal from '../components/Reveal';
import PostCard from '../components/PostCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { categories } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import { useJsonLd, breadcrumbSchema } from '../lib/jsonld';
import { usePosts } from '../hooks/usePosts';
import { DESTINATIONS, placeName } from '../data/destinations';
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
  const [place, setPlace] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag')?.toLowerCase() ?? null;
  const placeParam = searchParams.get('place')?.toLowerCase() ?? null;
  const { posts, loading } = usePosts();

  // ?place=X valitsee paikkanapin. Vanha ?tag=X tekee saman jos se on kohde,
  // muuten se menee hakuun kuten ennen — vanhat linkit eivät saa rikkoutua.
  useEffect(() => {
    const kohde = placeParam ?? tagParam;
    if (kohde && DESTINATIONS.some((d) => d.slug === kohde)) {
      setPlace(kohde);
      return;
    }
    if (tagParam) setQuery(tagParam);
  }, [tagParam, placeParam]);

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
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

  // Vain ne paikat joista on kirjoitettu: nappi joka antaa nolla tulosta on
  // lukijalle pettymys, ja tyhjA kohde lOytyy silti /destinations-sivulta.
  const paikat = useMemo(() => {
    const on = new Set(posts.flatMap((p) => p.tags.map((t) => t.toLowerCase())));
    return DESTINATIONS.filter((d) => on.has(d.slug));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .filter((p) => (filter === 'all' ? true : p.category === filter))
      .filter((p) => (place ? p.tags.some((t) => t.toLowerCase() === place) : true))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [filter, place, query, posts]);

  return (
    <div className="min-h-screen bg-night text-snow">
      <Nav />

      {/* Hero — moody full-bleed twilight backdrop */}
      <section className="lv-night relative px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[56vh] md:min-h-[62vh] flex items-center pt-16">
        <picture><source srcSet="/images/hero-dusk-lake-1920.avif" type="image/avif" /><source srcSet="/images/hero-dusk-lake-1920.webp" type="image/webp" /><img
          src="/images/hero-dusk-lake-1920.webp"
          alt={COPY[lang].images.duskLakeAlt}
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
            <p className="text-white text-sm font-bold mb-4 text-center lg:text-left">
              {c.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-snow font-light tracking-tight mb-5 hero-text-shadow text-center lg:text-left">
              {c.h1}
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed hero-text-shadow-sm max-lg:mx-auto max-lg:w-fit">
              {c.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <PageBreadcrumb />

      {/* Suodattimet (Vesa 16.11.2026: "navigointi täällä aivan paska"). Yksi valkoinen työkalurivi: aiheet
          yhdellä vieritettävällä rivillä, paikka valikkona ja haku sen vieressä, tulosten määrä näkyvissä. */}
      <section className="px-4 sm:px-6 lg:px-8 pt-2 pb-10">
        <div className="max-w-6xl mx-auto rounded-2xl border border-[#0F172A]/10 bg-white p-4 sm:p-5 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.35)]">
          <div
            className="hidden sm:flex sm:flex-wrap sm:justify-center lg:justify-start gap-2"
            role="group"
            aria-label={c.filterAria}
          >
            <button type="button" onClick={() => setFilter('all')} aria-pressed={filter === 'all'} className={`shrink-0 min-h-[44px] px-4 rounded-full text-[15px] font-semibold transition-colors ${filter === 'all' ? 'bg-[#DB2777] text-white shadow-sm' : 'bg-white text-[#0F172A] border border-[#0F172A]/12 hover:border-[#DB2777]/60'}`}>
              {c.all}
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                onClick={() => setFilter(cat.slug)}
                aria-pressed={filter === cat.slug}
                className={`shrink-0 min-h-[44px] px-4 rounded-full text-[15px] font-semibold transition-colors ${filter === cat.slug ? 'bg-[#DB2777] text-white shadow-sm' : 'bg-white text-[#0F172A] border border-[#0F172A]/12 hover:border-[#DB2777]/60'}`}
              >
                {themes[cat.slug].name}
              </button>
            ))}
          </div>
          <div className="sm:mt-4 sm:pt-4 sm:border-t border-[#0F172A]/8 grid gap-3 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-center">
            {/* Puhelimella aihe on valikko (Vesa 5.9.2026: suodattimet puhelimessa napin taakse); napit näkyvät 640 px:stä. */}
            <label className="relative block sm:hidden">
              <span className="sr-only">{c.filterAria}</span>
              <SlidersHorizontal size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DB2777] pointer-events-none" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="w-full h-12 appearance-none rounded-full border border-[#0F172A]/12 bg-white pl-11 pr-10 text-base font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#DB2777]/40"
              >
                <option value="all">{c.allTopics}</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {themes[cat.slug].name}
                  </option>
                ))}
              </select>
              <ChevronDown size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
            </label>
            {paikat.length > 0 && (
              <label className="relative block">
                <span className="sr-only">{c.placesLabel}</span>
                <MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DB2777] pointer-events-none" />
                <select
                  value={place ?? ''}
                  onChange={(e) => setPlace(e.target.value || null)}
                  className="w-full h-12 appearance-none rounded-full border border-[#0F172A]/12 bg-white pl-11 pr-10 text-base font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#DB2777]/40"
                >
                  <option value="">{c.allPlaces}</option>
                  {paikat.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {placeName(d, lang)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
              </label>
            )}
            <div className="relative">
              <label htmlFor="archive-search" className="sr-only">
                {c.searchSr}
              </label>
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full h-12 pl-11 pr-4 rounded-full bg-[#F4F7FB] text-[#0F172A] placeholder:text-[#64748B] border border-[#0F172A]/10 focus:outline-none focus:ring-2 focus:ring-[#DB2777]/40 text-base"
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

      <PhotoCredits srcs={filtered.map((p) => p.heroImage)} />

      <Newsletter />
      <Footer />
    </div>
  );
}
