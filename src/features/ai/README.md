# AI feature

Ready-made foundation for adding AI to the site (an assistant chat, smart search, an enquiry helper…).
Nothing here renders yet — it's the typed client and the contract, so the UI can be built on top.

## What's here

| File       | What it does                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `types.ts` | `ChatMessage`, `ChatRequest`, and the streamed `ChatStreamEvent`s                              |
| `api.ts`   | `streamChat()` — POSTs to `/api/ai/chat` and yields the reply as it streams; dev mock built in |
| `index.ts` | Public surface — import from `@/features/ai`, never from files inside                          |

Built on the shared client: `stream()` in `src/api/client.ts` reads the response incrementally and
`parseSse()` in `src/api/sse.ts` turns it into events.

## Rules

- **No AI provider keys in the frontend.** The browser only calls our backend (`/api/ai/chat`); the backend
  holds the keys, picks the model, applies rate limits and logs. Anything in a `VITE_*` variable is public.
- **Ships behind a flag.** Gate every AI UI with `isEnabled('aiAssistant')` from `@/config/features`, and
  switch it on per environment with `VITE_FEATURES=aiAssistant`.
- **Lazy-load the UI.** Load the widget with `React.lazy` so visitors who never open it don't download it.

## Building the assistant (next step)

1. `features/ai/useChat.ts` — holds `messages`, calls `streamChat()`, appends `delta` text to the last
   assistant message, exposes `send(text)`, `stop()` (aborts via `AbortController`) and `status`.
2. `features/ai/AssistantWidget.tsx` + `.module.css` — the floating chat UI, composed from `@/components/ui`
   and design tokens only.
3. Mount it once in `src/components/layout/Layout/Layout.tsx`:

   ```tsx
   const AssistantWidget = lazy(() => import('@/features/ai/AssistantWidget'));
   …
   {isEnabled('aiAssistant') && <Suspense fallback={null}><AssistantWidget /></Suspense>}
   ```

4. Backend: implement `POST /api/ai/chat` as described in `docs/API.md`.

With `npm run dev` and no `VITE_API_BASE_URL`, `streamChat()` returns a mocked, word-by-word reply,
so the UI can be built and reviewed before the backend exists.
