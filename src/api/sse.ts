/** One Server-Sent Event. `data` joins multi-line `data:` fields with "\n". */
export interface SseEvent {
  event: string;
  data: string;
  id?: string;
}

/**
 * Turns raw text chunks (from `stream()`) into Server-Sent Events. Chunks may split an event
 * anywhere — partial lines are buffered until the blank line that ends the event.
 */
export async function* parseSse(chunks: AsyncIterable<string>): AsyncGenerator<SseEvent> {
  let buffer = '';
  for await (const chunk of chunks) {
    buffer += chunk.replace(/\r\n?/g, '\n');
    let end: number;
    while ((end = buffer.indexOf('\n\n')) !== -1) {
      const block = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const evt = parseBlock(block);
      if (evt) yield evt;
    }
  }
  const last = parseBlock(buffer);
  if (last) yield last;
}

function parseBlock(block: string): SseEvent | null {
  let event = 'message';
  let id: string | undefined;
  const data: string[] = [];
  for (const line of block.split('\n')) {
    if (!line || line.startsWith(':')) continue; // blank or comment / keep-alive
    const i = line.indexOf(':');
    const field = i === -1 ? line : line.slice(0, i);
    const value = i === -1 ? '' : line.slice(i + 1).replace(/^ /, '');
    if (field === 'event') event = value;
    else if (field === 'data') data.push(value);
    else if (field === 'id') id = value;
  }
  return data.length ? { event, data: data.join('\n'), id } : null;
}
