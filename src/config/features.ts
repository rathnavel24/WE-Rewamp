import { env } from './env';

/**
 * Feature flags. A new feature (e.g. the AI assistant) ships dark behind a flag and is
 * switched on per environment with VITE_FEATURES — no code change needed to roll it out.
 *
 *   VITE_FEATURES=aiAssistant          # on
 *   VITE_FEATURES=                     # everything off (default)
 *
 * To add a flag: add it to FEATURE_FLAGS with a one-line description, then read it with
 * `isEnabled('yourFlag')` (or `features.yourFlag`).
 */
export const FEATURE_FLAGS = {
  /** AI assistant (chat) — see src/features/ai/README.md. */
  aiAssistant: 'AI assistant chat widget'
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

/** Parses "a, b" into the set of known flags; unknown names are ignored (and warned about in dev). */
export function parseFeatures(raw: string): Set<FeatureFlag> {
  const known = new Set<FeatureFlag>();
  for (const name of raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)) {
    if (name in FEATURE_FLAGS) known.add(name as FeatureFlag);
    else if (env.isDev) console.warn(`[features] Unknown feature flag "${name}" in VITE_FEATURES`);
  }
  return known;
}

const enabled = parseFeatures(env.features);

export const isEnabled = (flag: FeatureFlag): boolean => enabled.has(flag);

/** Snapshot of every flag, e.g. `features.aiAssistant`. */
export const features = Object.fromEntries(
  (Object.keys(FEATURE_FLAGS) as FeatureFlag[]).map((f) => [f, enabled.has(f)])
) as Record<FeatureFlag, boolean>;
