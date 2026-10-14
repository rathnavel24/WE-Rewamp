import { Suspense, useEffect, type ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from './ErrorBoundary';
import { APP_ROUTES, preloadRoutes } from './routes';

/** Wraps each page: its own error boundary (reset on navigation) and a loading boundary. */
function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary key={pathname}>
      {/* Pages are preloaded, so this fallback is only seen on a very slow first visit. */}
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export function App() {
  useEffect(preloadRoutes, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        {APP_ROUTES.map(({ path, Page }) => (
          <Route
            key={path ?? 'index'}
            index={path === undefined}
            path={path}
            element={
              <PageShell>
                <Page />
              </PageShell>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}
