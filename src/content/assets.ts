import type { GroupCompany, VentureId } from '@/types';
import { createAssetLookup } from '@/lib/assets';
import walletEdgeLogo from '@/assets/brand/walletedge-logo.png';
import { GROUP_COMPANIES } from './companies';

/*
 * Image folders that grow without code changes: add a file named by slug and it's picked up.
 * (import.meta.glob needs literal patterns, so each folder is declared here.)
 */

/** Client logos for the Home "Trusted by" marquee — src/assets/clients/<client-slug>.svg|png|webp|jpg */
export const clientLogo = createAssetLookup(
  import.meta.glob<string>('@/assets/clients/*.{svg,png,webp,jpg,jpeg}', { eager: true, import: 'default' })
);

/** Team photos — src/assets/team/<person-slug>.jpg|png|webp */
export const teamPhoto = createAssetLookup(
  import.meta.glob<string>('@/assets/team/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
);

/** Company and platform logos — src/assets/logos/<company-name-slug or venture-id>.svg|png. See SOURCES.md there. */
const logos = createAssetLookup(
  import.meta.glob<string>('@/assets/logos/*.{svg,png,webp,jpg,jpeg}', { eager: true, import: 'default' })
);

/** A group company's logo. The Wallet Edge companies share the WalletEdge brand logo. */
export const companyLogo = (c: GroupCompany): string | undefined =>
  logos(c.name) ?? (c.name.startsWith('Wallet Edge') ? walletEdgeLogo : undefined);

/** A platform's logo: its own file, else the logo of the company that runs it. */
export const ventureLogo = (id: VentureId): string | undefined => {
  const runBy = GROUP_COMPANIES.find((c) => c.venture === id);
  return logos(id) ?? (runBy ? logos(runBy.name) : undefined);
};
