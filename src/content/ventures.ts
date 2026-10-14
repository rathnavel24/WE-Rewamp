import type { Venture, VentureId } from '@/types';
import { GREEN, ORANGE } from './tones';

export const VENTURES: Record<VentureId, Venture> = {
  insureliv: {
    id: 'insureliv',
    tone: GREEN,
    name: 'InsureLiv',
    icon: 'shield_with_heart',
    menuLine: 'AI insurance operating system',
    sector: 'InsurTech · WhiteBlue Fintech',
    tagline: 'The AI-powered insurance operating system for brokers, insurers and TPAs across the UAE and GCC.',
    about:
      'InsureLiv is the group’s flagship InsurTech ecosystem. Backed by enterprise tech firm WhiteBlue, it brings automated lead management, AI quote comparison, OCR document screening and commission reconciliation into one secure, unified pipeline — so insurance businesses scale confidently and cut overhead.',
    stats: [
      { n: 90, suffix: '%', label: 'Reduction in processing time' },
      { n: 5, suffix: '', label: 'Core modules in one platform' },
      { n: 1, suffix: '', label: 'Pipeline — lead to renewal' }
    ],
    featTitle: 'Key capabilities',
    features: [
      {
        icon: 'conversion_path',
        title: 'Unified lifecycle CRM',
        desc: 'Digitises the end-to-end sales pipeline from first lead to policy issuance and renewals.'
      },
      {
        icon: 'compare_arrows',
        title: 'AI-assisted quoting',
        desc: 'Compares multi-insurer panel rates side by side with an auto-matching AI quote engine.'
      },
      {
        icon: 'document_scanner',
        title: 'Automated document OCR',
        desc: 'Extracts and verifies Emirates IDs, visas, passports and medical reports — far less manual entry.'
      },
      {
        icon: 'api',
        title: 'API-first integrations',
        desc: 'Portal-ready architecture linking brokers cleanly into back-end insurer platforms.'
      },
      {
        icon: 'payments',
        title: 'Commission management',
        desc: 'Full operational visibility and real-time commission configuration — no spreadsheets.'
      }
    ]
  },
  arogyaplus: {
    id: 'arogyaplus',
    tone: ORANGE,
    name: 'ArogyaPlus',
    icon: 'biotech',
    menuLine: 'Home diagnostics & health packages',
    sector: 'HealthTech · Wallet Edge Technologies',
    tagline: 'Premium clinical accuracy meets at-home convenience.',
    about:
      'ArogyaPlus is a Dubai-based, technology-driven healthcare platform for home diagnostics and preventive health packages. Using certified, accredited, HIPAA-compliant lab networks, it delivers precise insights, digital reports and integrated doctor reviews — all by DHA-licensed professionals and CAP-accredited laboratories.',
    site: { label: 'arogyaplus.com', href: 'https://arogyaplus.com' },
    stats: [
      { n: 10000, suffix: '+', label: 'Families served' },
      { n: 250, suffix: '+', label: 'Advanced laboratory tests' },
      { n: 48, suffix: 'h', label: 'Digital reports delivered' }
    ],
    featTitle: 'Healthcare, on demand',
    features: [
      {
        icon: 'home_health',
        title: 'At-home & in-clinic services',
        desc: 'On-demand medical services wherever patients are most comfortable.'
      },
      {
        icon: 'inventory_2',
        title: 'Comprehensive health packages',
        desc: 'Preventive packages built around real health goals.'
      },
      {
        icon: 'bloodtype',
        title: 'Lab tests with home collection',
        desc: 'Specialised test bookings with secure home sample collection.'
      },
      { icon: 'medical_services', title: 'Professional nursing care', desc: 'Delivered by DHA-licensed professionals.' }
    ],
    steps: [
      {
        no: '01',
        icon: 'inventory_2',
        title: 'Pick a package',
        desc: 'Browse packages and choose what fits your health goals.'
      },
      { no: '02', icon: 'event_available', title: 'Book a slot', desc: 'Select a convenient date and time.' },
      {
        no: '03',
        icon: 'vaccines',
        title: 'Sample collected',
        desc: 'A certified professional collects the sample safely.'
      },
      {
        no: '04',
        icon: 'description',
        title: 'Get your report',
        desc: 'Receive your digital report and review the findings.'
      }
    ]
  },
  carehub: {
    id: 'carehub',
    tone: GREEN,
    name: 'CareHub Healthcare',
    icon: 'home_health',
    menuLine: 'DHA-licensed home nursing',
    sector: 'DHA-licensed · Dubai',
    tagline: 'Premium home nursing, diagnostics and medical tourism — delivered to homes, hotels and offices.',
    about:
      'CareHub Healthcare is a Dubai-based medical provider operating with DHA-licensed professionals. Its portfolio spans 24/7 home nursing, palliative care, elderly and pediatric support and in-home therapies — and it serves as a trusted, ethical bridge between international patients and leading medical institutions across the UAE.',
    site: { label: 'carehubuae.com', href: 'https://carehubuae.com' },
    featTitle: 'DHA-licensed home healthcare & nursing',
    features: [
      {
        icon: 'nightlight',
        title: '24/7 at-home nursing',
        desc: 'Licensed professionals deployed to homes, hotels or offices across Dubai.'
      },
      {
        icon: 'healing',
        title: 'Specialised clinical care',
        desc: 'Palliative care, post-operative recovery and intensive elderly or pediatric support.'
      },
      {
        icon: 'stethoscope',
        title: 'Doctor home visits',
        desc: 'On-demand clinical assessments and consultations — no clinic visit needed.'
      },
      {
        icon: 'water_drop',
        title: 'In-home specialised services',
        desc: 'Wound care, IV infusions, physiotherapy and digital phlebotomy.'
      },
      {
        icon: 'flight_land',
        title: 'Medical tourism',
        desc: 'Coordinating cross-border care journeys with leading UAE institutions.'
      }
    ]
  },
  globalcure: {
    id: 'globalcure',
    tone: ORANGE,
    name: 'Global Cure RX',
    footerName: 'Global Cure RX Pharmacy',
    icon: 'medication',
    menuLine: 'Community pharmacy, Dubai',
    sector: 'Pharmacy · Dubai',
    tagline: 'Authentic medication, expert counselling and insurance-ready dispensing.',
    about:
      'Global Cure RX Pharmacy LLC is a DHA-licensed community pharmacy in Dubai and the group’s dedicated pharmaceutical division. It dispenses high-value prescriptions through insurance tie-ups and bridges healthcare gaps with a comprehensive range of treatments, specialised therapies and health products. Call +971 50 515 2391 to order.',
    site: { label: '+971 50 515 2391', href: 'tel:+971505152391' },
    featTitle: 'More than a pharmacy counter',
    features: [
      {
        icon: 'prescriptions',
        title: 'Prescription & OTC',
        desc: 'Prescription and over-the-counter medicines, vitamins, supplements and personal care.'
      },
      {
        icon: 'verified_user',
        title: 'Insurance tie-ups',
        desc: 'High-value prescriptions dispensed with leading insurance companies.'
      },
      {
        icon: 'forum',
        title: 'Medication counselling',
        desc: 'Pharmacists advise on minor ailments and prescription queries.'
      },
      {
        icon: 'autorenew',
        title: 'Repeat dispensing',
        desc: 'For patients managing long-term conditions. Walk-ins welcome.'
      }
    ]
  },
  recovery: {
    id: 'recovery',
    tone: GREEN,
    name: 'Recovery Services',
    icon: 'account_balance',
    menuLine: 'Financial recovery & claims',
    sector: 'Financial services',
    tagline: 'Faster, transparent recovery of outstanding dues and assets.',
    about:
      'Wallet Edge provides professional financial recovery and asset retrieval solutions. Our team ensures faster turnaround and efficient recovery of outstanding dues through data-driven processes and transparent communication with all stakeholders — trusted by EMAAR, LIVA Insurance and leading regional insurers.',
    featTitle: 'How we recover more, faster',
    features: [
      {
        icon: 'query_stats',
        title: 'Data-driven processes',
        desc: 'Every case tracked and prioritised with clear, measurable progress.'
      },
      {
        icon: 'campaign',
        title: 'Transparent communication',
        desc: 'All stakeholders stay informed from first notice to settlement.'
      },
      { icon: 'gavel', title: 'Legal expertise in-house', desc: 'Backed by a dedicated group legal consultant.' }
    ],
    caseStudy: true
  }
};

export const VENTURE_LIST: Venture[] = Object.values(VENTURES);

export const isVentureId = (id: string | undefined): id is VentureId => !!id && id in VENTURES;
