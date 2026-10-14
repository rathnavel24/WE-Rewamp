/**
 * Typed runtime configuration. The only module that reads `import.meta.env` —
 * everything else imports from here, so config stays discoverable and testable.
 */

const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const env = {
  /** Backend base URL (no trailing slash), or '' when no backend is configured. */
  apiBaseUrl: trimSlash(import.meta.env.VITE_API_BASE_URL?.trim() ?? ''),
  /** Raw feature-flag list; parsed in ./features. */
  features: import.meta.env.VITE_FEATURES ?? '',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
} as const;

/** True when no backend is configured. */
export const hasBackend = env.apiBaseUrl !== '';

/**
 * Mocked API responses are for local development only. A production build without a backend
 * must fail loudly — otherwise the contact form would "succeed" and silently drop enquiries.
 */
export const mockApi = !hasBackend && env.isDev;
