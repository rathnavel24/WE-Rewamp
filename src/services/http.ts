/**
 * Thin fetch wrapper for the WalletEdge backend.
 * Configure the base URL with VITE_API_BASE_URL (see .env.example).
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/** True when no backend is configured — services fall back to mocks. */
export const USE_MOCKS = API_BASE_URL === '';

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

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init.headers }
  });
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const message = (body && typeof body === 'object' && 'detail' in body && String(body.detail)) || res.statusText || 'Request failed';
    throw new ApiError(message, res.status, body);
  }
  return body as T;
}
