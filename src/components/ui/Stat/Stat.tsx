import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import s from './Stat.module.css';

interface StatProps {
  /** Displayed value (also the no-JS fallback when counting up). */
  value: ReactNode;
  label: ReactNode;
  /** Numeric target for the count-up animation. */
  count?: number | string;
  suffix?: string;
  /** Box style: sunken (canvas), surface (white), soft (tone tint), plain (no box). */
  variant?: 'sunken' | 'surface' | 'soft' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  /** Value colour; defaults to brand green. */
  ink?: string;
  /** Background for the `soft` variant. */
  soft?: string;
  className?: string;
}

/** Key figure with a caption — "90% Faster processing times". */
export function Stat({
  value,
  label,
  count,
  suffix,
  variant = 'sunken',
  size = 'md',
  ink,
  soft,
  className
}: StatProps) {
  const vars = { ...(ink && { '--stat-ink': ink }), ...(soft && { '--stat-bg': soft }) } as CSSProperties;
  return (
    <div className={cx(s.stat, s[variant], s[size], className)} style={vars}>
      <span
        className={s.value}
        data-count={count !== undefined ? String(count) : undefined}
        data-suffix={count !== undefined ? suffix : undefined}
      >
        {value}
      </span>
      <span className={s.label}>{label}</span>
    </div>
  );
}
