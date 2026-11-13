import { mockDelay, request } from '@/api';
import { hasBackend, mockApi } from '@/config/env';
import { CONTACT_EMAIL } from '@/content/site';
import type { EnquiryPayload, EnquiryResponse } from './types';

/**
 * True when there is no backend to post to outside the dev server. The form then hands the
 * enquiry to the visitor's email app, addressed to CONTACT_EMAIL, instead of failing.
 */
export const sendsByEmail = !hasBackend && !mockApi;

/** POST /api/enquiries — contact form submission. See docs/API.md. */
export async function submitEnquiry(payload: EnquiryPayload, signal?: AbortSignal): Promise<EnquiryResponse> {
  if (mockApi) {
    await mockDelay();
    return { id: `mock-${Date.now()}`, status: 'received', createdAt: new Date().toISOString() };
  }
  return request<EnquiryResponse>('/api/enquiries', { method: 'POST', body: payload, signal });
}

/** A mailto: link carrying the whole enquiry, for when there is no backend. */
export function enquiryMailto(p: EnquiryPayload, to = CONTACT_EMAIL): string {
  const lines = [
    `Name: ${p.name}`,
    p.company && `Company: ${p.company}`,
    `Email: ${p.email}`,
    p.phone && `Phone: ${p.phone}`,
    p.topics.length > 0 && `Interested in: ${p.topics.join(', ')}`,
    p.message && `\n${p.message}`
  ].filter(Boolean);
  const subject = `Website enquiry from ${p.name}${p.company ? `, ${p.company}` : ''}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
