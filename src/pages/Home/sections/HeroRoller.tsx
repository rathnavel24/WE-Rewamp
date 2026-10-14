import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties } from 'react';
import type { HeroSector } from '@/content/hero';
import { cx } from '@/lib/cx';
import { prefersReducedMotion } from '@/lib/motion';
import s from './HeroRoller.module.css';

/** How long each word stays before the next one rolls in. */
const HOLD_MS = 2600;

interface HeroRollerProps {
  sectors: HeroSector[];
  index: number;
  previous: number | null;
  /** The underline timer filled up — show the next word. */
  onNext: () => void;
  /** The outgoing word finished leaving. */
  onLeft: () => void;
}

/**
 * Headline word rotator. Letters rise into place one by one from behind a baseline mask while
 * the previous word lifts away; the underline fills as a timer and triggers the next word.
 * Pauses off-screen. Decorative: the headline carries a screen-reader sentence instead.
 */
export function HeroRoller({ sectors, index, previous, onNext, onLeft }: HeroRollerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const [animated] = useState(() => !prefersReducedMotion());
  const [firstIndex] = useState(index);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animated) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [animated]);

  return (
    <span ref={ref} aria-hidden="true" className={cx(s.roller, animated && s.animated, !visible && s.paused)}>
      {animated && previous !== null && (
        <Word key={`out-${previous}`} sector={sectors[previous]} leaving onDone={onLeft} />
      )}
      <Word
        key={`in-${index}`}
        sector={sectors[index]}
        // The very first word waits for the headline's own reveal before typing in.
        delayMs={index === firstIndex && previous === null ? 450 : 260}
        onDone={animated ? onNext : undefined}
      />
    </span>
  );
}

interface WordProps {
  sector: HeroSector;
  leaving?: boolean;
  delayMs?: number;
  onDone?: () => void;
}

function Word({ sector, leaving, delayMs = 0, onDone }: WordProps) {
  const letters = Array.from(sector.word);
  const style = { '--tone': sector.tone.accent, '--delay': `${delayMs}ms`, '--hold': `${HOLD_MS}ms` } as CSSProperties;

  // Leaving: done when the last letter has gone. Entering: done when the underline timer is full.
  const onLetterEnd = (e: AnimationEvent<HTMLSpanElement>) => {
    if (leaving && e.target === e.currentTarget.lastElementChild) onDone?.();
  };
  const onTimerEnd = (e: AnimationEvent<HTMLSpanElement>) => {
    if (!leaving && e.target === e.currentTarget) onDone?.();
  };

  return (
    <span className={cx(s.word, leaving && s.leaving)} style={style}>
      <span className={s.letters} onAnimationEnd={onLetterEnd}>
        {letters.map((ch, i) => (
          <span key={i} className={s.letter} style={{ '--i': i } as CSSProperties}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
      <span className={s.track}>
        <span className={s.timer} onAnimationEnd={onTimerEnd} />
      </span>
    </span>
  );
}
