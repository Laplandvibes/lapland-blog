import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { Post } from '../data/posts';
import { categoryBySlug } from '../data/categories';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

interface Props {
  post: Post;
}

/**
 * FeaturedPost — cinematic hero-sized featured story block for the home page.
 * Full-bleed image on the right/background, overlayed copy card on the left.
 */
export default function FeaturedPost({ post }: Props) {
  const cat = categoryBySlug(post.category);
  const lp = useLocalePath();
  const c = COPY[useLang()].chrome;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-purple/25 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
      <div className="grid md:grid-cols-5 min-h-[520px]">
        {/* Image */}
        <Link
          to={lp(`/post/${post.slug}`)}
          className="md:col-span-3 relative overflow-hidden focus:outline-none"
          aria-label={`Read featured story: ${post.title}`}
        >
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={1000}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/20 to-transparent md:bg-gradient-to-t md:from-night/60 md:via-transparent md:to-transparent" />
        </Link>

        {/* Copy panel */}
        <div className="md:col-span-2 relative flex flex-col justify-center p-8 md:p-10 bg-gradient-to-b from-night-light/90 to-night/95 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 mb-5 self-start px-3 py-1.5 rounded-full bg-night-light/70 backdrop-blur-sm border border-pink/40">
            <div className="w-1.5 h-1.5 rounded-full bg-pink animate-pulse" />
            <p className="text-pink tracking-[0.35em] text-[10px] font-bold uppercase">
              {c.featuredBadge}
            </p>
          </div>

          {cat && (
            <p className="text-pink-300 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">
              {cat.name} · {post.readTimeMinutes} min
            </p>
          )}

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-snow font-light tracking-tight mb-5">
            {post.title}
          </h2>

          <p className="text-slate-300 text-base leading-relaxed mb-7">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-5 text-xs text-slate-300 mb-7">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTimeMinutes} {c.minRead}
            </span>
          </div>

          <Link
            to={lp(`/post/${post.slug}`)}
            className="group self-start inline-flex items-center gap-2 px-6 py-3 bg-pink text-white font-semibold rounded-full tracking-wide hover:bg-pink-dark hover:-translate-y-0.5 transition-all duration-300"
          >
            {c.readTheStory}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
