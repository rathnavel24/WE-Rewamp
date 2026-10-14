import { useEffect } from 'react';
import { SITE_NAME, SITE_TAGLINE } from '@/content/site';

interface PageMeta {
  /** Page name, e.g. "Contact" → "Contact — WalletEdge Global". Omit on the home page. */
  title?: string;
  /** Search/social summary for this page; falls back to the site-wide one in index.html. */
  description?: string;
}

export const formatTitle = (title?: string) => (title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`);

const descriptionTag = () => document.querySelector<HTMLMetaElement>('meta[name="description"]');
const DEFAULT_DESCRIPTION = typeof document !== 'undefined' ? (descriptionTag()?.content ?? '') : '';

/** Sets the document title and meta description for the current page. */
export function usePageMeta({ title, description }: PageMeta = {}) {
  useEffect(() => {
    document.title = formatTitle(title);
    const tag = descriptionTag();
    if (tag) tag.content = description ?? DEFAULT_DESCRIPTION;
  }, [title, description]);
}
