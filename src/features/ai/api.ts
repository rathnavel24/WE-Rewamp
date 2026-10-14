import { mockDelay, parseSse, stream, type SseEvent } from '@/api';
import { mockApi } from '@/config/env';
import type { ChatRequest, ChatStreamEvent } from './types';

/** Maps one SSE event from /api/ai/chat to a typed chat event; unknown events are skipped. */
export function toChatEvent(evt: SseEvent): ChatStreamEvent | null {
  const data = safeJson(evt.data);
  switch (evt.event) {
    case 'delta':
      return typeof data?.text === 'string' ? { type: 'delta', text: data.text } : null;
    case 'done':
      return { type: 'done' };
    case 'error':
      return {
        type: 'error',
        message: typeof data?.message === 'string' ? data.message : 'The assistant ran into a problem.'
      };
    default:
      return null;
  }
}

/**
 * POST /api/ai/chat — streams the assistant's reply as typed events.
 * API keys and model choice live on the backend only; the browser never talks to an AI provider.
 *
 *   for await (const e of streamChat({ messages }, signal)) if (e.type === 'delta') append(e.text);
 */
export async function* streamChat(req: ChatRequest, signal?: AbortSignal): AsyncGenerator<ChatStreamEvent> {
  if (mockApi) {
    yield* mockChat();
    return;
  }
  for await (const evt of parseSse(stream('/api/ai/chat', { method: 'POST', body: req, signal }))) {
    const e = toChatEvent(evt);
    if (!e) continue;
    yield e;
    if (e.type !== 'delta') return;
  }
}

/** Dev-only: streams a canned reply word by word so the UI can be built without a backend. */
async function* mockChat(): AsyncGenerator<ChatStreamEvent> {
  const reply = 'This is a mocked reply from the WalletEdge assistant. Connect VITE_API_BASE_URL to use the real one.';
  for (const word of reply.split(' ')) {
    await mockDelay(40);
    yield { type: 'delta', text: `${word} ` };
  }
  yield { type: 'done' };
}

function safeJson(text: string): Record<string, unknown> | null {
  try {
    const v: unknown = JSON.parse(text);
    return v && typeof v === 'object' ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
