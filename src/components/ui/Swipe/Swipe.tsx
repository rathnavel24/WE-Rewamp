import { Children, useEffect, useRef, useState, type ComponentProps } from 'react';
import { cx } from '@/lib/cx';
import { Grid } from '../Grid';
import s from './Swipe.module.css';

interface SwipeProps extends Omit<ComponentProps<typeof Grid>, 'ref' | 'pair'> {
  /** Names the carousel for screen readers, e.g. "Our services". */
  label: string;
  /** Slide width on phones as a % of the screen; the rest shows the next card peeking in. */
  peek?: number;
}

/**
 * A `Grid` on tablets and desktops; on phones a horizontal swipe row with scroll snapping,
 * the next card peeking in, and dots that show (and jump to) the current card.
 */
export function Swipe({ label, peek = 86, className, style, children, ...gridProps }: SwipeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  // The card that is mostly in view is the active one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(slides.indexOf(e.target));
      },
      { root: track, threshold: 0.6 }
    );
    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    track.scrollTo({ left: slide.offsetLeft - pad, behavior: 'smooth' });
  };

  return (
    <div className={s.swipe}>
      <Grid
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        data-stagger-group=""
        className={cx(s.track, className)}
        style={{ '--swipe-width': `${peek}%`, ...style } as ComponentProps<typeof Grid>['style']}
        {...gridProps}
      >
        {children}
      </Grid>
      {count > 1 && (
        <div className={s.dots}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              className={cx(s.dot, i === active && s.dotOn)}
              aria-label={`Show item ${i + 1} of ${count}`}
              aria-current={i === active || undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
