import type { Service, ServiceDetail, ServiceId } from '@/types';
import { ROUTES } from '@/config/routes';
import { GREEN, ORANGE } from './tones';
import { VENTURES } from './ventures';

/** What NRI investment planning covers (client tracker, WE005). */
const NRI_PLANNING = [
  'Financial services — dealing in shares, securities, commodities, currencies and derivatives, including stockbroking and PMS distribution',
  'Mutual fund distribution — distribution and sub-distribution in line with AMFI guidelines',
  'Banking services — acting as a direct selling agent (DSA), business correspondent or authorised representative of banks'
];

/** The group's four services, in the order of the client's content document. */
export const SERVICES: Service[] = [
  {
    id: 'it-bpo',
    icon: 'hub',
    title: 'IT & BPO Services',
    short: 'IT & BPO',
    desc: 'InsureTech and HealthTech: AI-powered platforms for insurance and healthcare.',
    tags: ['InsureTech', 'HealthTech'],
    tone: GREEN,
    summary:
      'AI-powered platforms that automate insurance and healthcare workflows, built and run by the group’s technology companies.',
    offerings: [
      {
        icon: 'shield_with_heart',
        title: 'InsureTech',
        meta: 'InsureLiv',
        desc: 'An AI-powered insurance operating system built by WhiteBlue Fintech Ltd for insurance brokerages — from lead capture and multi-insurer quoting to automated document verification and policy renewals.',
        href: ROUTES.venture('insureliv'),
        stat: { value: '7X', label: 'Faster turnaround' }
      },
      {
        icon: 'biotech',
        title: 'HealthTech',
        meta: 'ArogyaPlus',
        desc: 'An online platform powered by Wallet Edge Technologies LLC to book comprehensive health packages and individual laboratory tests, through CAP-accredited labs and DHA-certified staff.',
        href: ROUTES.venture('arogyaplus'),
        stat: { value: '1,000+', label: 'Families served' }
      }
    ]
  },
  {
    id: 'financial',
    icon: 'account_balance',
    title: 'Financial Services',
    short: 'Financial',
    desc: 'Insurance clients recovery services, and financial planning including NRI investment planning.',
    tags: ['Insurance recovery', 'NRI investment planning'],
    tone: ORANGE,
    summary:
      'Recovery of outstanding dues for insurance clients, and financial planning for NRIs — from shares and mutual funds to banking services.',
    offerings: [
      {
        icon: 'shield',
        title: 'Insurance clients recovery services',
        desc: 'Faster turnaround and efficient recovery of outstanding dues, with clients including EMAAR and LIVA Insurance.',
        href: ROUTES.venture('recovery'),
        download: VENTURES.recovery.download
      },
      {
        icon: 'savings',
        title: 'Financial planning — NRI investment planning',
        items: NRI_PLANNING
      }
    ]
  },
  {
    id: 'consulting',
    icon: 'insights',
    title: 'Consulting Services',
    short: 'Consulting',
    desc: 'Business setup in the UAE, management and HR consulting, and accounting and bookkeeping.',
    tags: ['Business setup', 'Management', 'HR', 'Accounting'],
    tone: GREEN,
    summary:
      'Consulting covering business setup in the UAE, management consulting, HR consulting, and accounting and bookkeeping.',
    offerings: [
      {
        icon: 'business_center',
        title: 'Business consulting',
        items: ['Business setup in the UAE', 'Company registration and licensing support']
      },
      {
        icon: 'account_tree',
        title: 'Management consulting',
        items: ['Business strategy and planning', 'Operations and process improvement']
      },
      {
        icon: 'groups',
        title: 'HR consulting',
        items: ['Recruitment and PRO services', 'Payroll management']
      },
      {
        icon: 'calculate',
        title: 'Accounting and bookkeeping',
        items: ['Bookkeeping and financial records', 'Financial reporting']
      }
    ]
  },
  {
    id: 'healthcare',
    icon: 'medical_services',
    title: 'Healthcare Services',
    short: 'Healthcare',
    desc: 'Major stakes in DHA-licensed home healthcare and pharmacy companies in Dubai.',
    tags: ['Home healthcare', 'Pharmacy'],
    tone: ORANGE,
    summary: 'WalletEdge Global owns major stakes in the following DHA-licensed healthcare companies in Dubai.',
    offerings: [
      {
        icon: 'home_health',
        title: 'Home healthcare',
        meta: 'CareHub Healthcare LLC',
        desc: 'DHA-licensed home healthcare — 24/7 private nursing, elderly assistance and post-operative recovery support.',
        href: ROUTES.venture('carehub')
      },
      {
        icon: 'medication',
        title: 'Pharmacy',
        meta: 'Global Cure RX Pharmacy LLC',
        desc: 'A Dubai-based online platform for authenticated medicines, wellness vitamins, cosmetics, personal care items, and certified medical or surgical equipment.',
        href: ROUTES.venture('globalcure')
      }
    ]
  }
];

/** Link to a service's section on the Services page. */
export const serviceHref = (id: ServiceId) => `${ROUTES.services}#${id}`;

const titles = (list: Array<{ title: string }>) => list.map((f) => f.title);
const consulting = SERVICES.find((s) => s.id === 'consulting')!;

/**
 * The Services page, one entry per service. Descriptions follow the client's content document; capability lists
 * come from the venture pages so each fact is written once.
 */
export const SERVICE_DETAILS: Record<ServiceId, ServiceDetail> = {
  'it-bpo': {
    heading: 'AI platforms for insurance and healthcare',
    columns: [
      {
        title: 'InsureTech',
        venture: 'insureliv',
        meta: 'InsureLiv',
        href: ROUTES.venture('insureliv'),
        desc: VENTURES.insureliv.about,
        stats: VENTURES.insureliv.stats,
        points: [
          'AI quote builder',
          'Automated document review',
          'API-first portal integration',
          'Full pipeline visibility'
        ],
        site: VENTURES.insureliv.site
      },
      {
        title: 'HealthTech',
        venture: 'arogyaplus',
        meta: 'ArogyaPlus',
        href: ROUTES.venture('arogyaplus'),
        desc: VENTURES.arogyaplus.about,
        stats: VENTURES.arogyaplus.stats,
        points: [
          'Comprehensive screening packages',
          'Convenient home sample collection',
          'Individual test customisation',
          'Fast digital reports'
        ],
        site: VENTURES.arogyaplus.site
      }
    ]
  },
  financial: {
    heading: 'Insurance recovery and NRI investment planning',
    clients: ['EMAAR', 'LIVA Insurance'],
    dark: true,
    columns: [
      {
        title: 'Insurance clients recovery services',
        href: ROUTES.venture('recovery'),
        desc: VENTURES.recovery.tagline,
        points: titles(VENTURES.recovery.features),
        download: VENTURES.recovery.download
      },
      {
        title: 'Financial planning — NRI investment planning',
        points: NRI_PLANNING
      }
    ]
  },
  consulting: {
    heading: 'Business setup, management, HR and accounting',
    columns: consulting.offerings.map((o) => ({ title: o.title, points: o.items }))
  },
  healthcare: {
    heading: 'Major stakes in DHA-licensed healthcare',
    columns: [
      {
        title: 'Home healthcare',
        venture: 'carehub',
        href: ROUTES.venture('carehub'),
        meta: 'CareHub Healthcare LLC · carehubuae.com',
        desc: VENTURES.carehub.about,
        points: titles(VENTURES.carehub.features)
      },
      {
        title: 'Pharmacy',
        venture: 'globalcure',
        href: ROUTES.venture('globalcure'),
        meta: 'Global Cure RX Pharmacy LLC · +971 50 515 2391',
        desc: VENTURES.globalcure.about,
        points: titles(VENTURES.globalcure.features)
      }
    ]
  }
};
