/**
 * Thin fetch wrapper for the WalletEdge backend.
 * Configure the base URL with VITE_API_BASE_URL (see .env.example).
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/** True when no backend is configured. */
export const NO_BACKEND = API_BASE_URL === '';

/**
 * Mocked responses are only for local development. A production build without a backend
 * must fail loudly — otherwise the contact form would "succeed" and silently drop enquiries.
 */
export const USE_MOCKS = NO_BACKEND && import.meta.env.DEV;

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/** Turns an error body into a readable sentence. Handles FastAPI's `detail: [{ msg }]` validation shape. */
function errorMessage(body: unknown, status: number): string {
  const detail = body && typeof body === 'object' && 'detail' in body ? (body as { detail: unknown }).detail : undefined;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const msgs = detail.map((d) => (d && typeof d === 'object' && 'msg' in d ? String(d.msg) : '')).filter(Boolean);
    if (msgs.length) return msgs.join(' ');
  }
  if (status >= 500) return 'Our server had a problem. Please try again in a moment.';
  return 'The request could not be completed. Please check your details and try again.';
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (NO_BACKEND) throw new ApiError('This form is not connected yet.', 0);
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init.headers }
    });
  } catch {
    throw new ApiError('We couldn’t reach our server. Please check your connection and try again.', 0);
  }
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(errorMessage(body, res.status), res.status, body);
  return body as T;
}
