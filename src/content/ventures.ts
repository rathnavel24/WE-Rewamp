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
    sector: 'InsureTech · WhiteBlue Fintech Ltd',
    tagline: 'The AI-powered insurance operating system designed specifically for insurance brokerages.',
    about:
      'InsureLiv offers an AI-powered insurance operating system designed specifically for insurance brokerages. The platform serves as a unified end-to-end lifecycle management solution that connects agents, operations, and leadership across the entire broker workflow, from initial lead capture to policy renewal.',
    site: { label: 'insureliv.com', href: 'https://www.insureliv.com/ae/en' },
    stats: [
      { n: 7, suffix: 'X', label: 'Faster turnaround' },
      { n: 70, prefix: '+', suffix: '%', label: 'Productivity gain' },
      { n: 50, suffix: '%', label: 'Cost savings' },
      { n: 35, prefix: '+', suffix: '%', label: 'Lead conversion' }
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
    sector: 'HealthTech · Wallet Edge Technologies LLC',
    tagline: 'Book comprehensive health packages and individual laboratory tests online.',
    about:
      'ArogyaPlus is an online platform to book comprehensive health packages and individual laboratory tests. Operating through CAP-accredited labs and DHA-certified staff, it lets you schedule diagnostic screenings conveniently. The platform provides comprehensive tracking for vital biomarkers including heart, liver, kidney, thyroid, vitamin, and metabolic parameters.',
    site: { label: 'arogyaplus.com', href: 'https://www.arogyaplus.com/' },
    stats: [
      { n: 1000, suffix: '+', label: 'Families served' },
      { n: 250, suffix: '+', label: 'Advanced lab tests' },
      { n: 48, suffix: 'h', label: 'Digital reports' },
      { n: 98, suffix: '%', label: 'Happy customers' }
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
        icon: 'inventory_2',
        title: 'Pick a package',
        desc: 'Browse packages and choose what fits your health goals.'
      },
      { icon: 'event_available', title: 'Book a slot', desc: 'Select a convenient date and time.' },
      {
        icon: 'vaccines',
        title: 'Sample collected',
        desc: 'A certified professional collects the sample safely.'
      },
      {
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
    name: 'CareHub Healthcare LLC',
    icon: 'home_health',
    menuLine: 'DHA-licensed home nursing',
    sector: 'DHA-licensed · Dubai',
    tagline: 'Championing your recovery, elevating your healthy future: expert home nursing in Dubai.',
    about:
      'CareHub Healthcare LLC understands that medical needs are rarely singular; they require a multi-disciplinary approach that evolves with the patient. We have meticulously designed a “Healthcare Hub” that integrates acute clinical nursing, specialised chronic care, and preventative wellness services under one roof. Every service we provide is delivered by DHA-licensed professionals who adhere to international safety protocols, ensuring that whether you require a simple blood test or complex ventilator support, you receive hospital-grade excellence in the privacy of your home.',
    site: { label: 'carehubuae.com', href: 'https://carehubuae.com' },
    featTitle: 'DHA-licensed home healthcare & nursing',
    features: [
      {
        icon: 'vaccines',
        title: 'Private nursing',
        desc: 'Skilled home nursing: professional bedside care, including injection services, blood tests at home, and medication management.'
      },
      {
        icon: 'home_health',
        title: 'Home nursing',
        desc: 'Critical and post-operative care: specialised ventilator care, post-stroke recovery, and paralytic care to ensure a safe transition from hospital to home.'
      },
      {
        icon: 'elderly',
        title: 'Post-hospitalisation',
        desc: 'Elderly and chronic care: compassionate elderly care and specialised Parkinson’s care designed to maintain independence and dignity.'
      },
      {
        icon: 'spa',
        title: 'Palliative care',
        desc: 'Specialised therapy and wellness: expert physiotherapy services, palliative care, and premium Hydrafacial services for holistic wellbeing.'
      },
      {
        icon: 'stethoscope',
        title: 'Doctor home visits',
        desc: 'On-demand clinical assessments and consultations at your place, for convenience and safety.'
      }
    ]
  },
  globalcure: {
    id: 'globalcure',
    service: 'healthcare',
    enquiryTopic: 'Healthcare',
    tone: ORANGE,
    name: 'Global Cure RX Pharmacy LLC',
    icon: 'medication',
    menuLine: 'Online pharmacy & medical supplies',
    sector: 'Pharmacy · Dubai',
    tagline: 'Online pharmacy and medical supplies.',
    about:
      'Global Cure RX Pharmacy LLC is a Dubai-based online platform providing easy access to authenticated medicines, wellness vitamins, cosmetics, personal care items, and certified medical or surgical equipment. Physically located in International City, it is a healthcare partner catering to everyday health and professional needs, with delivery across the entire United Arab Emirates.',
    site: { label: '+971 50 515 2391', href: 'tel:+971505152391' },
    featTitle: 'Pharmacy services',
    features: [
      {
        icon: 'inventory_2',
        title: 'Diverse product range',
        desc: 'Supplies medical consumables, orthopaedic supports, surgical products, and everyday wellness items.'
      },
      {
        icon: 'chat',
        title: '1-click WhatsApp ordering',
        desc: 'A seamless feature that compiles cart details into a pre-filled WhatsApp message for instant checkout.'
      },
      {
        icon: 'verified_user',
        title: 'Enhanced payment security',
        desc: 'Avoids online card gateways, eliminating data leak risks by handling order fulfilment securely.'
      },
      {
        icon: 'support_agent',
        title: 'Expert support',
        desc: 'Offers direct access to licensed Dubai pharmacy specialists for consultations and immediate assistance.'
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
    // Placeholder until the client supplies the real brochure — swap the file in public/brochures/.
    download: { label: 'Download brochure', href: '/brochures/insurance-claims-recovery-services.pdf' },
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
