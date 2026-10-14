import type { CSSProperties } from 'react';
import type { Tone } from '@/types';
import { cx } from '@/lib/cx';
import { initials as toInitials } from '@/lib/initials';
import s from './Avatar.module.css';

interface AvatarProps {
  name: string;
  /** Override the derived initials. */
  initials?: string;
  tone?: Tone;
  /** md 56 · xl 84 (glass, for dark cards) */
  size?: 'md' | 'xl';
  className?: string;
}

/** Initials avatar — stands in for portraits until real photos are supplied. */
export function Avatar({ name, initials, tone, size = 'md', className }: AvatarProps) {
  const vars = tone ? ({ '--avatar-bg': tone.soft, '--avatar-ink': tone.ink } as CSSProperties) : undefined;
  return (
    <span aria-hidden="true" className={cx(s.avatar, s[size], className)} style={vars}>
      {initials ?? toInitials(name)}
    </span>
  );
}
