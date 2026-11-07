import type { Person } from '@/types';

/** Names and designations as given in the client tracker (WE017). */
export const FOUNDERS: Person[] = [
  { name: 'Sai Pranav', role: 'Founder & Chief Executive Officer' },
  { name: 'Gopi Senthil Raja', role: 'Founder & Chief Operating Officer' }
];

export const BOARD: Person[] = [
  { name: 'Rajarajeshwari Chandran', role: 'Director' },
  { name: 'ShanmugaRaj Gajendran', role: 'Director' },
  { name: 'Srikanth Murugesan', role: 'Non-Executive Director' }
];

export const DIVISION_LEADERS: Person[] = [
  { name: 'Ramachandran Ramasamy', role: 'Director - Healthcare' },
  { name: 'Manikandan Gurusamy', role: 'Director - Healthcare' },
  { name: 'TA Rangarajan', role: 'Executive Director - Insurance Claims Recovery Services' },
  {
    name: 'TA Devarajan',
    role: 'Group Legal Consultant & Chief Technical Advisor, Insurance Claims Recovery Services'
  },
  { name: 'Sai Gokul', role: 'Manager - Claims Recovery Services' },
  { name: 'Kalesh Kumar', role: 'General Manager - ArogyaPlus' },
  { name: 'Prakash K', role: 'Operations Manager - ArogyaPlus' }
  // Real Estate leaders (Suresh Kumar A — Operations Head; Ananth — Head of Marketing) are held back
  // while Real Estate is not shown on the site. Restore them here when it returns.
];

/** Everyone on the Our Team page, in the tracker's order. */
export const TEAM: Person[] = [...FOUNDERS, ...BOARD, ...DIVISION_LEADERS];

/** Leadership preview on the Home page. */
export const HOME_LEADERS: Person[] = [...FOUNDERS, ...BOARD.slice(0, 2)];
