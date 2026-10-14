import { createAssetLookup } from '@/lib/assets';

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
