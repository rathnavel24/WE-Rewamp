import { useEffect } from 'react';
import { scan } from '@/lib/motion';

/**
 * Keeps the motion engine in sync with the DOM: scans on mount and again (debounced)
 * whenever React adds nodes — new routes, filtered lists, toggled panels.
 */
export function useMotion() {
  useEffect(() => {
    scan(document);
    let t: number | undefined;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(() => scan(document), 60);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(t);
      mo.disconnect();
    };
  }, []);
}
