import { slug } from './slug';

/** File name without folder or extension: "/src/assets/team/jane-doe.jpg" → "jane-doe". */
const baseName = (path: string) => path.slice(path.lastIndexOf('/') + 1).replace(/\.\w+$/, '');

/**
 * Builds a name → URL lookup over an `import.meta.glob` result, matching by slug.
 * Drop `jane-doe.jpg` into the globbed folder and `lookup('Jane Doe')` finds it — no code change.
 *
 *   const teamPhoto = createAssetLookup(import.meta.glob<string>('@/assets/team/*.jpg', { eager: true, import: 'default' }));
 */
export function createAssetLookup(files: Record<string, string>): (name: string) => string | undefined {
  const bySlug = new Map(Object.entries(files).map(([path, url]) => [baseName(path), url]));
  return (name) => bySlug.get(slug(name));
}
