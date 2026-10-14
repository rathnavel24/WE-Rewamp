/* Backend access — import from '@/api'. Feature-specific endpoints live in their feature folder. */
export { ApiError, buildUrl, errorMessage, request, stream, type ApiErrorKind, type RequestOptions } from './client';
export { parseSse, type SseEvent } from './sse';
export { mockDelay } from './mock';
