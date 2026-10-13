import type { EnquiryTopic, NavLink, Office } from '@/types';
import { ROUTES } from './routes';
import { GREEN, ORANGE } from './tones';

export const SITE_NAME = 'WalletEdge Global';
export const LOGO_ALT = 'WalletEdge — IT & BPO | Financial Services | Consulting | Health Care';
export const CONTACT_EMAIL = 'admin@walletedgeglobal.com';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: ROUTES.home },
  { id: 'services', label: 'Services', href: ROUTES.services },
  { id: 'companies', label: 'Companies', href: ROUTES.companies, menu: true },
  { id: 'team', label: 'Our Team', href: ROUTES.team },
  { id: 'contact', label: 'Contact', href: ROUTES.contact }
];

export const OFFICES: Office[] = [
  {
    country: 'United Arab Emirates',
    short: 'UAE',
    badge: 'HQ',
    icon: 'apartment',
    tone: GREEN,
    addressLines: ['Wallet Edge Global FZC LLC', 'SPC Freezone, Sharjah'],
    phone: { label: '+971 50 946 4234', href: 'tel:+971509464234' }
  },
  {
    country: 'India',
    short: 'India',
    badge: 'COIMBATORE',
    icon: 'location_city',
    tone: ORANGE,
    addressLines: ['3/365, NGGO Colony Gate, MTP Road', 'Coimbatore 641017'],
    phone: { label: '+91 88258 98569', href: 'tel:+918825898569' }
  }
];

export const ENQUIRY_TOPICS: EnquiryTopic[] = [
  { label: 'IT & BPO', icon: 'hub' },
  { label: 'Financial services', icon: 'account_balance' },
  { label: 'Real estate', icon: 'domain' },
  { label: 'Consulting', icon: 'insights' },
  { label: 'Healthcare', icon: 'medical_services' },
  { label: 'Partnership', icon: 'handshake' }
];
