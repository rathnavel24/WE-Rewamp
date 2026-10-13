/**
 * Declarative motion engine — a typed port of the design's `we-motion.js`.
 *
 * Components opt in with data attributes; `scan()` wires them up once per element:
 *   data-reveal="up|fade|scale|left|right|blur" [data-delay]   reveal on scroll
 *   data-stagger="90" [data-type]                             reveal children in sequence
 *   data-count="90" [data-suffix] [data-prefix]               count up on scroll
 *   data-marquee="left|right" [data-speed]                    infinite horizontal scroll
 *   data-roller="2300"                                        vertical word rotator
 *   data-orbit="70" [data-reverse]                            slow rotation (children with data-orbit-counter stay upright)
 *   data-float="8"                                            gentle bobbing
 *   data-pulse="0"                                            radar ping
 *   data-flow="3600" [data-delay]                             light streak along a line
 *   data-spot                                                 pointer-tracking spotlight (--mx / --my)
 */

export const EASE = 'cubic-bezier(.16,1,.3,1)';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type RevealType = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'blur';

const FROM: Record<RevealType, Keyframe> = {
  up: { opacity: 0, transform: 'translateY(28px)' },
  fade: { opacity: 0, transform: 'none' },
  scale: { opacity: 0, transform: 'scale(.94)' },
  left: { opacity: 0, transform: 'translateX(-28px)' },
  right: { opacity: 0, transform: 'translateX(28px)' },
  blur: { opacity: 0, transform: 'translateY(14px)', filter: 'blur(10px)' }
};

/** Elements already wired, per behaviour. */
const wired = new Map<string, WeakSet<Element>>();
const once = (key: string, el: Element): boolean => {
  let set = wired.get(key);
  if (!set) wired.set(key, (set = new WeakSet()));
  if (set.has(el)) return false;
  set.add(el);
  return true;
};

/** Callbacks fired the first time an element scrolls into view. */
const onEnter = new WeakMap<Element, Array<() => void>>();

let observer: IntersectionObserver | null = null;
const io = (): IntersectionObserver => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          observer!.unobserve(e.target);
          onEnter.get(e.target)?.forEach((fn) => fn());
          onEnter.delete(e.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
  }
  return observer;
};

const whenVisible = (el: Element, fn: () => void) => {
  const list = onEnter.get(el) ?? [];
  list.push(fn);
  onEnter.set(el, list);
  io().observe(el);
};

const num = (v: string | undefined, fallback: number) => {
  const n = parseFloat(v ?? '');
  return Number.isFinite(n) ? n : fallback;
};

function reveal(el: HTMLElement, type: string, delay: number) {
  if (prefersReducedMotion()) return;
  const from = FROM[type as RevealType] ?? FROM.up;
  const to: Keyframe = { opacity: 1, transform: 'none' };
  if (from.filter) to.filter = 'blur(0)';
  const a = el.animate([from, to], { duration: 1000, delay, easing: EASE, fill: 'both' });
  a.pause();
  a.onfinish = () => a.cancel();
  whenVisible(el, () => a.play());
}

const formatCount = (v: number, dec: number) => v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function count(el: HTMLElement) {
  const raw = el.dataset.count ?? '0';
  const target = parseFloat(raw);
  const dec = (raw.split('.')[1] || '').length;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  if (prefersReducedMotion()) {
    el.textContent = prefix + target.toLocaleString() + suffix;
    return;
  }
  el.textContent = prefix + (0).toFixed(dec) + suffix;
  whenVisible(el, () => {
    const t0 = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const v = target * (1 - Math.pow(1 - p, 4));
      el.textContent = prefix + formatCount(v, dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function marquee(el: HTMLElement) {
  const dir = el.dataset.marquee === 'right' ? -1 : 1;
  const dur = num(el.dataset.speed, 40) * 1000;
  const kf =
    dir > 0
      ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }]
      : [{ transform: 'translateX(-50%)' }, { transform: 'translateX(0)' }];
  const a = el.animate(kf, { duration: dur, iterations: Infinity });
  if (prefersReducedMotion()) a.pause();
  el.addEventListener('mouseenter', () => a.updatePlaybackRate(0.25));
  el.addEventListener('mouseleave', () => a.updatePlaybackRate(1));
}

function roller(el: HTMLElement) {
  const inner = el.firstElementChild as HTMLElement | null;
  if (!inner) return;
  const n = inner.children.length - 1; // last child duplicates the first
  if (n < 1 || prefersReducedMotion()) return;
  let i = 0;
  const hold = num(el.dataset.roller, 2400);
  const timer = window.setInterval(() => {
    if (!el.isConnected) {
      window.clearInterval(timer);
      return;
    }
    const from = i;
    i++;
    const a = inner.animate(
      [{ transform: `translateY(${(-from * 100) / (n + 1)}%)` }, { transform: `translateY(${(-i * 100) / (n + 1)}%)` }],
      { duration: 700, easing: EASE, fill: 'forwards' }
    );
    if (i === n) {
      a.onfinish = () => {
        i = 0;
        inner.animate([{ transform: 'translateY(0)' }], { duration: 0, fill: 'forwards' });
      };
    }
  }, hold);
}

function orbit(el: HTMLElement) {
  const dur = num(el.dataset.orbit, 60) * 1000;
  const rev = el.dataset.reverse ? -1 : 1;
  const a = el.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * rev}deg)` }], { duration: dur, iterations: Infinity });
  const kids = Array.from(el.querySelectorAll<HTMLElement>('[data-orbit-counter]')).map((k) =>
    k.animate([{ transform: 'rotate(0deg)' }, { transform: `rotate(${-360 * rev}deg)` }], { duration: dur, iterations: Infinity })
  );
  if (prefersReducedMotion()) [a, ...kids].forEach((x) => x.pause());
}

function float(el: HTMLElement) {
  if (prefersReducedMotion()) return;
  const amp = num(el.dataset.float, 10);
  el.animate(
    [{ transform: 'translateY(0)' }, { transform: `translateY(${-amp}px)` }, { transform: 'translateY(0)' }],
    { duration: 5000 + Math.random() * 2000, iterations: Infinity, easing: 'ease-in-out', delay: -Math.random() * 4000 }
  );
}

function pulse(el: HTMLElement) {
  if (prefersReducedMotion()) return;
  el.animate(
    [{ transform: 'scale(1)', opacity: 0.55 }, { transform: 'scale(2.6)', opacity: 0 }],
    { duration: 2200, iterations: Infinity, easing: 'ease-out', delay: num(el.dataset.pulse, 0) }
  );
}

function flow(el: HTMLElement) {
  if (prefersReducedMotion()) return;
  el.animate([{ transform: 'translateX(-100%)' }, { transform: 'translateX(400%)' }], {
    duration: num(el.dataset.flow, 3200),
    iterations: Infinity,
    easing: 'cubic-bezier(.6,0,.4,1)',
    delay: num(el.dataset.delay, 0)
  });
}

function spot(el: HTMLElement) {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
  });
}

const BEHAVIOURS: Array<[key: string, fn: (el: HTMLElement) => void]> = [
  ['count', count],
  ['marquee', marquee],
  ['roller', roller],
  ['orbit', orbit],
  ['float', float],
  ['pulse', pulse],
  ['flow', flow],
  ['spot', spot]
];

/** Wire up every not-yet-wired motion element under `root`. Safe to call repeatedly. */
export function scan(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (!once('reveal', el)) return;
    reveal(el, el.dataset.reveal ?? 'up', num(el.dataset.delay, 0));
  });

  root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((el) => {
    if (!once('stagger', el)) return;
    const gap = num(el.dataset.stagger, 90);
    Array.from(el.children).forEach((c, i) => {
      if (!once('reveal', c)) return;
      reveal(c as HTMLElement, el.dataset.type || 'up', i * gap);
    });
  });

  BEHAVIOURS.forEach(([key, fn]) => {
    root.querySelectorAll<HTMLElement>(`[data-${key}]`).forEach((el) => {
      if (once(key, el)) fn(el);
    });
  });
}
