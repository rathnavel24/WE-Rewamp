import type { Person } from '@/types';

/* Company names exactly as in the register (WE014, WE025); content.test.ts checks them. */
const HOLDING = 'Wallet Edge Global FZC LLC';
const TECHNOLOGIES = 'Wallet Edge Technologies LLC';
const CAREHUB = 'CareHub Healthcare LLC';
const GLOBAL_CURE = 'Global Cure RX Pharmacy LLC';
const FINANCIAL = 'Wallet Edge Financial Services Pvt Ltd';

/**
 * Names and designations as given in the client tracker (WE017). Companies follow the business each leader runs in the
 * redesign brief; founders and the board sit with the holding company. Awaiting client confirmation (WE025).
 */
export const FOUNDERS: Person[] = [
  { name: 'Sai Pranav', role: 'Founder & Chief Executive Officer', company: HOLDING },
  { name: 'Gopi Senthil Raja', role: 'Founder & Chief Operating Officer', company: HOLDING }
];

export const BOARD: Person[] = [
  { name: 'Rajarajeshwari Chandran', role: 'Director', company: HOLDING },
  { name: 'ShanmugaRaj Gajendran', role: 'Director', company: HOLDING },
  { name: 'Srikanth Murugesan', role: 'Non-Executive Director', company: HOLDING }
];

export const DIVISION_LEADERS: Person[] = [
  { name: 'Ramachandran Ramasamy', role: 'Director - Healthcare', company: CAREHUB },
  { name: 'Manikandan Gurusamy', role: 'Director - Healthcare', company: GLOBAL_CURE },
  { name: 'TA Rangarajan', role: 'Executive Director - Insurance Claims Recovery Services', company: FINANCIAL },
  {
    name: 'TA Devarajan',
    role: 'Group Legal Consultant & Chief Technical Advisor, Insurance Claims Recovery Services',
    company: FINANCIAL
  },
  { name: 'Sai Gokul', role: 'Manager - Claims Recovery Services', company: FINANCIAL },
  { name: 'Kalesh Kumar', role: 'General Manager - ArogyaPlus', company: TECHNOLOGIES },
  { name: 'Prakash K', role: 'Operations Manager - ArogyaPlus', company: TECHNOLOGIES }
  // Real Estate leaders (Suresh Kumar A — Operations Head; Ananth — Head of Marketing) are held back
  // while Real Estate is not shown on the site. Restore them here when it returns.
];

/** Everyone on the Our Team page, in the tracker's order. */
export const TEAM: Person[] = [...FOUNDERS, ...BOARD, ...DIVISION_LEADERS];

/** Leadership preview on the Home page: names and designations only, as its tiles are small. */
export const HOME_LEADERS: Person[] = [...FOUNDERS, ...BOARD.slice(0, 2)].map((p) => ({ ...p, company: undefined }));
