import type { Tone, VentureId } from '@/types';
import { GREEN, ORANGE } from './tones';

export interface HeroSector {
  /** Word shown in the headline: "One group building the edge in …" */
  word: string;
  tone: Tone;
  /** Ventures that light up in the orbit while this word shows. None = the group itself (core logo). */
  ventures: VentureId[];
}

/** Sectors cycled by the headline, each linked to the companies working in it. */
export const HERO_SECTORS: HeroSector[] = [
  { word: 'IT & BPO.', tone: ORANGE, ventures: ['insureliv', 'arogyaplus'] },
  { word: 'Financial services.', tone: GREEN, ventures: ['recovery'] },
  { word: 'Healthcare.', tone: ORANGE, ventures: ['carehub', 'globalcure', 'arogyaplus'] },
  { word: 'Consulting.', tone: GREEN, ventures: [] },
  { word: 'Real estate.', tone: ORANGE, ventures: [] }
];

/** One sentence for screen readers, instead of the animated word. */
export const HERO_SECTORS_SENTENCE = 'IT & BPO, financial services, healthcare, consulting and real estate.';

export interface HeroOrbitItem {
  id: VentureId;
  name: string;
  icon: string;
  tone: Tone;
  /** Position on the orbit ring, as % of the square visual. */
  x: number;
  y: number;
}

/** Ventures orbiting the logo, evenly spaced on a circle of radius 45%. */
export const HERO_ORBIT: HeroOrbitItem[] = [
  { id: 'insureliv', name: 'InsureLiv', icon: 'shield_with_heart', tone: GREEN, x: 50, y: 5 },
  { id: 'arogyaplus', name: 'ArogyaPlus', icon: 'biotech', tone: ORANGE, x: 92.8, y: 36.1 },
  { id: 'carehub', name: 'CareHub', icon: 'home_health', tone: GREEN, x: 76.5, y: 86.4 },
  { id: 'globalcure', name: 'Global Cure RX', icon: 'medication', tone: ORANGE, x: 23.5, y: 86.4 },
  { id: 'recovery', name: 'Recovery', icon: 'account_balance', tone: GREEN, x: 7.2, y: 36.1 }
];

/** Shown instead of venture chips (phones) for sectors the group runs itself. */
export const HERO_GROUP_CHIP = { name: 'WalletEdge Global', icon: 'account_tree' };

export const HERO_STATS = [
  { count: 7, label: 'Group companies' },
  { count: 15, suffix: '+', label: 'Insurers & enterprises' },
  { count: 2, label: 'Countries' }
];
