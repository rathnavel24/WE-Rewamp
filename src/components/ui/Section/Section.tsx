import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import s from './Section.module.css';

export type SectionSpace = 'none' | 'sm' | 'md' | 'hero';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Top padding: hero clears the fixed nav; md is the default section rhythm. */
  pt?: SectionSpace;
  pb?: SectionSpace;
  /** `inverse` = full-bleed forest band with light text; `surface` = full-bleed white band, to break up long pages. */
  tone?: 'canvas' | 'surface' | 'inverse';
  /** Wrap children in `.container` (default). Set false for full-bleed content. */
  contained?: boolean;
  /** Class for the inner container. */
  innerClassName?: string;
  /** Vertical gap between the container's direct children. */
  gap?: 'none' | 'md' | 'lg';
  /** Landing band: on desktop it fills the first screen exactly, with its content centred in it. */
  fill?: boolean;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/** Page band. Owns vertical rhythm and the content column so pages never hand-roll padding. */
export function Section({
  pt = 'md',
  pb = 'md',
  tone = 'canvas',
  contained = true,
  innerClassName,
  gap = 'lg',
  fill = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cx(
        s.section,
        s[`pt-${pt}`],
        s[`pb-${pb}`],
        fill && s.fill,
        tone === 'inverse' && cx(s.inverse, 'on-dark'),
        tone === 'surface' && s.surface,
        className
      )}
      {...rest}
    >
      {contained ? (
        <div className={cx('container', s.inner, s[`gap-${gap}`], innerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
