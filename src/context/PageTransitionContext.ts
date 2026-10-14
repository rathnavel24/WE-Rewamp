import { createContext, useContext } from 'react';

export interface PageTransitionValue {
  /** Navigate to an internal path (optionally with #anchor) behind the curtain. */
  go: (href: string) => void;
}

export const PageTransitionContext = createContext<PageTransitionValue | null>(null);

export function usePageTransition(): PageTransitionValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error('usePageTransition must be used inside <PageTransitionProvider>');
  return ctx;
}
