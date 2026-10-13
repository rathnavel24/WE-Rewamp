/** Colour treatment used across cards: green (G) or orange (O). */
export interface Tone {
  /** Solid brand colour (icon tile backgrounds, hover fills). */
  accent: string;
  /** Text/icon colour on soft backgrounds. */
  ink: string;
  /** Soft background tint. */
  soft: string;
}

export type Country = 'UAE' | 'INDIA';

export type VentureId = 'insureliv' | 'arogyaplus' | 'carehub' | 'globalcure' | 'recovery';

export interface Stat {
  n: number;
  suffix: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface ProcessStep extends Feature {
  no: string;
}

export interface Venture {
  id: VentureId;
  tone: Tone;
  name: string;
  icon: string;
  sector: string;
  tagline: string;
  about: string;
  /** Short line used in the nav mega-menu. */
  menuLine: string;
  /** Label in the footer, when it differs from `name`. */
  footerName?: string;
  site?: { label: string; href: string };
  stats?: Stat[];
  featTitle: string;
  features: Feature[];
  steps?: ProcessStep[];
  /** Shows the EMAAR case-study block. */
  caseStudy?: boolean;
}

export interface Company {
  name: string;
  short: string;
  sector: string;
  icon: string;
  country: Country;
  desc: string;
  /** Destination from the Companies directory. */
  href: string;
  cta: string;
  tone: Tone;
  parent?: boolean;
  /** One-liner used in the Home page company list. */
  groupLine: string;
  /** Destination from the Home page company list. */
  groupHref: string;
}

export interface ServiceCard {
  no: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  tone: Tone;
  href: string;
}

export interface ServicePillar {
  title: string;
  icon: string;
  anchor: string;
  tone: Tone;
}

export interface Person {
  name: string;
  role: string;
  unit?: string;
}

export interface Founder extends Person {
  initials: string;
  background: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  menu?: boolean;
}

export interface Office {
  country: string;
  /** Short label used as the footer column heading. */
  short: string;
  badge: string;
  icon: string;
  tone: Tone;
  addressLines: string[];
  phone: { label: string; href: string };
}

export interface EnquiryTopic {
  label: string;
  icon: string;
}

export interface EnquiryPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  topics: string[];
  /** Set when the visitor came from a venture page's "Enquire about…" button. */
  venture?: VentureId;
  /** Page the enquiry was sent from, e.g. "/contact" or "/ventures/carehub". */
  source?: string;
}
