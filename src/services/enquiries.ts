import type { EnquiryPayload } from '@/types';
import { request, USE_MOCKS } from './http';

export interface EnquiryResponse {
  id: string;
  status: 'received';
  createdAt: string;
}

/** POST /api/enquiries — contact form submission. See docs/API.md. */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 400));
    return { id: `mock-${Date.now()}`, status: 'received', createdAt: new Date().toISOString() };
  }
  return request<EnquiryResponse>('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) });
}
