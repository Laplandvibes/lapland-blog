import { Link } from 'react-router-dom';
import { vesa } from '../data/author';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

interface Props {
  variant?: 'editorial' | 'dark';
}

/**
 * AuthorBio — small author card shown at the end of a post and on About.
 * Renders the editorial voice (no real-person avatar) — actual user-submitted
 * trip blogs render their own author from the user profile.
 */
export default function AuthorBio({ variant = 'editorial' }: Props) {
  const isEditorial = variant === 'editorial';
  const lp = useLocalePath();
  const c = COPY[useLang()].chrome;

  return (
    <aside
      className={
        isEditorial
          ? 'mx-auto max-w-[65ch] mt-16 mb-10 p-8 rounded-xl bg-[var(--color-cream-deep)] border border-[var(--color-paper-border)]'
          : 'mx-auto max-w-2xl mt-16 mb-10 p-8 rounded-xl bg-night-light/60 border border-purple/25'
      }
      aria-label="About the author"
    >
      <div className="flex items-start gap-5">
        {/* Initials badge — no photo, per spec */}
        <div
          className={
            isEditorial
              ? 'w-14 h-14 rounded-full flex items-center justify-center bg-[var(--color-accent)] text-white font-editorial text-xl font-medium shrink-0'
              : 'w-14 h-14 rounded-full flex items-center justify-center bg-pink text-white font-display text-xl font-medium shrink-0'
          }
          style={isEditorial ? { fontFamily: 'var(--font-editorial)' } : undefined}
          aria-hidden="true"
        >
          {vesa.initials}
        </div>

        <div className="flex-1">
          <p
            className={
              isEditorial
                ? 'text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-mute)] mb-1'
                : 'text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-1'
            }
          >
            {c.fieldJournalEntry}
          </p>
          <h3
            className={
              isEditorial
                ? 'text-[var(--color-ink)] text-xl font-medium mb-2'
                : 'text-snow text-xl font-medium mb-2'
            }
            style={isEditorial ? { fontFamily: 'var(--font-editorial)' } : undefined}
          >
            {vesa.name}
          </h3>
          <p
            className={
              isEditorial
                ? 'text-[var(--color-ink-soft)] leading-relaxed text-[0.95rem] mb-4'
                : 'text-slate-300 leading-relaxed text-[0.95rem] mb-4'
            }
          >
            {vesa.bio}
          </p>
          <Link
            to={lp('/about')}
            className={
              isEditorial
                ? 'inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] text-sm font-semibold uppercase tracking-wider transition-colors'
                : 'inline-flex items-center gap-1.5 text-pink hover:text-pink-dark text-sm font-semibold uppercase tracking-wider transition-colors'
            }
          >
            About Lapland.blog →
          </Link>
        </div>
      </div>
    </aside>
  );
}
