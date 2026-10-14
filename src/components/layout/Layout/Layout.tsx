import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { scrollToAnchor } from '@/lib/scroll';
import { useMotion } from '@/hooks/useMotion';
import { SiteFooter } from '../SiteFooter';
import { SiteNav } from '../SiteNav';

export function Layout() {
  useMotion();

  // Deep links like /services#consulting: scroll once the page has rendered. First load only —
  // in-app anchor navigation is handled by the page transition.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => scrollToAnchor(id), 350);
    return () => window.clearTimeout(t);
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
