import type { VentureId } from '@/types';

/**
 * Router patterns, relative to the layout — the single source for every page's URL.
 * src/app/routes.ts maps each one to its page; ROUTES below builds links from them.
 */
export const PATHS = {
  services: 'services',
  companies: 'companies',
  team: 'team',
  contact: 'contact',
  venture: 'ventures/:id',
  designSystem: 'design-system'
} as const;

/** Links to pages. Use these instead of writing URLs by hand. */
export const ROUTES = {
  home: '/',
  services: `/${PATHS.services}`,
  companies: `/${PATHS.companies}`,
  team: `/${PATHS.team}`,
  contact: `/${PATHS.contact}`,
  /** The contact page with the form pre-filled for a venture or an enquiry topic. */
  enquire: ({ venture, topic }: { venture?: VentureId; topic?: string }) => {
    const q = new URLSearchParams();
    if (venture) q.set('venture', venture);
    if (topic) q.set('topic', topic);
    const qs = q.toString();
    return qs ? `/${PATHS.contact}?${qs}` : `/${PATHS.contact}`;
  },
  venture: (id: VentureId) => `/${PATHS.venture.replace(':id', id)}`,
  designSystem: `/${PATHS.designSystem}`
} as const;
