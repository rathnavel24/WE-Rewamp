import type { Tone } from '@/types';

export const GREEN: Tone = { accent: '#03643B', ink: '#03643B', soft: '#E7F0EB', glow: 'rgba(3,100,59,.10)' };
export const ORANGE: Tone = { accent: '#CF5512', ink: '#B04508', soft: '#FBEBDD', glow: 'rgba(207,85,18,.12)' };

/** Alternates green / orange by index, the rhythm used throughout the design. */
export const alternate = (i: number): Tone => (i % 2 ? ORANGE : GREEN);
