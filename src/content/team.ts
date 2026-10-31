import type { Founder, Person } from '@/types';

export const FOUNDERS: Founder[] = [
  {
    name: 'SaiPranav',
    role: 'Founder & Chief Executive Officer',
    initials: 'SP'
  },
  {
    name: 'Gopi Senthil Raja',
    role: 'Founder & Chief Operating Officer',
    initials: 'GS'
  }
];

export const BOARD: Person[] = [
  { name: 'Rajarajeshwari Chandran', role: 'Director' },
  { name: 'ShanmugaRaj Gajendran', role: 'Director' },
  { name: 'Srikanth Murugesan', role: 'Non-Executive Director' }
];

export const DIVISION_LEADERS: Person[] = [
  { name: 'Ramachandran Ramasamy', role: 'Director', unit: 'CareHub Healthcare', venture: 'carehub' },
  { name: 'Manikandan Gurusamy', role: 'Director', unit: 'Global Cure RX Pharmacy', venture: 'globalcure' },
  { name: 'TA Rangarajan', role: 'Executive Director', unit: 'Recovery Services', venture: 'recovery' },
  { name: 'TA Devarajan', role: 'Group Legal Consultant', unit: 'Recovery Services', venture: 'recovery' },
  { name: 'SaiGokul', role: 'Manager', unit: 'Recovery Services', venture: 'recovery' },
  { name: 'Kalesh Kumar', role: 'General Manager', unit: 'ArogyaPlus.com', venture: 'arogyaplus' },
  { name: 'Prakash', role: 'Operations Manager', unit: 'ArogyaPlus.com', venture: 'arogyaplus' }
  // Real Estate leaders (Suresh Kumar A — Operations Head; Ananth — Head of Marketing) are held back
  // while Real Estate is not shown on the site. Restore them here when it returns.
];

/** Leadership preview on the Home page. */
export const HOME_LEADERS: Person[] = [
  { name: 'SaiPranav', role: 'Founder & CEO' },
  { name: 'Gopi Senthil Raja', role: 'Founder & COO' },
  { name: 'Rajarajeshwari Chandran', role: 'Director' },
  { name: 'ShanmugaRaj Gajendran', role: 'Director' }
];

export const LEADER_COUNT = FOUNDERS.length + BOARD.length + DIVISION_LEADERS.length;
