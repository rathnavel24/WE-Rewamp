import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/content/site';

interface PageMeta {
  /** Page name, e.g. "Contact" → "Contact — WalletEdge Global". Omit on the home page. */
  title?: string;
  /** Search/social summary for this page; falls back to the site-wide one in index.html. */
  description?: string;
}

export const formatTitle = (title?: string) => (title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`);

const meta = (selector: string) => document.querySelector<HTMLMetaElement>(selector);
const DEFAULT_DESCRIPTION = typeof document !== 'undefined' ? (meta('meta[name="description"]')?.content ?? '') : '';

/**
 * Sets the document title, meta description, canonical link and share (Open Graph) tags for the current page.
 * The canonical address always uses the official domain, so staging copies point search engines at the live site.
 */
export function usePageMeta({ title, description }: PageMeta = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = formatTitle(title);
    const summary = description ?? DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    document.title = fullTitle;
    const set = (selector: string, value: string) => {
      const tag = meta(selector);
      if (tag) tag.content = value;
    };
    set('meta[name="description"]', summary);
    set('meta[property="og:title"]', fullTitle);
    set('meta[property="og:description"]', summary);
    set('meta[property="og:url"]', url);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  }, [title, description, pathname]);
}
