import { lazyPage, type LazyPage } from './lazyPage';

export interface AppRoute {
  /** React Router path (relative to the layout). Omit for the index route. */
  path?: string;
  Page: LazyPage;
}

/**
 * Every page of the site. To add one: create src/pages/<Name>/<Name>Page.tsx, add a line
 * here, and (if it's linked) add its path builder to src/config/routes.ts.
 * Pages are code-split and preloaded in the background after the first paint.
 */
export const APP_ROUTES: AppRoute[] = [
  { Page: lazyPage(() => import('@/pages/Home/HomePage'), 'HomePage') },
  { path: 'services', Page: lazyPage(() => import('@/pages/Services/ServicesPage'), 'ServicesPage') },
  { path: 'companies', Page: lazyPage(() => import('@/pages/Companies/CompaniesPage'), 'CompaniesPage') },
  { path: 'team', Page: lazyPage(() => import('@/pages/Team/TeamPage'), 'TeamPage') },
  { path: 'contact', Page: lazyPage(() => import('@/pages/Contact/ContactPage'), 'ContactPage') },
  { path: 'ventures/:id', Page: lazyPage(() => import('@/pages/Venture/VenturePage'), 'VenturePage') },
  { path: 'design-system', Page: lazyPage(() => import('@/pages/DesignSystem/DesignSystemPage'), 'DesignSystemPage') },
  { path: '*', Page: lazyPage(() => import('@/pages/NotFound/NotFoundPage'), 'NotFoundPage') }
];

/** Download every page in the background, so later navigations never wait on the network. */
export function preloadRoutes() {
  const run = () => APP_ROUTES.forEach((r) => void r.Page.preload());
  // Safari has no requestIdleCallback.
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(run, { timeout: 3000 });
  else setTimeout(run, 1500);
}
