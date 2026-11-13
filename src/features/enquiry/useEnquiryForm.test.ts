import { describe, expect, it } from 'vitest';
import { enquiryMailto } from './api';
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

describe('enquiryMailto', () => {
  it('addresses the enquiry and carries every filled field', () => {
    const url = enquiryMailto(
      { name: 'Jane Doe', company: 'Acme', email: 'jane@example.com', message: 'Hi & thanks', topics: ['Healthcare'] },
      'team@example.com'
    );
    expect(url.startsWith('mailto:team@example.com?subject=')).toBe(true);
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('subject')).toBe('Website enquiry from Jane Doe, Acme');
    expect(params.get('body')).toBe(
      'Name: Jane Doe\nCompany: Acme\nEmail: jane@example.com\nInterested in: Healthcare\n\nHi & thanks'
    );
  });
});
