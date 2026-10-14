import { describe, expect, it } from 'vitest';
import { createAssetLookup } from './assets';
import { cx } from './cx';
import { initials } from './initials';
import { slug } from './slug';

describe('slug', () => {
  it('lowercases and hyphenates', () => {
    expect(slug('Emaar Properties')).toBe('emaar-properties');
    expect(slug('  Al Ittihad — Al Watani! ')).toBe('al-ittihad-al-watani');
    expect(slug('Gopi Senthil Raja')).toBe('gopi-senthil-raja');
  });
});

describe('createAssetLookup', () => {
  const lookup = createAssetLookup({
    '/src/assets/team/jane-doe.jpg': '/assets/jane-doe.123.jpg',
    '/src/assets/team/emaar-properties.svg': '/assets/emaar.456.svg'
  });

  it('finds a file by the slug of a display name', () => {
    expect(lookup('Jane Doe')).toBe('/assets/jane-doe.123.jpg');
    expect(lookup('Emaar Properties')).toBe('/assets/emaar.456.svg');
  });

  it('returns undefined when no file exists', () => {
    expect(lookup('Nobody Here')).toBeUndefined();
  });
});

describe('cx', () => {
  it('joins truthy class names', () => {
    expect(cx('a', false, null, undefined, 'b')).toBe('a b');
  });
});

describe('initials', () => {
  it('takes the first letter of the first two words', () => {
    expect(initials('Rajarajeshwari Chandran')).toBe('RC');
    expect(initials('SaiPranav')).toBe('S');
    expect(initials('Dr. Anil Kumar Rao')).toBe('DA');
  });
});
