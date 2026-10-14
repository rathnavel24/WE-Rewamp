/**
 * HTTP client for the WalletEdge backend. Every network call in the app goes through
 * `request` (JSON) or `stream` (incremental responses — e.g. AI chat tokens).
 * Base URL comes from VITE_API_BASE_URL via `@/config/env`.
 */
import { env, hasBackend } from '@/config/env';

export type ApiErrorKind = 'not_configured' | 'network' | 'timeout' | 'aborted' | 'http';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  /** HTTP status, or 0 when the request never got a response. */
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, kind: ApiErrorKind, status = 0, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    this.details = details;
  }
}

/** Turns an error body into a readable sentence. Handles FastAPI's `detail: [{ msg }]` validation shape. */
export function errorMessage(body: unknown, status: number): string {
  const detail =
    body && typeof body === 'object' && 'detail' in body ? (body as { detail: unknown }).detail : undefined;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const msgs = detail.map((d) => (d && typeof d === 'object' && 'msg' in d ? String(d.msg) : '')).filter(Boolean);
    if (msgs.length) return msgs.join(' ');
  }
  if (status >= 500) return 'Our server had a problem. Please try again in a moment.';
  return 'The request could not be completed. Please check your details and try again.';
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  /** Plain objects are sent as JSON; strings/FormData/Blob are sent as-is. */
  body?: unknown;
  /** Query-string parameters; undefined values are skipped. */
  query?: Record<string, string | number | boolean | undefined>;
  /** Abort after this many ms (default 20s). Streams default to no timeout. */
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT = 20_000;

export function buildUrl(path: string, query?: RequestOptions['query'], base = env.apiBaseUrl): string {
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query ?? {})) if (v !== undefined) params.set(k, String(v));
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

const isRawBody = (b: unknown) =>
  typeof b === 'string' || b instanceof FormData || b instanceof Blob || b instanceof URLSearchParams;

/** Shared fetch: base URL, JSON body, timeout + caller's AbortSignal, and error mapping. */
async function send(path: string, opts: RequestOptions, accept: string, timeoutMs?: number): Promise<Response> {
  if (!hasBackend) throw new ApiError('This feature is not connected yet.', 'not_configured');
  const { body, query, headers, signal, timeoutMs: _ignored, ...init } = opts;

  const controller = new AbortController();
  const timer = timeoutMs ? setTimeout(() => controller.abort('timeout'), timeoutMs) : undefined;
  signal?.addEventListener('abort', () => controller.abort(signal.reason), { once: true });

  const json = body !== undefined && !isRawBody(body);
  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      ...init,
      signal: controller.signal,
      headers: { Accept: accept, ...(json ? { 'Content-Type': 'application/json' } : {}), ...headers },
      body: body === undefined ? undefined : json ? JSON.stringify(body) : (body as BodyInit)
    });
  } catch {
    if (controller.signal.aborted) {
      throw controller.signal.reason === 'timeout'
        ? new ApiError('The server took too long to respond. Please try again.', 'timeout')
        : new ApiError('The request was cancelled.', 'aborted');
    }
    throw new ApiError('We couldn’t reach our server. Please check your connection and try again.', 'network');
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new ApiError(errorMessage(errBody, res.status), 'http', res.status, errBody);
  }
  return res;
}

/** JSON request. Resolves with the parsed body (`null` for 204). */
export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const res = await send(path, opts, 'application/json', opts.timeoutMs ?? DEFAULT_TIMEOUT);
  if (res.status === 204) return null as T;
  return (await res.json().catch(() => null)) as T;
}

/**
 * Streams a response body as decoded text chunks — for AI chat tokens, NDJSON or SSE.
 * Pair with `parseSse` from ./sse for `text/event-stream` endpoints.
 *
 *   for await (const chunk of stream('/api/ai/chat', { method: 'POST', body, signal })) { … }
 */
export async function* stream(path: string, opts: RequestOptions = {}): AsyncGenerator<string> {
  const res = await send(path, opts, 'text/event-stream, application/x-ndjson, text/plain', opts.timeoutMs);
  if (!res.body) return;
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return;
      if (value) yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
