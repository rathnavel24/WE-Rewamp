import type { Feature, ServiceCard, ServicePillar } from '@/types';
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
