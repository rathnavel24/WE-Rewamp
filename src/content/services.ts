import type { Service, ServiceDetail, ServiceId } from '@/types';
import { ROUTES } from '@/config/routes';
import { GREEN, ORANGE } from './tones';
import { VENTURES } from './ventures';

/** The group's four services, in the order of the client's content document. */
export const SERVICES: Service[] = [
  {
    id: 'it-bpo',
    no: '01',
    icon: 'hub',
    title: 'IT & BPO Services',
    short: 'IT & BPO',
    desc: 'AI-powered platforms for insurance and healthcare: InsureLiv and ArogyaPlus.',
    tags: ['InsureLiv', 'ArogyaPlus'],
    tone: GREEN,
    summary:
      'AI-powered platforms that automate insurance and healthcare workflows, built and run by the group’s technology companies.',
    offerings: [
      {
        icon: 'shield_with_heart',
        title: 'InsureLiv',
        desc: 'An AI-powered insurance operating system built by WhiteBlue FinTech for insurance brokerages — from lead capture and multi-insurer quoting to automated document verification and policy renewals.',
        href: ROUTES.venture('insureliv'),
        stat: { value: '90%', label: 'Cut in processing times' }
      },
      {
        icon: 'biotech',
        title: 'ArogyaPlus',
        desc: 'A Dubai-based health technology platform powered by Wallet Edge Technologies — at-home and in-clinic medical services, health packages and lab tests with home sample collection.',
        href: ROUTES.venture('arogyaplus'),
        stat: { value: '10,000+', label: 'Families served' }
      }
    ]
  },
  {
    id: 'financial',
    no: '02',
    icon: 'account_balance',
    title: 'Financial Services',
    short: 'Financial',
    desc: 'Insurance recovery agent services, with clients including EMAAR and LIVA Insurance.',
    tags: ['Insurance recovery', 'EMAAR', 'LIVA Insurance'],
    tone: ORANGE,
    summary:
      'Professional financial recovery and asset retrieval — faster turnaround and efficient recovery of outstanding dues through data-driven processes and transparent communication with all stakeholders.',
    offerings: [
      {
        icon: 'shield',
        title: 'Insurance recovery agent services',
        desc: 'Recovery of outstanding dues and assets, with clients including:',
        items: ['EMAAR', 'LIVA Insurance'],
        href: ROUTES.venture('recovery')
      },
      {
        icon: 'apartment',
        title: 'EMAAR Group — case focus',
        desc: 'Streamlining the corporate recovery process for large-scale property insurance claims.',
        href: ROUTES.venture('recovery')
      }
    ]
  },
  {
    id: 'consulting',
    no: '03',
    icon: 'insights',
    title: 'Consulting Services',
    short: 'Consulting',
    desc: 'Business and management consulting, including company formation in the UAE, HR, and finance and accounts.',
    tags: ['Company formation', 'HR & PRO', 'Finance & accounts'],
    tone: GREEN,
    summary:
      'Consulting covering company formation in the UAE, HR (recruitment, PRO services and payroll), and finance and accounts.',
    offerings: [
      { icon: 'business_center', title: 'Business consulting', items: ['Company formation in UAE'] },
      {
        icon: 'account_tree',
        title: 'Management consulting',
        items: ['HR consulting — recruitment, PRO services and payroll', 'Finance & accounts consulting']
      }
    ]
  },
  {
    id: 'healthcare',
    no: '04',
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
        title: 'CareHub Healthcare LLC',
        meta: 'carehubuae.com',
        desc: 'DHA-licensed home healthcare — 24/7 private nursing, elderly assistance and post-operative recovery support.',
        href: ROUTES.venture('carehub')
      },
      {
        icon: 'medication',
        title: 'Global Cure RX Pharmacy LLC',
        meta: '+971 50 515 2391',
        desc: 'DHA-licensed community pharmacy, dispensing high-value prescriptions through tie-ups with insurance companies.',
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
        title: 'InsureLiv',
        venture: 'insureliv',
        href: ROUTES.venture('insureliv'),
        desc: 'An AI-powered insurance operating system built by WhiteBlue FinTech for insurance brokerages. It automates the entire broker workflow — from lead capture and multi-insurer quoting to automated document verification and policy renewals — boosting agent productivity while reducing turnaround times and operating costs.',
        stats: VENTURES.insureliv.stats?.slice(0, 1),
        points: titles(VENTURES.insureliv.features)
      },
      {
        title: 'ArogyaPlus',
        venture: 'arogyaplus',
        href: ROUTES.venture('arogyaplus'),
        desc: 'A Dubai-based health technology platform powered by Wallet Edge Technologies — on-demand at-home and in-clinic medical services, health packages, specialised lab test bookings with secure home sample collection, and professional nursing care, delivered by DHA-licensed professionals and CAP-accredited laboratories.',
        stats: VENTURES.arogyaplus.stats,
        points: titles(VENTURES.arogyaplus.features)
      }
    ]
  },
  financial: {
    heading: 'Insurance recovery agent services',
    clients: ['EMAAR', 'LIVA Insurance'],
    dark: true,
    columns: [
      {
        title: 'Recovery Services',
        href: ROUTES.venture('recovery'),
        desc: VENTURES.recovery.tagline,
        points: titles(VENTURES.recovery.features)
      },
      {
        title: 'EMAAR Group — case focus',
        href: ROUTES.venture('recovery'),
        desc: VENTURES.recovery.caseStudy?.lead
      }
    ]
  },
  consulting: {
    heading: 'Business and management consulting',
    columns: consulting.offerings.map((o) => ({ title: o.title, points: o.items }))
  },
  healthcare: {
    heading: 'Major stakes in DHA-licensed healthcare',
    columns: [
      {
        title: 'CareHub Healthcare LLC',
        venture: 'carehub',
        href: ROUTES.venture('carehub'),
        meta: 'carehubuae.com',
        desc: 'A premier DHA-licensed home healthcare provider in Dubai — tailored 24/7 private nursing, elderly assistance and post-operative recovery support, with home-based clinical services such as wound care, IV infusions, physiotherapy and digital phlebotomy.',
        points: titles(VENTURES.carehub.features)
      },
      {
        title: 'Global Cure RX Pharmacy LLC',
        venture: 'globalcure',
        href: ROUTES.venture('globalcure'),
        meta: '+971 50 515 2391',
        desc: 'A retail outlet in Dubai dispensing pharmaceutical products, with high-value prescriptions through tie-ups with insurance companies. This DHA-licensed community pharmacy stocks prescription and over-the-counter medicines, vitamins, health supplements and personal care products, with medication counselling, advice on minor ailments, help with prescription queries and repeat dispensing. Walk-in patients are welcome.',
        points: titles(VENTURES.globalcure.features)
      }
    ]
  }
};
