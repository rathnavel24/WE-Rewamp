import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/config/env', () => ({
  env: { apiBaseUrl: 'https://api.test', features: '', isDev: false, isProd: true, mode: 'test' },
  hasBackend: true,
  mockApi: false
}));

const { ApiError, buildUrl, errorMessage, request, stream } = await import('./client');

const respond = (body: unknown, init: ResponseInit = {}) =>
  vi.fn().mockResolvedValue(new Response(typeof body === 'string' ? body : JSON.stringify(body), init));

afterEach(() => vi.unstubAllGlobals());

describe('buildUrl', () => {
  it('joins base, path and query, skipping undefined params', () => {
    expect(buildUrl('/api/x', { a: 1, b: undefined, c: 'y z' }, 'https://h')).toBe('https://h/api/x?a=1&c=y+z');
    expect(buildUrl('api/x', undefined, 'https://h')).toBe('https://h/api/x');
  });
});

describe('errorMessage', () => {
  it('reads FastAPI string and validation details', () => {
    expect(errorMessage({ detail: 'Nope' }, 400)).toBe('Nope');
    expect(errorMessage({ detail: [{ msg: 'Email invalid' }, { msg: 'Name required' }] }, 422)).toBe(
      'Email invalid Name required'
    );
  });

  it('falls back by status', () => {
    expect(errorMessage(null, 503)).toMatch(/server had a problem/);
    expect(errorMessage(null, 400)).toMatch(/could not be completed/);
  });
});

describe('request', () => {
  it('sends JSON and parses the response', async () => {
    const fetchMock = respond({ ok: true }, { status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    await expect(request('/api/enquiries', { method: 'POST', body: { name: 'A' } })).resolves.toEqual({ ok: true });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.test/api/enquiries');
    expect(init.body).toBe('{"name":"A"}');
    expect(init.headers['Content-Type']).toBe('application/json');
  });

  it('returns null for 204', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })));
    await expect(request('/x')).resolves.toBeNull();
  });

  it('throws an http ApiError with the server message', async () => {
    vi.stubGlobal('fetch', respond({ detail: 'Email is invalid' }, { status: 422 }));
    const err = await request('/x').catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toMatchObject({ kind: 'http', status: 422, message: 'Email is invalid' });
  });

  it('maps a failed fetch to a network ApiError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(request('/x')).rejects.toMatchObject({ kind: 'network' });
  });

  it('maps a caller abort to an aborted ApiError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_, reject) => init.signal?.addEventListener('abort', () => reject(new Error('abort'))))
      )
    );
    const controller = new AbortController();
    const pending = request('/x', { signal: controller.signal });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ kind: 'aborted' });
  });
});

describe('stream', () => {
  it('yields decoded text chunks', async () => {
    const body = new ReadableStream<Uint8Array>({
      start(c) {
        const enc = new TextEncoder();
        c.enqueue(enc.encode('Hel'));
        c.enqueue(enc.encode('lo'));
        c.close();
      }
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body, { status: 200 })));
    const chunks: string[] = [];
    for await (const chunk of stream('/x')) chunks.push(chunk);
    expect(chunks.join('')).toBe('Hello');
  });
});
