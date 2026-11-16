import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import type { Post } from '../data/posts';
import { categoryBySlug } from '../data/categories';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { formatPostDate } from '../lib/dates';
import { postTextLang } from '../lib/postLang';
import { fillCopy } from '../lib/copyTemplate';

interface Props {
  post: Post;
  /** `editorial` renders on a cream background (archive bridge). Default is dark. */
  variant?: 'dark' | 'editorial';
  priority?: boolean;
}

/**
 * PostCard — used on home grids, archive pages, related posts.
 * Dark variant matches the night+pink ecosystem look; editorial variant is
 * cream-card-on-dark as the "bridge" described in the spec.
 */
export default function PostCard({ post, variant = 'dark', priority = false }: Props) {
  const cat = categoryBySlug(post.category);
  const lp = useLocalePath();
  const lang = useLang();
  const c = COPY[lang].chrome;
  // Localized category label — categories.ts names are EN-only data.
  const catName = cat ? COPY[lang].category.themes[cat.slug].name : null;
  const textLang = postTextLang(post, lang);

  const isEditorial = variant === 'editorial';

  return (
    <article
      className={
        isEditorial
          ? 'group relative rounded-xl overflow-hidden bg-[var(--color-cream)] border border-[var(--color-paper-border)] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all duration-300'
          : 'group relative card-base overflow-hidden h-full flex flex-col'
      }
    >
      <Link
        to={lp(`/post/${post.slug}`)}
        className="flex flex-1 flex-col focus:outline-none"
        aria-label={fillCopy(c.readPostAria, { title: post.title })}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            lang={textLang}
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
                : 'hidden'
            }
          />

          {cat && (
            <span
              className={
                isEditorial
                  ? 'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-cream)] text-[var(--color-accent)] border border-[var(--color-accent)]/30'
                  : 'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-white/95 text-pink-dark shadow-sm'
              }
            >
              {catName}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-1 flex-col">
          <p
            lang={textLang}
            className={
              isEditorial
                ? 'text-sm font-semibold text-[var(--color-ink-mute)] mb-2 empty:hidden'
                : 'text-sm font-semibold text-slate-400 mb-2 empty:hidden'
            }
          >
            {post.kicker}
          </p>

          <h3
            lang={textLang}
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
            lang={textLang}
            className={
              isEditorial
                ? 'text-[var(--color-ink-soft)] text-base leading-relaxed mb-4'
                : 'text-slate-300 text-base leading-relaxed mb-4'
            }
          >
            {post.excerpt}
          </p>

          <div
            className={
              isEditorial
                ? 'mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-paper-border)] text-sm text-[var(--color-ink-mute)]'
                : 'mt-auto flex items-center justify-between pt-4 border-t border-slate-800 text-sm text-slate-400'
            }
          >
            <div className="flex items-center gap-3">
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt, lang, { day: 'numeric', month: 'short', year: 'numeric' })}
              </time>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readTimeMinutes} {c.minRead}
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
