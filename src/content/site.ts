import type { CorporateOffice, EnquiryTopic, NavLink, Office } from '@/types';
import { ROUTES } from '@/config/routes';
import { GREEN, ORANGE } from './tones';

/** The site's official address (from the client's content document). Canonical and share links use it. */
export const SITE_URL = 'https://walletedgeglobal.com';
export const SITE_NAME = 'WalletEdge Global';
export const SITE_TAGLINE = 'Parent Group';
export const LOGO_ALT = 'WalletEdge — IT & BPO | Financial Services | Consulting | Health Care';
export const CONTACT_EMAIL = 'admin@walletedgeglobal.com';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: ROUTES.home },
  { id: 'services', label: 'Services', href: ROUTES.services, menu: 'services' },
  { id: 'companies', label: 'Companies', href: `${ROUTES.home}#companies`, menu: 'companies' },
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

/** Corporate offices of the group companies in Dubai (client tracker, WE009). */
export const CORPORATE_OFFICES: CorporateOffice[] = [
  {
    companies: ['Wallet Edge Global FZC LLC', 'Wallet Edge Technologies LLC'],
    addressLines: ['Breeze Business Center, Al Hamsah Building', 'Office 307, 3rd floor, Al Karama, Dubai, UAE']
  },
  { companies: ['CareHub Healthcare LLC'], addressLines: ['45B Street, Al Karama', 'Dubai, UAE'] },
  {
    companies: ['Global Cure RX Pharmacy LLC'],
    addressLines: ['Shop 22, Building P15, France Cluster', 'Dubai, UAE']
  },
  {
    companies: ['WhiteBlue Fintech Ltd'],
    addressLines: ['Dubai International Financial Centre (DIFC)', 'Dubai, UAE']
  }
];

/** The India corporate office, listed beside the Dubai ones in the footer. */
export const INDIA_CORPORATE_OFFICE: CorporateOffice = {
  companies: ['Wallet Edge Financial Services Pvt Ltd', 'Wallet Edge Services Pvt Ltd'],
  addressLines: ['3/365, NGGO Colony Gate, MTP Road', 'Coimbatore, Tamil Nadu, India 641017']
};

export const ENQUIRY_TOPICS: EnquiryTopic[] = [
  { label: 'IT & BPO', icon: 'hub' },
  { label: 'Financial services', icon: 'account_balance' },
  { label: 'Consulting', icon: 'insights' },
  { label: 'Healthcare', icon: 'medical_services' },
  { label: 'Partnership', icon: 'handshake' }
];
