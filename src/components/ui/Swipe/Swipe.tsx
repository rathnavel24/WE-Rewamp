import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode
} from 'react';
import { cx } from '@/lib/cx';
import { prefersReducedMotion } from '@/lib/motion';
import { Icon } from '../Icon';
import s from './Swipe.module.css';

/** After an arrow press or a swipe, the row holds still this long before drifting on. */
const HOLD_MS = 2500;
const ARROW_MS = 800;

interface SwipeProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the carousel for screen readers, e.g. "Our team". */
  label: string;
  /** Cards in view on desktops. */
  view?: number;
  /** Slide width on phones as a % of the row; the rest shows the next card peeking in. */
  peek?: number;
  /** Drift speed in px per second. */
  speed?: number;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/**
 * An endless row of equal cards that drifts slowly on its own: `view` in sight on desktops, two on tablets, and one with
 * the next peeking in on phones. It pauses under the pointer or keyboard focus and off-screen; arrows, arrow keys, a drag
 * or a swipe move it by hand. It only moves by hand under prefers-reduced-motion. The cards are rendered twice (the copy hidden from assistive tech) so the loop has no seam.
 */
export function Swipe({ label, view = 3, peek = 86, speed = 30, className, style, children, ...rest }: SwipeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [drifts] = useState(() => !prefersReducedMotion());
  const count = Children.count(children);
  const motion = useRef({
    x: 0,
    tween: null as { from: number; to: number; start: number } | null,
    drag: null as { pointerX: number; x: number } | null,
    holdUntil: 0,
    hovered: false,
    focused: false,
    visible: true,
    /** One full set of cards, the visible width, and one card plus its gap. */
    setWidth: 0,
    viewWidth: 0,
    slide: 0
  });

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;
    const m = motion.current;
    const measure = () => {
      const css = getComputedStyle(track);
      m.setWidth = set.getBoundingClientRect().width;
      m.viewWidth = track.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight);
      m.slide = m.setWidth / count;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    const io = new IntersectionObserver(([entry]) => {
      m.visible = entry.isIntersecting;
    });
    io.observe(track);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [count]);

  useEffect(() => {
    const m = motion.current;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // A background tab stops the frames; don't leap forward on return.
      const seconds = Math.min(now - last, 50) / 1000;
      last = now;
      if (!m.setWidth) return;
      if (m.tween) {
        const p = Math.min(1, (now - m.tween.start) / ARROW_MS);
        m.x = m.tween.from + (m.tween.to - m.tween.from) * (1 - (1 - p) ** 3);
        if (p === 1) m.tween = null;
      } else if (drifts && !m.hovered && !m.focused && !m.drag && m.visible && now >= m.holdUntil) {
        m.x += speed * seconds;
      }
      const x = ((m.x % m.setWidth) + m.setWidth) % m.setWidth;
      rowRef.current?.style.setProperty('transform', `translate3d(${-x}px, 0, 0)`);
      progressRef.current?.style.setProperty('--swipe-at', String(x / m.setWidth));
      progressRef.current?.style.setProperty('--swipe-size', String(m.viewWidth / m.setWidth));
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [drifts, speed]);

  /** Moves one full view, landing with a card flush to the left edge. */
  const move = (direction: 1 | -1) => {
    const m = motion.current;
    if (!m.slide) return;
    const from = m.tween ? m.tween.to : m.x;
    const edge = direction > 0 ? Math.floor(from / m.slide + 0.001) : Math.ceil(from / m.slide - 0.001);
    const inView = Math.max(1, Math.round(m.viewWidth / m.slide));
    const to = (edge + direction * inView) * m.slide;
    const now = performance.now();
    m.holdUntil = now + HOLD_MS;
    if (prefersReducedMotion()) {
      m.tween = null;
      m.x = to;
    } else {
      m.tween = { from: m.x, to, start: now };
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const m = motion.current;
    m.tween = null;
    m.drag = { pointerX: e.clientX, x: m.x };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const m = motion.current;
    if (m.drag) m.x = m.drag.x - (e.clientX - m.drag.pointerX);
  };
  const onPointerEnd = () => {
    const m = motion.current;
    if (!m.drag) return;
    m.drag = null;
    m.holdUntil = performance.now() + HOLD_MS;
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    move(e.key === 'ArrowRight' ? 1 : -1);
  };

  return (
    <div
      className={s.swipe}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') motion.current.hovered = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') motion.current.hovered = false;
      }}
      onFocus={(e) => {
        if (e.target.matches(':focus-visible')) motion.current.focused = true;
      }}
      onBlur={() => {
        motion.current.focused = false;
      }}
    >
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={cx(s.track, className)}
        style={{ '--swipe-desktop': view, '--swipe-peek': peek, ...style } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={onKeyDown}
      >
        <div ref={rowRef} className={s.row}>
          <div ref={setRef} data-stagger-group="" className={s.set} {...rest}>
            {children}
          </div>
          <div aria-hidden="true" inert className={s.set}>
            {children}
          </div>
        </div>
      </div>
      <div className={s.controls}>
        <span ref={progressRef} className={s.progress} aria-hidden="true">
          <span className={s.bar} />
          <span className={cx(s.bar, s.barWrap)} />
        </span>
        <div className={s.buttons}>
          <button type="button" className={s.button} aria-label="Show previous" onClick={() => move(-1)}>
            <Icon name="arrow_back" size={20} />
          </button>
          <button type="button" className={s.button} aria-label="Show next" onClick={() => move(1)}>
            <Icon name="arrow_forward" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
