import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { usePageTransition } from '@/context/PageTransitionContext';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Internal path ("/services#consulting"), same-page anchor ("#financial"), or external URL. */
  to: string;
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/i.test(href);

/**
 * Drop-in `<a>` for the whole site. Internal links route through the page-transition
 * curtain; anchors smooth-scroll; external / modified clicks behave natively.
 */
export function AppLink({ to, onClick, target, ...rest }: AppLinkProps) {
  const { go } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (target === '_blank' || isExternal(to)) return;
    e.preventDefault();
    go(to);
  };

  const external = target === '_blank' ? { rel: rest.rel ?? 'noopener noreferrer' } : {};
  return <a href={to} target={target} onClick={handleClick} {...external} {...rest} />;
}
