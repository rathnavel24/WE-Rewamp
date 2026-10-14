/** Simulated network latency for dev-only mocks (see `mockApi` in @/config/env). */
export const mockDelay = (ms = 400) => new Promise<void>((resolve) => setTimeout(resolve, ms));
