import type { Venture, VentureId } from '@/types';
import { GREEN, ORANGE } from './tones';

export const VENTURES: Record<VentureId, Venture> = {
  insureliv: {
    id: 'insureliv',
    service: 'it-bpo',
    enquiryTopic: 'IT & BPO',
    tone: GREEN,
    name: 'InsureLiv',
    icon: 'shield_with_heart',
    menuLine: 'AI insurance operating system',
    sector: 'InsurTech · WhiteBlue Fintech',
    tagline: 'The AI-powered insurance operating system for brokers, insurers and TPAs across the UAE and GCC.',
    about:
      'InsureLiv is the group’s flagship AI-powered InsurTech ecosystem, built to transform modern insurance distribution across the UAE and the broader GCC region. Backed by enterprise tech firm WhiteBlue, this intelligent insurance operating system brings entire broker, insurer and TPA workflows — automated lead management, AI quote comparison, OCR document screening and commission reconciliation — into one secure, unified pipeline. By removing operational fragmentation, InsureLiv enables insurance businesses to scale confidently, cut processing times by 90% and reduce overhead costs.',
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
        desc: 'Tracks full operational visibility and real-time commission configurations without spreadsheets.'
      }
    ]
  },
  arogyaplus: {
    id: 'arogyaplus',
    service: 'it-bpo',
    enquiryTopic: 'Healthcare',
    tone: ORANGE,
    name: 'ArogyaPlus',
    icon: 'biotech',
    menuLine: 'Home diagnostics & health packages',
    sector: 'HealthTech · Wallet Edge Technologies',
    tagline: 'Home-based diagnostics and preventive health packages, with digital reports within 48 hours.',
    about:
      'ArogyaPlus is a premier, technology-driven healthcare platform specialising in accessible, comprehensive home-based diagnostics and preventive health packages. Serving over 10,000 families with a portfolio of more than 250 advanced laboratory tests, it bridges the gap between premium clinical accuracy and patient convenience. Using certified, accredited and HIPAA-compliant laboratory networks, ArogyaPlus delivers precise health insights, digital reporting within 48 hours and integrated medical doctor reviews directly to consumers.',
    site: { label: 'arogyaplus.com', href: 'https://arogyaplus.com' },
    stats: [
      { n: 10000, suffix: '+', label: 'Families served' },
      { n: 250, suffix: '+', label: 'Advanced laboratory tests' },
      { n: 48, suffix: 'h', label: 'Digital reports delivered' }
    ],
    featTitle: 'Services',
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
    service: 'healthcare',
    enquiryTopic: 'Healthcare',
    tone: GREEN,
    name: 'CareHub Healthcare',
    icon: 'home_health',
    menuLine: 'DHA-licensed home nursing',
    sector: 'DHA-licensed · Dubai',
    tagline: 'Home nursing, diagnostics and medical tourism, delivered to homes, hotels and offices in Dubai.',
    about:
      'CareHub Healthcare is a premium, Dubai-based medical provider specialising in comprehensive home nursing, diagnostics and global medical tourism. Operating with DHA-licensed professionals, it delivers patient-centric medical care directly to homes, hotels and offices — 24/7 home nursing, personalised palliative care, elderly and paediatric support, and specialised in-home therapies. CareHub Healthcare also coordinates cross-border healthcare journeys, serving as a trusted, ethical bridge between international patients and leading medical institutions across the UAE.',
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
    service: 'healthcare',
    enquiryTopic: 'Healthcare',
    tone: ORANGE,
    name: 'Global Cure RX Pharmacy',
    icon: 'medication',
    menuLine: 'Community pharmacy, Dubai',
    sector: 'Pharmacy · Dubai',
    tagline:
      'A DHA-licensed community pharmacy in Dubai, dispensing high-value prescriptions through insurance tie-ups.',
    about:
      'Global Cure RX Pharmacy functions as a dedicated pharmaceutical division committed to delivering patient care and facilitating worldwide access to authentic medications, bridging healthcare gaps with a comprehensive selection of prescription treatments, specialised therapies and healthcare items. Its retail outlet in Dubai is a DHA-licensed community pharmacy that dispenses high-value prescriptions through tie-ups with insurance companies. Walk-in patients are welcome, without prior appointment. Call +971 50 515 2391 to order.',
    site: { label: '+971 50 515 2391', href: 'tel:+971505152391' },
    featTitle: 'Pharmacy services',
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
        desc: 'Pharmacists provide medication counselling, advice on minor ailments and help with prescription queries.'
      },
      {
        icon: 'autorenew',
        title: 'Repeat dispensing',
        desc: 'Available for patients managing long-term conditions. Walk-in customers welcome, no appointment needed.'
      }
    ]
  },
  recovery: {
    id: 'recovery',
    service: 'financial',
    enquiryTopic: 'Financial services',
    tone: GREEN,
    name: 'Recovery Services',
    icon: 'account_balance',
    menuLine: 'Financial recovery & claims',
    sector: 'Financial services',
    tagline:
      'Professional recovery of outstanding dues and assets, with transparent communication with all stakeholders.',
    about:
      'Wallet Edge provides professional financial recovery and asset retrieval solutions. Our team ensures faster turnaround and efficient recovery of outstanding dues through data-driven processes and transparent communication with all stakeholders — with clients including EMAAR and LIVA Insurance.',
    featTitle: 'Our approach',
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
    caseStudy: {
      kicker: 'Case focus · EMAAR Group',
      title: 'Streamlining the corporate recovery process.',
      lead: 'EMAAR Group, an ultra-premium developer in Dubai, coordinates large property portfolios where Emaar Community Management (ECM) mandates master property insurance, public liability and fidelity guarantee across its communities. When structural or environmental incidents affect property assets, recovery relies on top-tier regional multi-line insurers to handle complex commercial property claims and asset mitigations. Large-scale property insurance recoveries highlight the extreme complexity of corporate claim settlements — the development gaps the WalletEdge ecosystem aims to target.',
      points: [
        {
          icon: 'automation',
          tone: GREEN,
          title: 'Automated claims management',
          desc: 'On WalletEdge’s development roadmap: automated workflows to eliminate common gaps in expectation management between property entities, third-party administrators (TPAs) and the end insurers.'
        },
        {
          icon: 'sync_alt',
          tone: ORANGE,
          title: 'Integrated TPA routing',
          desc: 'Through integration with regional healthcare and property TPA networks, claims routing is designed to sync directly with corporate asset management panels — speeding up verification from months to a few digital cycles.'
        }
      ]
    }
  }
};

export const VENTURE_LIST: Venture[] = Object.values(VENTURES);

export const isVentureId = (id: string | undefined): id is VentureId => !!id && id in VENTURES;
