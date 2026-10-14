import { useCallback, useState } from 'react';

interface CycleState {
  index: number;
  /** The item being animated out, until `clearPrevious()` is called. */
  previous: number | null;
}

/**
 * Steps through `length` items in a loop and remembers the previous one, so an outgoing
 * item can animate away while the next comes in. Timing is the caller's (e.g. an animation end).
 */
export function useCycle(length: number) {
  const [state, setState] = useState<CycleState>({ index: 0, previous: null });

  const next = useCallback(() => setState((s) => ({ index: (s.index + 1) % length, previous: s.index })), [length]);
  const clearPrevious = useCallback(() => setState((s) => (s.previous === null ? s : { ...s, previous: null })), []);

  return { ...state, next, clearPrevious };
}
