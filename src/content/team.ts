import type { Founder, Person } from '@/types';

export const FOUNDERS: Founder[] = [
  {
    name: 'SaiPranav',
    role: 'Founder & Chief Executive Officer',
    initials: 'SP',
    background: 'linear-gradient(150deg, var(--green-700), var(--forest-900))'
  },
  {
    name: 'Gopi Senthil Raja',
    role: 'Founder & Chief Operating Officer',
    initials: 'GS',
    background: 'linear-gradient(150deg, var(--orange-600), var(--orange-900))'
  }
];

export const BOARD: Person[] = [
  { name: 'Rajarajeshwari Chandran', role: 'Director' },
  { name: 'ShanmugaRaj Gajendran', role: 'Director' },
  { name: 'Srikanth Murugesan', role: 'Non-Executive Director' }
];

export const DIVISION_LEADERS: Person[] = [
  { name: 'Ramachandran Ramasamy', role: 'Director', unit: 'CareHub Healthcare' },
  { name: 'Manikandan Gurusamy', role: 'Director', unit: 'Global Cure RX Pharmacy' },
  { name: 'TA Rangarajan', role: 'Executive Director', unit: 'Recovery Services' },
  { name: 'TA Devarajan', role: 'Group Legal Consultant', unit: 'Recovery Services' },
  { name: 'SaiGokul', role: 'Manager', unit: 'Recovery Services' },
  { name: 'Kalesh Kumar', role: 'General Manager', unit: 'ArogyaPlus.com' },
  { name: 'Prakash', role: 'Operations Manager', unit: 'ArogyaPlus.com' },
  { name: 'Suresh Kumar A', role: 'Operations Head', unit: 'Real Estate' },
  { name: 'Ananth', role: 'Head of Marketing', unit: 'Real Estate' }
];

/** Leadership preview on the Home page. */
export const HOME_LEADERS: Person[] = [
  { name: 'SaiPranav', role: 'Founder & CEO' },
  { name: 'Gopi Senthil Raja', role: 'Founder & COO' },
  { name: 'Rajarajeshwari Chandran', role: 'Director' },
  { name: 'ShanmugaRaj Gajendran', role: 'Director' }
];

export const LEADER_COUNT = FOUNDERS.length + BOARD.length + DIVISION_LEADERS.length;
