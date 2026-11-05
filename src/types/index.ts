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

export interface Venture {
  id: VentureId;
  /** The service this venture is listed under on the Services page. */
  service: ServiceId;
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
  steps?: Feature[];
  /** Optional case-study block on the venture page. */
  caseStudy?: CaseStudy;
  /** Contact-form topic pre-selected from this venture's "Enquire about…" button (one of ENQUIRY_TOPICS). */
  enquiryTopic: string;
}

export interface CaseStudy {
  kicker: string;
  title: string;
  lead: string;
  points: Array<Feature & { tone: Tone }>;
}

/** The group's four services; each id is also its section anchor on the Services page. */
export type ServiceId = 'it-bpo' | 'financial' | 'consulting' | 'healthcare';

/** A legal entity of the group. Parents sit above the services; every other company sits under one. */
export interface GroupCompany {
  name: string;
  country: Country;
  /** What the company is, as shown in the Home "Our companies" register. */
  role: string;
  /** The service the company is listed under. Parents have none. */
  service?: ServiceId;
  parent?: boolean;
  /** Short line on what the company does, from the client's content document. */
  note?: string;
  /** The platform this company builds or runs, linked from its role line. */
  venture?: VentureId;
}

/** Something a service offers — a platform, an offering line or a company — shown on the Home page. */
/** A downloadable file linked from the site. */
export interface Download {
  label: string;
  href: string;
}

export interface ServiceOffering {
  icon: string;
  title: string;
  desc?: string;
  /** Internal link, usually a venture page. */
  href?: string;
  /** Small label beside the icon (website or phone). */
  meta?: string;
  /** What the offering covers, as a short list. */
  items?: string[];
  /** One key figure from the content document. */
  stat?: { value: string; label: string };
  /** A file to download, such as a brochure (path under public/). */
  download?: Download;
}

export interface Service {
  id: ServiceId;
  icon: string;
  title: string;
  /** Short name for pills and menus. */
  short: string;
  desc: string;
  /** What the service offers — brands, offerings or clients. */
  tags: string[];
  tone: Tone;
  /** Longer introduction for the Home page panel. */
  summary: string;
  offerings: ServiceOffering[];
}

/** One offering on the Services page: a platform, an offering line or a company, in detail. */
export interface ServiceColumn {
  title: string;
  /** The platform or company this column describes; shows its logo. */
  venture?: VentureId;
  /** Internal link, usually a venture page. */
  href?: string;
  /** Small label under the title (website or phone). */
  meta?: string;
  desc?: string;
  stats?: Stat[];
  /** What it covers, as a short checked list. */
  points?: string[];
  download?: Download;
}

/** The Services page section for one service. */
export interface ServiceDetail {
  /** One-line statement beside the service name. */
  heading: string;
  /** Clients named for this service in the content document. */
  clients?: string[];
  columns: ServiceColumn[];
  /** Set the section on the dark band. */
  dark?: boolean;
}

export interface Person {
  name: string;
  role: string;
}

export interface Founder extends Person {
  initials: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** Drop-down shown under this link. */
  menu?: 'services' | 'companies';
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

/** A group company's corporate office, listed in the footer. */
export interface CorporateOffice {
  company: string;
  addressLines: string[];
}

export interface EnquiryTopic {
  label: string;
  icon: string;
}
