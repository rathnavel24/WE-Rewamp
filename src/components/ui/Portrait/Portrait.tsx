import type { CSSProperties } from 'react';
import type { Tone } from '@/types';
import { cx } from '@/lib/cx';
import s from './Portrait.module.css';

interface PortraitProps {
  name: string;
  /** Photo URL; without one a tinted silhouette placeholder is shown. */
  photo?: string;
  tone?: Tone;
  /** `glass` sits on a coloured/dark card; `tone` (default) on light surfaces. */
  variant?: 'tone' | 'glass';
  className?: string;
}

/** Person photo, or a tinted silhouette placeholder until one exists. */
export function Portrait({ name, photo, tone, variant = 'tone', className }: PortraitProps) {
  const vars = tone ? ({ '--portrait-bg': tone.soft, '--portrait-ink': tone.ink } as CSSProperties) : undefined;
  return (
    <span className={cx(s.portrait, s[variant], className)} style={vars}>
      {photo ? (
        <img src={photo} alt={name} className={s.photo} loading="lazy" />
      ) : (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMax meet"
          className={s.placeholder}
          role="img"
          aria-label={`${name} (photo coming soon)`}
        >
          <circle cx="50" cy="40" r="16" />
          <path d="M14 104c0-24 16-38 36-38s36 14 36 38z" />
        </svg>
      )}
    </span>
  );
}
