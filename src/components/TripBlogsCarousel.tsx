// TripBlogsCarousel — horizontal scroll-snap showcase of EXAMPLE trip blogs
// built by The Field Journal (the site's editorial desk) around the 7 real
// trip photos in public/images/ (see lib/images.ts). Clearly labelled as
// examples — no fabricated users, no fake view counts (honest model,
// laplandblog_editorial_model). Designed to plant the "I want to make one
// too" feeling. Snap is `proximity` not `mandatory` so the scroll flows
// freely; auto-advance pauses for 6s after any touch interaction.

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
} from 'lucide-react';
import { getImage, type TripSlot } from '../lib/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// HONEST MODEL (laplandblog_editorial_model, Vesa 2026-06-26 / enforced
// 2026-07-11): no fabricated private individuals, no fake view counts.
// These cards are EXAMPLE journals built by The Field Journal (the site's
// own editorial desk) to show the format. Every card is labelled as an
// example, attributed to The Field Journal, and titles/snippets come from
// the copy files so they localize with the rest of the page.
export type ExampleBlogKey =
  | 'aurora'
  | 'cabin'
  | 'forest'
  | 'nightforest'
  | 'silence'
  | 'food';

interface ExampleBlog {
  key: ExampleBlogKey;
  place: string;
  entries: number;
  days: number;
  heroSlot: TripSlot;
  accent: 'pink' | 'blue' | 'green' | 'purple';
}

const EXAMPLE_BLOGS: ExampleBlog[] = [
  { key: 'aurora', place: 'Inari', entries: 9, days: 5, heroSlot: 'trip-aurora-chase', accent: 'green' },
  { key: 'cabin', place: 'Pyhä', entries: 14, days: 8, heroSlot: 'trip-cabin-life', accent: 'purple' },
  { key: 'forest', place: 'Rovaniemi', entries: 11, days: 6, heroSlot: 'trip-forest-walk', accent: 'blue' },
  { key: 'nightforest', place: 'Korouoma', entries: 6, days: 3, heroSlot: 'trip-night-forest', accent: 'blue' },
  { key: 'silence', place: 'Sodankylä', entries: 7, days: 4, heroSlot: 'trip-silence', accent: 'green' },
  { key: 'food', place: 'Levi', entries: 12, days: 7, heroSlot: 'trip-food', accent: 'pink' },
];

const ACCENT_BORDER: Record<ExampleBlog['accent'], string> = {
  pink: 'group-hover:border-pink/70',
  blue: 'group-hover:border-aurora-blue/70',
  green: 'group-hover:border-aurora-green/70',
  purple: 'group-hover:border-purple/70',
};

// Small (10px) labels on the dark card body. The vivid brand pinks (#EC4899 /
// #DB2777) only reach ~3.3–4.3:1 at this size and fail WCAG AA, so the text
// uses lighter pink tints (~8:1). Colour variety still comes from the per-card
// borders, dots and avatar gradients below, which keep the brand hues.
const ACCENT_TEXT: Record<ExampleBlog['accent'], string> = {
  pink: 'text-pink-300',
  blue: 'text-pink-300',
  green: 'text-pink-300',
  purple: 'text-purple-light',
};

const ACCENT_DOT: Record<ExampleBlog['accent'], string> = {
  pink: 'bg-pink',
  blue: 'bg-aurora-blue',
  green: 'bg-aurora-green',
  purple: 'bg-purple',
};

export default function TripBlogsCarousel() {
  const lp = useLocalePath();
  const c = COPY[useLang()].chrome;
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  // Auto-advance: gentle drift right every 6s. Loops back to start.
  // Skipped entirely if the user prefers reduced motion.
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    const id = window.setInterval(() => {
      if (!track) return;
      const card = track.querySelector<HTMLElement>('[data-card]');
      const step = card ? card.offsetWidth + 24 : 360;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 6000);

    return () => window.clearInterval(id);
  }, [paused]);

  // Pause for 6s after any user interaction, then resume the loop.
  function pauseTemporarily(ms = 6000) {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), ms);
  }

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    []
  );

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : 360;
    track.scrollBy({ left: step * dir, behavior: 'smooth' });
    pauseTemporarily();
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => pauseTemporarily()}
      onPointerDown={() => pauseTemporarily()}
    >
      {/* Edge fade gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-night to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-night to-transparent z-10" />

      {/* Arrows */}
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Previous trip blogs"
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-night/85 backdrop-blur-md border border-purple/40 text-snow hover:border-pink hover:text-pink items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Next trip blogs"
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-night/85 backdrop-blur-md border border-purple/40 text-snow hover:border-pink hover:text-pink items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-proximity scrollbar-none pb-4 px-1 -mx-1 overscroll-x-contain"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapStop: 'normal',
        }}
      >
        {EXAMPLE_BLOGS.map((blog) => {
          const img = getImage(
            blog.heroSlot,
            '(max-width: 640px) 300px, (max-width: 1024px) 380px, 380px'
          );
          const ex = c.examples[blog.key];
          return (
          <article
            key={blog.key}
            data-card
            className="group snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[380px]"
          >
            <Link
              to={lp('/signin')}
              className={`block relative rounded-2xl overflow-hidden border border-purple/30 bg-night-light/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(236,72,153,0.5)] ${ACCENT_BORDER[blog.accent]}`}
            >
              {/* Hero image */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes={img.sizes}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />

                {/* Every card is transparently labelled an editorial example */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-night/85 backdrop-blur-md border border-pink/50 text-pink-200 text-[9px] tracking-[0.25em] uppercase font-bold">
                  {c.exampleBadge}
                </span>

                {/* Author overlay bottom — the real editorial desk */}
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-center gap-3">
                  <div
                    aria-hidden
                    className="w-10 h-10 rounded-full border-2 border-snow/90 bg-gradient-to-br from-pink to-aurora-blue flex items-center justify-center text-snow text-xs font-bold tracking-wide shadow-lg"
                  >
                    FJ
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-snow text-sm font-semibold truncate">
                      The Field Journal
                    </p>
                    <p className={`text-[10px] tracking-wider uppercase font-semibold truncate ${ACCENT_TEXT[blog.accent]}`}>
                      {c.byEditorial}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-[10px] tracking-[0.18em] uppercase font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={11} className={ACCENT_TEXT[blog.accent]} />
                    {blog.place} · {blog.days} {c.daysLabel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={11} className={ACCENT_TEXT[blog.accent]} />
                    {blog.entries} {c.entriesLabel}
                  </span>
                </div>
                <h3
                  className="font-display text-snow text-lg leading-snug font-medium mb-2"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {ex.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                  "{ex.snippet}"
                </p>

                <div className="mt-4 pt-4 border-t border-purple/20 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold ${ACCENT_TEXT[blog.accent]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ACCENT_DOT[blog.accent]}`} />
                    {c.liveTripBlog}
                  </span>
                  <ArrowRight
                    size={14}
                    className={`${ACCENT_TEXT[blog.accent]} group-hover:translate-x-1 transition-transform`}
                  />
                </div>
              </div>
            </Link>
          </article>
          );
        })}

        {/* Final "your blog goes here" CTA card */}
        <article
          data-card
          className="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[380px]"
        >
          <Link
            to={lp('/signin')}
            className="group block relative rounded-2xl overflow-hidden border-2 border-dashed border-pink/50 bg-gradient-to-br from-pink/10 via-night-light/30 to-aurora-blue/10 h-full min-h-[460px] flex flex-col items-center justify-center text-center p-8 hover:border-pink hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-pink/20 border border-pink/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ArrowRight size={24} className="text-pink" />
            </div>
            <p className="text-pink text-[10px] tracking-[0.35em] uppercase font-bold mb-3">
              {c.yourTripYourBlog}
            </p>
            <h3
              className="font-display text-snow text-2xl leading-tight font-light mb-4"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              {c.yoursCouldBeNext}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {c.startFree}
            </p>
            <span className="px-6 py-3 bg-pink text-white font-semibold rounded-full text-xs tracking-[0.2em] uppercase group-hover:bg-pink-dark transition-colors">
              {c.startMine}
            </span>
          </Link>
        </article>
      </div>
    </div>
  );
}
