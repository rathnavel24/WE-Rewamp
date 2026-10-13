import type { CSSProperties } from 'react';
import type { Tone } from '@/types';
import { cx } from '@/utils/cx';
import s from './Tile.module.css';

export type TileSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface TileProps {
  icon: string;
  /** xs 32 · sm 40 · md 48 · lg 56 · xl 64 */
  size?: TileSize;
  /** Brand tone; `solid` uses the accent fill with white ink, otherwise the soft tint. */
  tone?: Tone;
  solid?: boolean;
  /** Neutral canvas fill with an accent glyph. */
  neutral?: boolean;
  round?: boolean;
  className?: string;
}

/** Rounded square holding a Material icon — the design's most-repeated element. */
export function Tile({ icon, size = 'md', tone, solid, neutral, round, className }: TileProps) {
  const vars = tone
    ? ({ '--tile-bg': solid ? tone.accent : tone.soft, '--tile-ink': solid ? 'var(--white)' : tone.ink } as CSSProperties)
    : undefined;
  return (
    <span aria-hidden="true" className={cx(s.tile, s[size], neutral && s.neutral, round && s.round, className)} style={vars}>
      {icon}
    </span>
  );
}
