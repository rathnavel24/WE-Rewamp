import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { scrollToAnchor } from '@/context/PageTransitionContext';
import { useMotion } from '@/hooks/useMotion';
import { SiteFooter } from './SiteFooter';
import { SiteNav } from './SiteNav';

export function Layout() {
  useMotion();
  const { hash } = useLocation();

  // Deep links like /services#consulting: scroll once the page has rendered.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => scrollToAnchor(hash.slice(1)), 350);
    return () => window.clearTimeout(t);
    // Only on first load — in-app anchor navigation is handled by the transition.
  }, []);

  return (
    <>
      <SiteNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
