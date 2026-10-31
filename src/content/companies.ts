import type { Country, GroupCompany, ServiceId } from '@/types';

/**
 * The group's seven companies, named and ordered exactly as in the client's content document ("Our Companies").
 * Listed in full in the Home "Our companies" section; each one also appears under its service ("Delivered by").
 */
export const GROUP_COMPANIES: GroupCompany[] = [
  { name: 'Wallet Edge Global FZC LLC', country: 'UAE', parent: true, note: 'SPC Freezone, Sharjah' },
  {
    name: 'Wallet Edge Technologies LLC',
    country: 'UAE',
    service: 'it-bpo',
    note: 'Powers the ArogyaPlus platform',
    venture: 'arogyaplus'
  },
  {
    name: 'CareHub Healthcare LLC',
    country: 'UAE',
    service: 'healthcare',
    note: 'DHA-licensed home healthcare · carehubuae.com',
    venture: 'carehub'
  },
  {
    name: 'Global Cure RX Pharmacy LLC',
    country: 'UAE',
    service: 'healthcare',
    note: 'DHA-licensed community pharmacy, Dubai',
    venture: 'globalcure'
  },
  {
    name: 'WhiteBlue Fintech Ltd',
    country: 'UAE',
    service: 'it-bpo',
    note: 'Built the InsureLiv platform',
    venture: 'insureliv'
  },
  {
    name: 'Wallet Edge Financial Services Pvt Ltd',
    country: 'INDIA',
    service: 'financial',
    note: 'The group’s financial services company in India'
  },
  { name: 'Wallet Edge Services Pvt Ltd', country: 'INDIA', parent: true }
];

export const PARENT_COMPANIES = GROUP_COMPANIES.filter((c) => c.parent);

/** The companies listed under a service. */
export const companiesFor = (id: ServiceId) => GROUP_COMPANIES.filter((c) => c.service === id);

/** Display name for each country the group operates in. */
export const COUNTRY_LABELS: Record<Country, string> = {
  UAE: 'UAE',
  INDIA: 'India'
};
