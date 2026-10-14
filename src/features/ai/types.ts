export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Body of POST /api/ai/chat. See docs/API.md. */
export interface ChatRequest {
  messages: ChatMessage[];
  /** Page the visitor is on, so the backend can ground answers (e.g. "/ventures/carehub"). */
  context?: { path?: string };
}

/**
 * Events the backend streams back (Server-Sent Events):
 *   event: delta  data: {"text":"Hel"}        — next piece of the reply
 *   event: done   data: {}                    — reply finished
 *   event: error  data: {"message":"…"}       — reply failed part-way
 */
export type ChatStreamEvent = { type: 'delta'; text: string } | { type: 'done' } | { type: 'error'; message: string };
