/*
 * AI feature — the public surface. Import from '@/features/ai'.
 * Structure only for now (no UI); see ./README.md for how to build the assistant on top.
 */
export { streamChat, toChatEvent } from './api';
export type { ChatMessage, ChatRequest, ChatRole, ChatStreamEvent } from './types';
