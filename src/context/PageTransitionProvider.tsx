import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { EASE, prefersReducedMotion } from '@/lib/motion';
import { scrollToAnchor } from '@/lib/scroll';
import logo from '@/assets/brand/walletedge-logo.png';
import { PageTransitionContext } from './PageTransitionContext';

const INTRO_KEY = 'we-intro';

const fade = (el: HTMLElement, from: number, to: number, duration: number, easing = EASE) =>
  el.animate([{ opacity: from }, { opacity: to }], { duration, easing, fill: 'forwards' });

/**
 * Full-screen cream curtain with the WalletEdge mark. Plays a logo reveal on the first
 * visit of a session, and fades in/out around every route change.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const introPlayed = useRef(false);

  useEffect(() => {
    const curtain = curtainRef.current;
    const mark = markRef.current;
    if (!curtain || !mark || introPlayed.current) return;
    introPlayed.current = true;

    let first = false;
    try {
      first = !sessionStorage.getItem(INTRO_KEY);
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable */
    }
    if (prefersReducedMotion()) {
      curtain.style.opacity = '0';
      return;
    }
    if (first) {
      mark.animate(
        [
          { clipPath: 'inset(100% 0 0 0)', transform: 'translateY(16px)' },
          { clipPath: 'inset(0 0 0 0)', transform: 'none' }
        ],
        { duration: 900, easing: EASE, fill: 'both' }
      );
      curtain.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 1350, easing: EASE, fill: 'forwards' });
    } else {
      mark.style.opacity = '0';
      fade(curtain, 1, 0, 600);
    }
  }, []);

  // Restore a hidden curtain when the page comes back from the bfcache.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted && curtainRef.current)
        curtainRef.current.animate([{ opacity: 0 }], { duration: 0, fill: 'forwards' });
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const go = useCallback(
    (href: string) => {
      const [path, anchor] = href.split('#');
      if (!path) {
        if (anchor) scrollToAnchor(anchor);
        return;
      }
      const curtain = curtainRef.current;
      const mark = markRef.current;
      const swap = () => {
        navigate(path + (anchor ? `#${anchor}` : ''));
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (anchor) window.setTimeout(() => scrollToAnchor(anchor), 350);
      };
      if (!curtain || !mark) return swap();
      mark.style.opacity = '0';
      fade(curtain, 0, 1, prefersReducedMotion() ? 0 : 320, 'ease-in').onfinish = () => {
        swap();
        window.setTimeout(() => fade(curtain, 1, 0, 600), 120);
      };
    },
    [navigate]
  );

  const value = useMemo(() => ({ go }), [go]);

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-canvas)',
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <img ref={markRef} src={logo} alt="" style={{ width: 'min(280px,60vw)', height: 'auto', display: 'block' }} />
      </div>
    </PageTransitionContext.Provider>
  );
}
