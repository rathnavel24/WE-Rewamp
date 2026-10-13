import type { VentureId } from '@/types';

export const ROUTES = {
  home: '/',
  services: '/services',
  companies: '/companies',
  team: '/team',
  contact: '/contact',
  venture: (id: VentureId) => `/ventures/${id}`
} as const;
