import { mockDelay, request } from '@/api';
import { mockApi } from '@/config/env';
import type { EnquiryPayload, EnquiryResponse } from './types';

/** POST /api/enquiries — contact form submission. See docs/API.md. */
export async function submitEnquiry(payload: EnquiryPayload, signal?: AbortSignal): Promise<EnquiryResponse> {
  if (mockApi) {
    await mockDelay();
    return { id: `mock-${Date.now()}`, status: 'received', createdAt: new Date().toISOString() };
  }
  return request<EnquiryResponse>('/api/enquiries', { method: 'POST', body: payload, signal });
}
