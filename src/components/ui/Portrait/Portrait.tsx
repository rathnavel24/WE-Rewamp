import type { CSSProperties } from 'react';
import type { Tone } from '@/types';
import { cx } from '@/lib/cx';
import s from './Portrait.module.css';

interface PortraitProps {
  name: string;
  /** Photo URL; without one a tinted silhouette placeholder is shown. */
  photo?: string;
  /** Which placeholder to show without a photo; neutral when unset. */
  figure?: 'male' | 'female';
  tone?: Tone;
  /** `glass` sits on a coloured/dark card; `tone` (default) on light surfaces. */
  variant?: 'tone' | 'glass';
  className?: string;
}

/** Person photo, or a tinted silhouette placeholder until one exists. */
export function Portrait({ name, photo, figure, tone, variant = 'tone', className }: PortraitProps) {
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
          {figure === 'female' ? (
            <>
              <path d="M50 22c-12 0-19 9-19 21 0 10-1 18-4 27h46c-3-9-4-17-4-27 0-12-7-21-19-21z" />
              <path d="M16 104c0-24 15-38 34-38s34 14 34 38z" />
            </>
          ) : figure === 'male' ? (
            <>
              <circle cx="50" cy="39" r="17" />
              <path d="M10 104c0-26 17-40 40-40s40 14 40 40z" />
            </>
          ) : (
            <>
              <circle cx="50" cy="40" r="16" />
              <path d="M14 104c0-24 16-38 36-38s36 14 36 38z" />
            </>
          )}
        </svg>
      )}
    </span>
  );
}
