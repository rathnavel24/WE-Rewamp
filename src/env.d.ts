/// <reference types="vite/client" />

/**
 * Every VITE_* variable the app reads. Add new ones here *and* in .env.example,
 * then read them only through `@/config/env` — never `import.meta.env` directly.
 */
interface ImportMetaEnv {
  /** Backend base URL, no trailing slash. Empty = no backend (dev mocks the API). */
  readonly VITE_API_BASE_URL?: string;
  /** Comma-separated feature flags to switch on, e.g. "aiAssistant". See src/config/features.ts. */
  readonly VITE_FEATURES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
