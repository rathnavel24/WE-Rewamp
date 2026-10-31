import type { Tone, VentureId } from '@/types';
import { GREEN, ORANGE } from './tones';

export interface HeroSector {
  /** Word shown in the headline: "A diversified group operating in …" */
  word: string;
  tone: Tone;
  /** Ventures behind this word (phone chips). None = the group itself. */
  ventures: VentureId[];
  /** Cards the hero wheel turns to while this word shows, top to bottom. */
  cards: HeroWheelCard[];
  /** The closing word: every card on the wheel merges into one WalletEdge card instead of turning. */
  finale?: boolean;
  /** How long this word stays, if not the usual. */
  holdMs?: number;
}

export interface HeroWheelCard {
  icon: string;
  tone: Tone;
  /** Small mono line above the title, e.g. "InsurTech · GCC". */
  label: string;
  title: string;
  note: string;
}

/** Sectors cycled by the headline, each linked to the companies working in it. */
export const HERO_SECTORS: HeroSector[] = [
  {
    word: 'IT & BPO.',
    tone: ORANGE,
    ventures: ['insureliv', 'arogyaplus'],
    cards: [
      {
        icon: 'shield_with_heart',
        tone: GREEN,
        label: 'InsurTech · GCC',
        title: 'InsureLiv',
        note: 'AI insurance operating system'
      },
      {
        icon: 'biotech',
        tone: ORANGE,
        label: 'HealthTech · Dubai',
        title: 'ArogyaPlus',
        note: 'Home diagnostics & health packages'
      },
      {
        icon: 'memory',
        tone: GREEN,
        label: 'Technology · UAE',
        title: 'Wallet Edge Technologies',
        note: 'The technology behind ArogyaPlus'
      }
    ]
  },
  {
    word: 'financial services.',
    tone: GREEN,
    ventures: ['recovery'],
    cards: [
      {
        icon: 'account_balance',
        tone: ORANGE,
        label: 'Financial services',
        title: 'Recovery Services',
        note: 'Financial recovery & asset retrieval'
      },
      {
        icon: 'shield',
        tone: GREEN,
        label: 'Insurance recovery',
        title: 'Recovery agent services',
        note: 'Clients include EMAAR and LIVA Insurance'
      },
      {
        icon: 'corporate_fare',
        tone: ORANGE,
        label: 'Group company · India',
        title: 'Wallet Edge Financial Services',
        note: 'Wallet Edge Financial Services Pvt Ltd'
      }
    ]
  },
  {
    word: 'consulting.',
    tone: ORANGE,
    ventures: [],
    cards: [
      {
        icon: 'business_center',
        tone: GREEN,
        label: 'Consulting',
        title: 'Business consulting',
        note: 'Including company formation in UAE'
      },
      {
        icon: 'account_tree',
        tone: ORANGE,
        label: 'Consulting',
        title: 'Management consulting',
        note: 'HR, finance & accounts'
      },
      {
        icon: 'groups',
        tone: GREEN,
        label: 'HR consulting',
        title: 'Recruitment, PRO & payroll',
        note: 'Part of management consulting'
      }
    ]
  },
  {
    word: 'healthcare.',
    tone: GREEN,
    ventures: ['carehub', 'globalcure', 'arogyaplus'],
    cards: [
      {
        icon: 'home_health',
        tone: GREEN,
        label: 'Home healthcare · Dubai',
        title: 'CareHub Healthcare',
        note: 'DHA-licensed nursing & doctor visits'
      },
      {
        icon: 'medication',
        tone: ORANGE,
        label: 'Pharmacy · Dubai',
        title: 'Global Cure RX Pharmacy',
        note: 'Community pharmacy, insurance tie-ups'
      },
      {
        icon: 'biotech',
        tone: GREEN,
        label: 'Diagnostics · Dubai',
        title: 'ArogyaPlus',
        note: 'Home sample collection & lab tests'
      }
    ]
  },
  // Held longer, so every card has time to fly in and merge before the next round.
  { word: 'the UAE & India.', tone: ORANGE, ventures: [], cards: [], finale: true, holdMs: 3800 }
];

/** The WalletEdge card everything merges into at the end of each round. */
export const HERO_FINALE = {
  note: '7 companies · 4 services',
  /** Company tiles shown in a stack, with the rest counted. */
  icons: [
    { icon: 'shield_with_heart', tone: GREEN },
    { icon: 'biotech', tone: ORANGE },
    { icon: 'home_health', tone: GREEN },
    { icon: 'medication', tone: ORANGE }
  ],
  more: '+3'
};

/** One sentence for screen readers, instead of the animated word. */
export const HERO_SECTORS_SENTENCE =
  'IT & BPO, financial services, consulting and healthcare, across the UAE and India.';

export interface HeroOrbitItem {
  id: VentureId;
  name: string;
  icon: string;
  tone: Tone;
}

/** Ventures shown as chips under the headline on phones and tablets. */
export const HERO_ORBIT: HeroOrbitItem[] = [
  { id: 'insureliv', name: 'InsureLiv', icon: 'shield_with_heart', tone: GREEN },
  { id: 'arogyaplus', name: 'ArogyaPlus', icon: 'biotech', tone: ORANGE },
  { id: 'carehub', name: 'CareHub Healthcare', icon: 'home_health', tone: GREEN },
  { id: 'globalcure', name: 'Global Cure RX', icon: 'medication', tone: ORANGE },
  { id: 'recovery', name: 'Recovery', icon: 'account_balance', tone: GREEN }
];

/** Shown instead of venture chips (phones) for sectors the group runs itself. */
export const HERO_GROUP_CHIP = { name: 'WalletEdge Global', icon: 'account_tree' };

export const HERO_STATS: Array<{ count: number; suffix?: string; label: string }> = [
  { count: 7, label: 'Group companies' },
  { count: 15, label: 'Trusted clients' },
  { count: 2, label: 'Countries' }
];
