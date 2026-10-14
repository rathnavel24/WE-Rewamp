import { describe, expect, it } from 'vitest';
import { parseSse, type SseEvent } from './sse';

async function* from(...chunks: string[]) {
  yield* chunks;
}

const collect = async (chunks: AsyncIterable<string>) => {
  const out: SseEvent[] = [];
  for await (const e of parseSse(chunks)) out.push(e);
  return out;
};

describe('parseSse', () => {
  it('parses events split across arbitrary chunk boundaries', async () => {
    const events = await collect(from('event: del', 'ta\ndata: {"text":"Hi"}\n', '\nevent: done\ndata: {}\n\n'));
    expect(events).toEqual([
      { event: 'delta', data: '{"text":"Hi"}', id: undefined },
      { event: 'done', data: '{}', id: undefined }
    ]);
  });

  it('joins multi-line data, defaults the event name, and skips comments', async () => {
    const events = await collect(from(': keep-alive\n\nid: 7\ndata: a\ndata: b\n\n'));
    expect(events).toEqual([{ event: 'message', data: 'a\nb', id: '7' }]);
  });

  it('handles CRLF and a final event without a trailing blank line', async () => {
    const events = await collect(from('data: one\r\n\r\ndata: two'));
    expect(events.map((e) => e.data)).toEqual(['one', 'two']);
  });
});
