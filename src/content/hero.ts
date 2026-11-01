import type { ServiceId, Tone, VentureId } from '@/types';
import { SERVICES } from './services';
import { GREEN, ORANGE } from './tones';

export interface HeroSector {
  /** Word shown in the headline: "A diversified group operating in …" */
  word: string;
  tone: Tone;
  /** Ventures behind this word (phone chips). None = the group itself. */
  ventures: VentureId[];
  /** The service-category card the hero wheel turns to while this word shows. None on the finale. */
  card?: HeroWheelCard;
  /** The closing word: every card on the wheel merges into one WalletEdge card instead of turning. */
  finale?: boolean;
  /** How long this word stays, if not the usual. */
  holdMs?: number;
}

export interface HeroWheelCard {
  icon: string;
  tone: Tone;
  /** Small mono line above the title, e.g. "Service 01". */
  label: string;
  title: string;
  note: string;
}

/** One wheel card per service category, in the order of SERVICES. */
const serviceCard = (id: ServiceId, note: string): HeroWheelCard => {
  const svc = SERVICES.find((x) => x.id === id)!;
  return { icon: svc.icon, tone: svc.tone, label: `Service ${svc.no}`, title: svc.title, note };
};

/** Sectors cycled by the headline, each bringing its service category round on the wheel. */
export const HERO_SECTORS: HeroSector[] = [
  {
    word: 'IT & BPO.',
    tone: ORANGE,
    ventures: ['insureliv', 'arogyaplus'],
    card: serviceCard('it-bpo', 'InsureTech & HealthTech')
  },
  {
    word: 'financial services.',
    tone: GREEN,
    ventures: ['recovery'],
    card: serviceCard('financial', 'Insurance recovery & NRI investment planning')
  },
  {
    word: 'consulting.',
    tone: ORANGE,
    ventures: [],
    card: serviceCard('consulting', 'Business setup, management, HR & accounting')
  },
  {
    word: 'healthcare.',
    tone: GREEN,
    ventures: ['carehub', 'globalcure', 'arogyaplus'],
    card: serviceCard('healthcare', 'Home healthcare & pharmacy')
  },
  // Held longer, so the cards have time to fly in and merge before the next round.
  { word: 'the UAE & India.', tone: ORANGE, ventures: [], finale: true, holdMs: 3800 }
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
  { count: 7, label: 'Companies' },
  { count: 4, label: 'Services' },
  { count: 2, label: 'Countries' }
];
