import { describe, expect, it } from 'vitest';
import { APP_ROUTES } from '@/app/routes';
import { COMPANIES } from './companies';
import { SERVICE_CARDS } from './services';
import { ENQUIRY_TOPICS, NAV_LINKS, VENTURE_ENQUIRY_TOPIC } from './site';
import { isVentureId, VENTURES } from './ventures';

/** Does an internal href resolve to a real page (not the 404 catch-all)? */
function resolves(href: string): boolean {
  const path = href.split(/[?#]/)[0] || '/';
  return APP_ROUTES.some(({ path: pattern }) => {
    if (pattern === '*') return false;
    const want = `/${pattern ?? ''}`.split('/');
    const got = path.split('/');
    if (want.length !== got.length) return false;
    return want.every((seg, i) => (seg === ':id' ? isVentureId(got[i]) : seg === got[i]));
  });
}

const internal = (href: string) => href.startsWith('/');

describe('content integrity', () => {
  it('every internal link points at a real page', () => {
    const hrefs = [
      ...NAV_LINKS.map((l) => l.href),
      ...COMPANIES.flatMap((c) => [c.href, c.groupHref]),
      ...SERVICE_CARDS.map((s) => s.href)
    ].filter(internal);
    expect(hrefs.filter((h) => !resolves(h))).toEqual([]);
  });

  it('venture keys match their ids', () => {
    for (const [key, v] of Object.entries(VENTURES)) expect(v.id).toBe(key);
  });

  it('each venture pre-selects a topic that exists on the enquiry form', () => {
    const topics = new Set(ENQUIRY_TOPICS.map((t) => t.label));
    for (const topic of Object.values(VENTURE_ENQUIRY_TOPIC)) expect(topics).toContain(topic);
  });

  it('nav ids are unique', () => {
    const ids = NAV_LINKS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('the 404 catch-all is the last route', () => {
    expect(APP_ROUTES.at(-1)?.path).toBe('*');
  });
});
