import { describe, expect, it } from 'vitest';
import { toPayload } from './useEnquiryForm';

describe('toPayload', () => {
  it('trims fields, drops empty optionals and attaches topics/context', () => {
    const data = new FormData();
    data.set('name', '  Jane Doe ');
    data.set('email', 'jane@example.com');
    data.set('company', '   ');
    data.set('message', 'Hello');

    expect(toPayload(data, ['Healthcare'], { venture: 'carehub', source: '/contact' })).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: undefined,
      phone: undefined,
      message: 'Hello',
      topics: ['Healthcare'],
      venture: 'carehub',
      source: '/contact'
    });
  });
});
