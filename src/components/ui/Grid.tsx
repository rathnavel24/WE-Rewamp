import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import s from './Grid.module.css';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Minimum column width in px; columns are added as space allows. */
  min: number;
  /** Fixed max number of columns (keeps rows even, e.g. 3 for 9 items). */
  max?: number;
  gap?: 'sm' | 'md' | 'lg';
  /** `fill` keeps empty tracks (cards don't stretch when few). Default `fit`. */
  mode?: 'fit' | 'fill';
  align?: 'stretch' | 'start' | 'end' | 'center';
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/** Responsive auto-column grid. Collapses to one column below `min`. */
export function Grid({ min, max, gap = 'md', mode = 'fit', align, className, style, children, ...rest }: GridProps) {
  const vars = { '--grid-min': `${min}px`, ...(max && { '--grid-max': max }), ...(align && { alignItems: align }), ...style } as CSSProperties;
  return (
    <div className={cx(s.grid, s[gap], mode === 'fill' && s.fill, !!max && s.capped, className)} style={vars} {...rest}>
      {children}
    </div>
  );
}
