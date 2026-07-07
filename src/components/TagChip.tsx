import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  to?: string;
  children: ReactNode;
  variant?: 'dark' | 'editorial' | 'ghost';
  size?: 'sm' | 'md';
}

/**
 * Small reusable pill chip for categories, tags, and kickers.
 * Variants adapt to the two themes (dark base, editorial cream base).
 */
export default function TagChip({
  to,
  children,
  variant = 'dark',
  size = 'sm',
}: Props) {
  const sizeCls =
    size === 'sm' ? 'px-3 py-1 text-[10px]' : 'px-4 py-1.5 text-xs';

  const variantCls =
    variant === 'dark'
      ? 'bg-night-light/70 border border-pink/40 text-pink-300 hover:border-pink hover:text-snow'
      : variant === 'editorial'
      ? 'bg-[var(--color-cream-deep)] border border-[var(--color-paper-border)] text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]'
      : 'border border-slate-500/40 text-slate-300 hover:border-pink/60 hover:text-pink';

  const classes = `inline-flex items-center gap-1.5 rounded-full ${sizeCls} font-bold uppercase tracking-[0.2em] transition-colors ${variantCls}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}
