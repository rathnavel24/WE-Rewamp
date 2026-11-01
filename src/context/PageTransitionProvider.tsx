import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { EASE, holdReveals, prefersReducedMotion, releaseReveals } from '@/lib/motion';
import { scrollToAnchor } from '@/lib/scroll';
import logo from '@/assets/brand/walletedge-logo.png';
import { PageTransitionContext } from './PageTransitionContext';

const INTRO_KEY = 'we-intro';

/** Intro timeline (ms): the logo rises in, holds while the line fills, then the curtain dissolves into the page. */
const INTRO = { reveal: 900, hold: 2000, lift: 1000 };

const fade = (el: HTMLElement, from: number, to: number, duration: number, easing = EASE) =>
  el.animate([{ opacity: from }, { opacity: to }], { duration, easing, fill: 'forwards' });

/**
 * Full-screen cream curtain with the WalletEdge mark. Landing on Home opens with a logo intro (about two seconds),
 * once per visit; deep links and later loads just fade in. Route changes fade it in and out around the swap.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const introPlayed = useRef(false);

  useEffect(() => {
    const curtain = curtainRef.current;
    const mark = markRef.current;
    const logoImg = logoRef.current;
    const line = lineRef.current;
    if (!curtain || !mark || !logoImg || !line || introPlayed.current) return;
    introPlayed.current = true;

    if (prefersReducedMotion()) {
      curtain.style.opacity = '0';
      return;
    }

    // Visitors arriving on an inner page (a shared link, an ad) shouldn't wait behind the intro.
    let intro = window.location.pathname === '/';
    try {
      intro &&= !sessionStorage.getItem(INTRO_KEY);
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable: play it */
    }
    if (!intro) {
      mark.style.opacity = '0';
      fade(curtain, 1, 0, 600);
      return;
    }

    // The first screen's reveals wait for the curtain, so the page animates in as the curtain clears.
    holdReveals();
    curtain.style.pointerEvents = 'auto';

    logoImg.animate(
      [
        { clipPath: 'inset(100% 0 0 0)', transform: 'translateY(16px)' },
        { clipPath: 'inset(0 0 0 0)', transform: 'none' }
      ],
      { duration: INTRO.reveal, easing: EASE, fill: 'both' }
    );
    line.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: INTRO.hold - INTRO.reveal / 2,
      delay: INTRO.reveal / 2,
      easing: 'cubic-bezier(.65,0,.35,1)',
      fill: 'both'
    });

    // Exit: the mark drifts up and fades, then the curtain dissolves as the first screen rises in beneath it.
    mark.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(-24px) scale(1.04)' }
      ],
      { duration: INTRO.lift * 0.6, delay: INTRO.hold, easing: 'ease-in', fill: 'forwards' }
    );
    curtain.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: INTRO.lift,
      delay: INTRO.hold + 150,
      easing: EASE,
      fill: 'forwards'
    });
    // Not cleared on unmount: the provider lives as long as the app, and StrictMode's dev remount must not cancel it.
    window.setTimeout(() => {
      curtain.style.pointerEvents = 'none';
      releaseReveals();
    }, INTRO.hold + 350);
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
        <div ref={markRef} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-8)' }}>
          <img ref={logoRef} src={logo} alt="" style={{ width: 'min(400px,75vw)', height: 'auto', display: 'block' }} />
          <span
            style={{
              width: 'min(180px,40vw)',
              height: 3,
              borderRadius: 3,
              background: 'var(--border-subtle)',
              overflow: 'hidden'
            }}
          >
            <span
              ref={lineRef}
              style={{
                display: 'block',
                height: '100%',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))'
              }}
            />
          </span>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
