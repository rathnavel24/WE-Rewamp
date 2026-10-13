import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import { AppLink } from './AppLink';
import { Icon } from './Icon';
import s from './Button.module.css';

export type ButtonVariant =
  | 'primary'      // ink fill → green on hover. Default call to action.
  | 'accent'       // orange fill. Highest-emphasis action on dark panels.
  | 'secondary'    // white with border. Pairs with primary.
  | 'inverse'      // white fill on dark backgrounds.
  | 'outline-dark' // hairline outline on dark backgrounds.
  | 'link';        // underlined text link with arrow.

export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing Material icon, e.g. "arrow_forward". */
  icon?: string;
  /** Leading Material icon. */
  iconStart?: string;
  /** Stretch to full width with label left / icon right. */
  block?: boolean;
  className?: string;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

type LinkProps = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & { to: string };
type NativeProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { to?: undefined };

export type ButtonProps = LinkProps | NativeProps;

const ICON_SIZE: Record<ButtonSize, number> = { sm: 17, md: 19, lg: 21 };

/** The one button. Renders an `AppLink` when `to` is set, otherwise a native `<button>`. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconStart, block, className, children, ...rest } = props;
  const classes = cx(s.button, s[variant], variant !== 'link' && s[size], block && s.block, className);
  const iconSize = ICON_SIZE[size];
  const content = (
    <>
      {iconStart && <Icon name={iconStart} size={iconSize} />}
      <span className={s.label}>{children}</span>
      {icon && <Icon name={icon} size={iconSize} className={s.trailing} />}
    </>
  );

  if (rest.to !== undefined) {
    const { to, ...anchor } = rest as LinkProps;
    return (
      <AppLink to={to} className={classes} {...anchor}>
        {content}
      </AppLink>
    );
  }
  const { type = 'button', ...native } = rest as NativeProps;
  return (
    <button type={type} className={classes} {...native}>
      {content}
    </button>
  );
}
