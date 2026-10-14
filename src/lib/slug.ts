/** "Emaar Properties" → "emaar-properties". Used to match content names to asset filenames. */
export const slug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
