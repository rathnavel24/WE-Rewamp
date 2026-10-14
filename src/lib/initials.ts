/** "Rajarajeshwari Chandran" → "RC". Mirrors the initials logic in the design. */
export const initials = (name: string): string =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
