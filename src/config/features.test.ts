import { describe, expect, it } from 'vitest';
import { parseFeatures } from './features';

describe('parseFeatures', () => {
  it('enables known flags from a comma-separated list', () => {
    expect([...parseFeatures(' aiAssistant , ')]).toEqual(['aiAssistant']);
  });

  it('ignores unknown names and empty input', () => {
    expect(parseFeatures('nope').size).toBe(0);
    expect(parseFeatures('').size).toBe(0);
  });
});
