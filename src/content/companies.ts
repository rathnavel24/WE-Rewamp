import type { Company } from '@/types';
import { ROUTES } from '@/config/routes';
import { GREEN, ORANGE } from './tones';

export const COMPANIES: Company[] = [
  {
    name: 'Wallet Edge Global FZC LLC',
    short: 'Wallet Edge Global',
    sector: 'Parent company',
    icon: 'account_tree',
    country: 'UAE',
    desc: 'The holding company and principal stakeholder of the group, based in SPC Freezone, Sharjah.',
    href: ROUTES.contact,
    cta: 'Contact the group',
    tone: GREEN,
    parent: true,
    groupLine: 'Parent company & principal stakeholder',
    groupHref: ROUTES.companies
  },
  {
    name: 'Wallet Edge Technologies LLC',
    short: 'Wallet Edge Technologies',
    sector: 'Health technology',
    icon: 'memory',
    country: 'UAE',
    desc: 'The technology company powering ArogyaPlus — on-demand diagnostics and home healthcare in Dubai.',
    href: ROUTES.venture('arogyaplus'),
    cta: 'See ArogyaPlus',
    tone: ORANGE,
    groupLine: 'Technology arm — powers ArogyaPlus',
    groupHref: ROUTES.venture('arogyaplus')
  },
  {
    name: 'CareHub Healthcare LLC',
    short: 'CareHub Healthcare',
    sector: 'Home healthcare',
    icon: 'home_health',
    country: 'UAE',
    desc: 'DHA-licensed home nursing, doctor visits, palliative and post-operative care across Dubai.',
    href: ROUTES.venture('carehub'),
    cta: 'View company',
    tone: GREEN,
    groupLine: 'DHA-licensed home healthcare & nursing',
    groupHref: ROUTES.venture('carehub')
  },
  {
    name: 'Global Cure RX Pharmacy LLC',
    short: 'Global Cure RX',
    sector: 'Pharmacy',
    icon: 'medication',
    country: 'UAE',
    desc: 'Community pharmacy in Dubai with insurance tie-ups for high-value prescriptions.',
    href: ROUTES.venture('globalcure'),
    cta: 'View company',
    tone: ORANGE,
    groupLine: 'Community pharmacy in Dubai',
    groupHref: ROUTES.venture('globalcure')
  },
  {
    name: 'WhiteBlue Fintech Ltd',
    short: 'WhiteBlue Fintech',
    sector: 'InsurTech',
    icon: 'shield_with_heart',
    country: 'UAE',
    desc: 'Enterprise tech firm behind InsureLiv, the AI insurance operating system for the GCC.',
    href: ROUTES.venture('insureliv'),
    cta: 'See InsureLiv',
    tone: GREEN,
    groupLine: 'Builder of the InsureLiv platform',
    groupHref: ROUTES.venture('insureliv')
  },
  {
    name: 'Wallet Edge Financial Services Pvt Ltd',
    short: 'WE Financial Services',
    sector: 'Financial services',
    icon: 'account_balance',
    country: 'INDIA',
    desc: 'Financial recovery and asset retrieval with data-driven, transparent processes.',
    href: ROUTES.venture('recovery'),
    cta: 'Recovery Services',
    tone: ORANGE,
    groupLine: 'Financial recovery & services',
    groupHref: ROUTES.venture('recovery')
  },
  {
    name: 'Wallet Edge Services Pvt Ltd',
    short: 'WE Services',
    sector: 'Services & operations',
    icon: 'support_agent',
    country: 'INDIA',
    desc: 'Operations and services company for the group, based in Coimbatore.',
    href: ROUTES.contact,
    cta: 'Get in touch',
    tone: GREEN,
    groupLine: 'Services & operations',
    groupHref: ROUTES.companies
  }
];

/** Names that scroll in the outlined marquee on the Home page. */
export const ROLL_NAMES = [
  'WalletEdge Global',
  'WalletEdge Technologies',
  'CareHub Healthcare',
  'Global Cure RX',
  'WhiteBlue Fintech',
  'WalletEdge Financial',
  'WalletEdge Services'
];
