import { describe, expect, it } from 'vitest';
import { toChatEvent } from './api';

describe('toChatEvent', () => {
  it('maps delta, done and error events', () => {
    expect(toChatEvent({ event: 'delta', data: '{"text":"Hi"}' })).toEqual({ type: 'delta', text: 'Hi' });
    expect(toChatEvent({ event: 'done', data: '{}' })).toEqual({ type: 'done' });
    expect(toChatEvent({ event: 'error', data: '{"message":"Rate limited"}' })).toEqual({
      type: 'error',
      message: 'Rate limited'
    });
  });

  it('gives a fallback message for malformed errors', () => {
    expect(toChatEvent({ event: 'error', data: 'oops' })).toMatchObject({ type: 'error' });
  });

  it('skips unknown events and malformed deltas', () => {
    expect(toChatEvent({ event: 'ping', data: '{}' })).toBeNull();
    expect(toChatEvent({ event: 'delta', data: 'not json' })).toBeNull();
  });
});
