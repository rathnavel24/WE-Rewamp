/** Height kept clear under the fixed nav when scrolling to an anchor. */
export const NAV_OFFSET = 100;

/** Smooth-scrolls to an element id, leaving room for the fixed nav. */
export function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: 'smooth' });
}
