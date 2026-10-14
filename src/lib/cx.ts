/** Joins truthy class names: cx('a', on && 'b') → "a b". */
export const cx = (...names: Array<string | false | null | undefined>) => names.filter(Boolean).join(' ');
