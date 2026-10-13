import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import { AppLink } from './AppLink';
import s from './Card.module.css';

export type CardVariant =
  | 'surface'       // white + hairline — default on the canvas
  | 'sunken'        // canvas fill — nested inside a white panel
  | 'primary-soft'  // mint tint
  | 'accent-soft'   // peach tint
  | 'accent'        // solid orange
  | 'inverse'       // forest green panel
  | 'ink'           // near-black panel
  | 'glass';        // translucent tile on a dark panel

export type CardPadding = 'sm' | 'md' | 'lg' | 'xl';

interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Hover lift (+ shadow on light surfaces). Links are always interactive. */
  interactive?: boolean;
  /** Pointer-tracking glow; colour from `glow` (defaults to the primary glow). */
  spotlight?: boolean;
  glow?: string;
  /** Render as a link. */
  to?: string;
  as?: 'div' | 'article' | 'li' | 'section';
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/**
 * Container for grouped content. Padding scale drives the radius so nested
 * cards always read correctly: sm 20/16 · md 28/22 · lg ≤48/28 · xl ≤64/36.
 */
export function Card({
  variant = 'surface',
  padding = 'md',
  interactive,
  spotlight,
  glow,
  to,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: CardProps) {
  const classes = cx(
    s.card,
    s[variant],
    s[`pad-${padding}`],
    (interactive || to) && s.interactive,
    spotlight && s.spotlight,
    className
  );
  const vars = glow ? ({ '--card-glow': glow, ...style } as CSSProperties) : style;
  const spot = spotlight ? { 'data-spot': '1' } : {};

  if (to) {
    return (
      <AppLink to={to} className={classes} style={vars} {...spot} {...rest}>
        {children}
      </AppLink>
    );
  }
  return (
    <Tag className={classes} style={vars} {...spot} {...rest}>
      {children}
    </Tag>
  );
}
