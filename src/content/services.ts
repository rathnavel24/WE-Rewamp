import type { Feature, PracticeCompany, ServiceCard, ServicePillar } from '@/types';
import { ROUTES } from '@/config/routes';
import { GREEN, ORANGE } from './tones';

/** Service cards on the Home page. */
export const SERVICE_CARDS: ServiceCard[] = [
  {
    no: '01',
    icon: 'hub',
    title: 'IT & BPO Services',
    desc: 'AI-powered platforms for insurance and healthcare — InsureLiv and ArogyaPlus.',
    tags: ['InsureLiv', 'ArogyaPlus', 'Automation'],
    tone: GREEN,
    href: `${ROUTES.services}#it-bpo`
  },
  {
    no: '02',
    icon: 'account_balance',
    title: 'Financial Services',
    desc: 'Insurance recovery agent services for leading developers and insurers.',
    tags: ['Recovery', 'EMAAR', 'LIVA'],
    tone: ORANGE,
    href: `${ROUTES.services}#financial`
  },
  {
    no: '03',
    icon: 'domain',
    title: 'Real Estate',
    desc: 'Jointly developing an apartment project with Seyyone Ventures in Coimbatore.',
    tags: ['Residential', 'Coimbatore'],
    tone: GREEN,
    href: `${ROUTES.services}#real-estate`
  },
  {
    no: '04',
    icon: 'insights',
    title: 'Consulting Services',
    desc: 'Business, management, HR and finance consulting — plus UAE company formation.',
    tags: ['UAE setup', 'HR & PRO', 'Finance'],
    tone: ORANGE,
    href: `${ROUTES.services}#consulting`
  },
  {
    no: '05',
    icon: 'medical_services',
    title: 'Healthcare Services',
    desc: 'Major stakes in DHA-licensed home healthcare and pharmacy companies in Dubai.',
    tags: ['CareHub', 'Global Cure RX'],
    tone: GREEN,
    href: `${ROUTES.services}#healthcare`
  }
];

/** Jump-link pills in the Services hero. */
export const SERVICE_PILLARS: ServicePillar[] = [
  { title: 'IT & BPO', icon: 'hub', anchor: '#it-bpo', tone: GREEN },
  { title: 'Financial', icon: 'account_balance', anchor: '#financial', tone: ORANGE },
  { title: 'Real Estate', icon: 'domain', anchor: '#real-estate', tone: GREEN },
  { title: 'Consulting', icon: 'insights', anchor: '#consulting', tone: ORANGE },
  { title: 'Healthcare', icon: 'medical_services', anchor: '#healthcare', tone: GREEN }
];

export const CONSULTING_SERVICES: Feature[] = [
  { icon: 'business_center', title: 'Business consulting', desc: 'Strategy, market entry and growth planning.' },
  { icon: 'flag', title: 'Company formation in UAE', desc: 'Freezone and mainland setup, end to end.' },
  { icon: 'account_tree', title: 'Management consulting', desc: 'Operating models, process and governance.' },
  { icon: 'groups', title: 'HR consulting', desc: 'Recruitment, PRO services and payroll.' },
  { icon: 'request_quote', title: 'Finance & accounts', desc: 'Bookkeeping, reporting and compliance.' }
];

/** Capability chips on the InsureLiv flagship card. */
export const INSURELIV_TAGS = [
  { icon: 'conversion_path', label: 'Lifecycle CRM' },
  { icon: 'compare_arrows', label: 'AI quoting' },
  { icon: 'document_scanner', label: 'Document OCR' },
  { icon: 'api', label: 'API-first' },
  { icon: 'payments', label: 'Commissions' }
];

/** Capability chips on the ArogyaPlus flagship card. */
export const AROGYA_TAGS = [
  { icon: 'home_health', label: 'Home sample collection' },
  { icon: 'science', label: 'Lab tests' },
  { icon: 'health_and_safety', label: 'Health packages' },
  { icon: 'medical_services', label: 'Nursing care' },
  { icon: 'event_available', label: 'Online booking' }
];

/** Services page · 01 IT & BPO: the group's technology platforms. */
export const IT_BPO_PLATFORMS: PracticeCompany[] = [
  {
    venture: 'insureliv',
    icon: 'shield_with_heart',
    tone: GREEN,
    variant: 'sunken',
    title: 'InsureLiv',
    desc: 'An AI-powered insurance operating system built by WhiteBlue FinTech for brokerages. It automates the entire broker workflow — lead capture, multi-insurer quoting, document verification and renewals — boosting productivity while cutting turnaround and cost.'
  },
  {
    venture: 'arogyaplus',
    icon: 'biotech',
    tone: ORANGE,
    variant: 'accent-soft',
    title: 'ArogyaPlus',
    desc: 'A Dubai-based health technology platform powered by Wallet Edge Technologies — at-home and in-clinic medical services, health packages, lab test bookings with home sample collection, and professional nursing care.'
  }
];

/** Services page · 05 Healthcare: DHA-licensed companies the group holds major stakes in. */
export const HEALTHCARE_COMPANIES: PracticeCompany[] = [
  {
    venture: 'carehub',
    icon: 'home_health',
    tone: GREEN,
    meta: 'carehubuae.com',
    title: 'CareHub Healthcare LLC',
    desc: 'A premier DHA-licensed home healthcare provider in Dubai — 24/7 private nursing, elderly assistance, post-operative recovery, wound care, IV infusions, physiotherapy and digital phlebotomy.'
  },
  {
    venture: 'globalcure',
    icon: 'medication',
    tone: ORANGE,
    meta: '+971 50 515 2391',
    title: 'Global Cure RX Pharmacy LLC',
    desc: 'A community pharmacy in Dubai dispensing high-value prescriptions with insurance tie-ups — plus OTC medicines, supplements, medication counselling and repeat dispensing. Walk-ins welcome.'
  }
];
