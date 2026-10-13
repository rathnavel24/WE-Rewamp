import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import { AppLink } from './AppLink';
import { Icon } from './Icon';
import s from './Chip.module.css';

export type ChipVariant =
  | 'neutral'      // canvas fill — tags inside white cards
  | 'surface'      // white with border — on canvas
  | 'outline'      // hairline border, no fill
  | 'primary'      // mint / green
  | 'accent'       // peach / deep orange
  | 'glass'        // translucent on dark
  | 'outline-dark';// hairline on dark

interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  variant?: ChipVariant;
  size?: 'sm' | 'md' | 'lg';
  /** Mono uppercase label style (sector, country, meta). */
  mono?: boolean;
  icon?: string;
  /** Leading slot (e.g. a Tile) — takes precedence over `icon`. */
  leading?: ReactNode;
  /** Makes the chip a link with hover affordance. */
  to?: string;
  /** Renders a toggle button; pass `selected` for pressed state. */
  onToggle?: () => void;
  selected?: boolean;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

const ICON_SIZE = { sm: 15, md: 17, lg: 19 } as const;

/** Small labelled pill: tags, badges, filters, toggles. */
export function Chip({ variant = 'neutral', size = 'md', mono, icon, leading, to, onToggle, selected, className, children, ...rest }: ChipProps) {
  const classes = cx(s.chip, s[variant], s[size], mono && s.mono, (to || onToggle) && s.interactive, selected && s.selected, className);
  const content = (
    <>
      {leading ?? (icon && <Icon name={icon} size={ICON_SIZE[size]} className={s.icon} />)}
      {children}
    </>
  );

  if (to) {
    return (
      <AppLink to={to} className={classes} {...rest}>
        {content}
      </AppLink>
    );
  }
  if (onToggle) {
    return (
      <button type="button" aria-pressed={!!selected} className={classes} onClick={onToggle} {...rest}>
        {content}
      </button>
    );
  }
  return (
    <span className={classes} {...rest}>
      {content}
    </span>
  );
}
