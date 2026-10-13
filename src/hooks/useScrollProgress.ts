import { useEffect, useState } from 'react';

/** Scroll offset in px and overall page progress (0–1). */
export function useScrollProgress() {
  const [state, setState] = useState({ y: 0, progress: 0 });
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setState({ y: window.scrollY, progress: h > 0 ? window.scrollY / h : 0 });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return state;
}
