import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import AuthorBio from '../components/AuthorBio';
import PostCard from '../components/PostCard';
import Reveal from '../components/Reveal';
import ShareBar from '../components/ShareBar';
import type { PostBlock } from '../data/posts';
import { categoryBySlug } from '../data/categories';
import { useSeo, canonicalUrl } from '../lib/seo';
import {
  useJsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from '../lib/jsonld';
import { trackPostRead } from '../lib/analytics';
import { generateHashtags, formatHashtags } from '../lib/hashtags';
import { detectCrossSiteLinks } from '../lib/crossSiteLinks';
import { usePost, useRelated } from '../hooks/usePost';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Render a single content block. H2s receive anchor ids derived from index
 * so the TableOfContents can link to them.
 */
function Block({ block, index }: { block: PostBlock; index: number }) {
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
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, notFound } = usePost(slug);
  const { related } = useRelated(post?.slug, post?.category, 2);

  // Generate hashtags for the post (brand + category + location-detected)
  const hashtags = post
    ? generateHashtags(post.category, post.content)
    : [];
  const hashtagString = formatHashtags(hashtags);

  // Detect contextual cross-site links from post content
  const crossSiteLinks = useMemo(() => {
    if (!post) return [];
    const text = post.content
      .map((b) => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : ''))
      .join(' ');
    return detectCrossSiteLinks(text);
  }, [post]);

  // Hooks must always run — move them above the early return.
  useSeo({
    title: post ? `${post.title} — Lapland.blog` : 'Loading — Lapland.blog',
    description: post?.excerpt ?? 'Story on Lapland.blog',
    image: post?.heroImage,
    canonical: post ? canonicalUrl(`/post/${post.slug}`) : canonicalUrl('/'),
    type: post ? 'article' : 'website',
    publishedAt: post?.publishedAt,
    modifiedAt: post?.publishedAt,
    author: 'Vesa Pesola',
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
      <div className="theme-editorial min-h-screen">
        <Nav />
        <div className="pt-40 pb-40 px-4 text-center">
          <div className="inline-block w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-[var(--color-ink-mute)] text-sm">Loading story…</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/404" replace />;
  }

  const cat = categoryBySlug(post.category);

  return (
    <div className="theme-editorial min-h-screen">
      <Nav />
      <ReadingProgress />

      {/* ================================================================
          HERO — full-bleed image + overlay meta card
          ================================================================ */}
      <header className="relative pt-16">
        <div className="relative h-[70vh] min-h-[480px] max-h-[780px] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/50" />
        </div>

        {/* Title card — overlaps the hero image */}
        <div className="relative px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-40 mb-12">
          <div className="max-w-[68rem] mx-auto">
            <div className="bg-[var(--color-cream)] rounded-2xl shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] border border-[var(--color-paper-border)] px-6 py-10 md:px-14 md:py-14">
              <Link
                to="/stories"
                className="inline-flex items-center gap-1.5 text-[var(--color-ink-mute)] hover:text-[var(--color-accent)] text-xs uppercase tracking-[0.25em] font-semibold mb-6 transition-colors"
              >
                <ArrowLeft size={14} /> All stories
              </Link>

              {cat && (
                <Link
                  to={`/category/${cat.slug}`}
                  className="inline-block text-[var(--color-accent)] text-[10px] uppercase tracking-[0.35em] font-bold mb-5 hover:text-[var(--color-accent-dark)] transition-colors"
                >
                  {cat.name} · {post.kicker}
                </Link>
              )}

              <h1
                className="text-[var(--color-ink)] font-normal leading-[1.08] tracking-[-0.01em] text-[clamp(2rem,5.5vw,4rem)]"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                {post.title}
              </h1>

              <p className="mt-6 text-[var(--color-ink-soft)] text-lg md:text-xl leading-relaxed max-w-[60ch]">
                {post.excerpt}
              </p>

              <div className="mt-8 pt-6 border-t border-[var(--color-paper-border)] flex flex-wrap items-center gap-5 text-sm text-[var(--color-ink-mute)]">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-[11px] font-semibold"
                    aria-hidden="true"
                  >
                    VP
                  </span>
                  <span>
                    By{' '}
                    <Link
                      to="/about"
                      className="text-[var(--color-ink)] font-semibold hover:text-[var(--color-accent)] transition-colors"
                    >
                      Vesa Pesola
                    </Link>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          ARTICLE BODY with optional TOC sidebar
          ================================================================ */}
      <main className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-[68rem] mx-auto">
          <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-16">
            <div className="prose-editorial">
              {post.content.map((block, i) => (
                <Block key={i} block={block} index={i} />
              ))}
            </div>
            <TableOfContents blocks={post.content} />
          </div>

          {/* Auto-generated hashtags — always visible */}
          {hashtags.length > 0 && (
            <div className="max-w-[65ch] mx-auto mt-14 pt-8 border-t border-[var(--color-paper-border)]">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/20 transition-colors hover:bg-[var(--color-accent)]/15"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contextual cross-site links — auto-detected from content */}
          {crossSiteLinks.length > 0 && (
            <div className="max-w-[65ch] mx-auto mt-10 rounded-2xl border border-[var(--color-paper-border)] bg-[var(--color-cream-deep)] p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] font-bold mb-4">
                Explore more from the LaplandVibes network
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {crossSiteLinks.map((link) => (
                  <a
                    key={link.site}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 rounded-xl border border-[var(--color-paper-border)] bg-[var(--color-cream)] p-4 hover:border-[var(--color-accent)] hover:shadow-sm transition-all"
                  >
                    <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                      {link.label}
                    </span>
                    <span className="text-xs text-[var(--color-ink-mute)] leading-snug">
                      {link.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <ShareBar slug={post.slug} title={post.title} excerpt={post.excerpt} hashtags={hashtagString} />

          {/* Tags row */}
          {post.tags.length > 0 && (
            <div className="max-w-[65ch] mx-auto mt-14 pt-8 border-t border-[var(--color-paper-border)]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] mb-3 font-semibold">
                Tagged
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs text-[var(--color-ink-soft)] bg-[var(--color-cream-deep)] border border-[var(--color-paper-border)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <AuthorBio variant="editorial" />
        </div>
      </main>

      {/* ================================================================
          READ NEXT — bridge: cream cards on cream bg
          ================================================================ */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-24 bg-[var(--color-cream-deep)] py-20">
          <div className="max-w-[68rem] mx-auto">
            <Reveal>
              <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-[0.35em] font-bold mb-3">
                Read next
              </p>
              <h2
                className="text-[var(--color-ink)] text-3xl md:text-4xl font-normal mb-10"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                More from the {cat?.name ?? 'journal'}
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i + 1) as 1 | 2}>
                  <PostCard post={p} variant="editorial" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dark newsletter + footer, switching out of editorial theme */}
      <div className="bg-night text-snow">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
