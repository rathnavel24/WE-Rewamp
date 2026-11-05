import { describe, expect, it } from 'vitest';
import { APP_ROUTES } from '@/app/routes';
import { GROUP_COMPANIES } from './companies';
import { clientLogo, companyLogo, ventureLogo } from './assets';
import { CLIENTS } from './clients';
import { SERVICE_DETAILS, SERVICES, serviceHref } from './services';
import { DIVISION_LEADERS } from './team';
import { CORPORATE_OFFICES, ENQUIRY_TOPICS, NAV_LINKS } from './site';
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
      ...SERVICES.map((s) => serviceHref(s.id)),
      ...Object.values(VENTURES).map((v) => serviceHref(v.service))
    ].filter(internal);
    expect(hrefs.filter((h) => !resolves(h))).toEqual([]);
  });

  it('venture keys match their ids', () => {
    for (const [key, v] of Object.entries(VENTURES)) expect(v.id).toBe(key);
  });

  it('each venture pre-selects a topic that exists on the enquiry form', () => {
    const topics = new Set(ENQUIRY_TOPICS.map((t) => t.label));
    for (const v of Object.values(VENTURES)) expect(topics).toContain(v.enquiryTopic);
  });

  it('every company is a parent or sits under a known service', () => {
    const ids = new Set(SERVICES.map((x) => x.id));
    for (const c of GROUP_COMPANIES) expect(c.parent || (c.service && ids.has(c.service))).toBeTruthy();
  });

  it('lists the seven companies exactly as named and ordered in the content document', () => {
    expect(GROUP_COMPANIES.map((c) => `${c.name} (${c.country === 'INDIA' ? 'India' : c.country})`)).toEqual([
      'Wallet Edge Global FZC LLC (UAE)',
      'Wallet Edge Technologies LLC (UAE)',
      'CareHub Healthcare LLC (UAE)',
      'Global Cure RX Pharmacy LLC (UAE)',
      'WhiteBlue Fintech Ltd (UAE)',
      'Wallet Edge Financial Services Pvt Ltd (India)',
      'Wallet Edge Services Pvt Ltd (India)'
    ]);
  });

  it('shows each company with the role from the client tracker (WE011)', () => {
    expect(GROUP_COMPANIES.map((c) => c.role)).toEqual([
      'Holding Company',
      'HealthTech',
      'Healthcare',
      'Healthcare',
      'InsureTech',
      'Financial Services',
      'BPO'
    ]);
  });

  it('names corporate offices exactly as in the company register (WE014)', () => {
    const names = GROUP_COMPANIES.map((c) => c.name);
    expect(CORPORATE_OFFICES.filter((o) => !names.includes(o.company))).toEqual([]);
  });

  it('does not mention Real Estate while it is held back', () => {
    const text = JSON.stringify([SERVICES, VENTURES, ENQUIRY_TOPICS, DIVISION_LEADERS, CLIENTS]);
    expect(text).not.toMatch(/real estate|seyyone/i);
  });

  it('every client in the Trusted by strip has a logo file', () => {
    expect(CLIENTS.filter((name) => !clientLogo(name))).toEqual([]);
  });

  it('every group company has a logo', () => {
    expect(GROUP_COMPANIES.filter((c) => !companyLogo(c)).map((c) => c.name)).toEqual([]);
  });

  it('every platform except Recovery Services has its own logo', () => {
    const missing = Object.values(VENTURES).filter((v) => !ventureLogo(v.id));
    expect(missing.map((v) => v.id)).toEqual(['recovery']);
  });

  it('every download link has its file in public/', () => {
    const files = [...SERVICES.flatMap((x) => x.offerings), ...Object.values(SERVICE_DETAILS).flatMap((d) => d.columns)]
      .map((o) => o.download?.href)
      .filter((h): h is string => !!h);
    expect(files.length).toBeGreaterThan(0);
    const published = new Set(Object.keys(import.meta.glob('/public/**/*')).map((k) => k.replace(/^\/public/, '')));
    expect(files.filter((h) => !published.has(h))).toEqual([]);
  });

  it('nav ids are unique', () => {
    const ids = NAV_LINKS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('the 404 catch-all is the last route', () => {
    expect(APP_ROUTES.at(-1)?.path).toBe('*');
  });
});
