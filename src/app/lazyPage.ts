import { lazy, type ComponentType } from 'react';

export type LazyPage = ReturnType<typeof lazy<ComponentType>> & {
  /** Starts downloading the page's code without rendering it. */
  preload: () => Promise<unknown>;
};

/**
 * Code-split a page that uses a named export:
 *   lazyPage(() => import('@/pages/Team/TeamPage'), 'TeamPage')
 */
export function lazyPage<M extends Record<string, unknown>, K extends keyof M & string>(
  load: () => Promise<M>,
  name: K
): LazyPage {
  const loader = () => load().then((m) => ({ default: m[name] as ComponentType }));
  return Object.assign(lazy(loader), { preload: loader });
}
