import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Stagger delay slot 1-6 (matches reveal-delay-N classes in index.css) */
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Tag to render. Defaults to div. */
  as?: ElementType;
  /** Extra classes to merge with .reveal */
  className?: string;
  /** IntersectionObserver root margin */
  rootMargin?: string;
  /** If true, only reveals once and stops observing */
  once?: boolean;
}

/**
 * Reveal — fades and translates in on scroll via IntersectionObserver.
 * CSS handles the transition. Respects prefers-reduced-motion via index.css.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { root: null, rootMargin, threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : '';
  const merged = `reveal${visible ? ' is-visible' : ''}${delayClass}${
    className ? ` ${className}` : ''
  }`;

  return (
    <Tag ref={ref as never} className={merged}>
      {children}
    </Tag>
  );
}
