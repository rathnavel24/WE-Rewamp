import type { VentureId } from '@/types';

/** Body of POST /api/enquiries. See docs/API.md. */
export interface EnquiryPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  topics: string[];
  /** Set when the visitor came from a venture page's "Enquire about…" button. */
  venture?: VentureId;
  /** Page the enquiry was sent from, e.g. "/contact" or "/ventures/carehub". */
  source?: string;
}

export interface EnquiryResponse {
  id: string;
  status: 'received';
  createdAt: string;
}
