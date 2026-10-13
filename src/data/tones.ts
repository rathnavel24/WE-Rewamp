import type { Tone } from '@/types';

/* Tones reference design tokens (src/styles/tokens.css) so colour lives in one place. */
export const GREEN: Tone = {
  accent: 'var(--color-primary)',
  ink: 'var(--color-primary)',
  soft: 'var(--color-primary-soft)'
};
export const ORANGE: Tone = {
  accent: 'var(--color-accent)',
  ink: 'var(--color-accent-strong)',
  soft: 'var(--color-accent-soft)'
};

/** Alternates green / orange by index, the rhythm used throughout the design. */
export const alternate = (i: number): Tone => (i % 2 ? ORANGE : GREEN);
