import { StrictMode, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PageTransitionProvider } from '@/context/PageTransitionProvider';

/**
 * Every app-wide provider, outermost first. New global concerns (data cache, auth,
 * AI session…) get added here — not scattered through main.tsx or pages.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
