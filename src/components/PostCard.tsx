import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Post } from '../data/posts';
import { categoryBySlug } from '../data/categories';

interface Props {
  post: Post;
  /** `editorial` renders on a cream background (archive bridge). Default is dark. */
  variant?: 'dark' | 'editorial';
  priority?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * PostCard — used on home grids, archive pages, related posts.
 * Dark variant matches the night+pink ecosystem look; editorial variant is
 * cream-card-on-dark as the "bridge" described in the spec.
 */
export default function PostCard({ post, variant = 'dark', priority = false }: Props) {
  const cat = categoryBySlug(post.category);

  const isEditorial = variant === 'editorial';

  return (
    <article
      className={
        isEditorial
          ? 'group relative rounded-xl overflow-hidden bg-[var(--color-cream)] border border-[var(--color-paper-border)] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300'
          : 'group relative card-base overflow-hidden'
      }
    >
      <Link
        to={`/post/${post.slug}`}
        className="block focus:outline-none"
        aria-label={`Read: ${post.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            width={1600}
            height={1000}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={
              isEditorial
                ? 'absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent'
                : 'absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent'
            }
          />

          {cat && (
            <span
              className={
                isEditorial
                  ? 'absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-[var(--color-cream)] text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                  : 'absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-night/80 backdrop-blur-sm text-pink border border-pink/40'
              }
            >
              {cat.name}
            </span>
          )}
        </div>

        <div className="p-6">
          <p
            className={
              isEditorial
                ? 'text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] mb-3'
                : 'text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-3'
            }
          >
            {post.kicker}
          </p>

          <h3
            className={
              isEditorial
                ? 'font-editorial text-2xl leading-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors mb-3'
                : 'font-display text-2xl leading-tight text-snow group-hover:text-pink transition-colors mb-3'
            }
            style={isEditorial ? { fontFamily: 'var(--font-editorial)' } : undefined}
          >
            {post.title}
          </h3>

          <p
            className={
              isEditorial
                ? 'text-[var(--color-ink-soft)] text-sm leading-relaxed mb-4 line-clamp-3'
                : 'text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3'
            }
          >
            {post.excerpt}
          </p>

          <div
            className={
              isEditorial
                ? 'flex items-center justify-between pt-4 border-t border-[var(--color-paper-border)] text-xs text-[var(--color-ink-mute)]'
                : 'flex items-center justify-between pt-4 border-t border-purple/15 text-xs text-slate-400'
            }
          >
            <div className="flex items-center gap-3">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readTimeMinutes} min read
              </span>
            </div>
            <ArrowUpRight
              size={16}
              className={
                isEditorial
                  ? 'text-[var(--color-accent)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
                  : 'text-pink opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
              }
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
