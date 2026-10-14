# Architecture

How the WalletEdge site is organised, the rules that keep it that way, and recipes for growing it —
new pages, sections, features, backend endpoints and AI.

## Layers

```
src/
  main.tsx            Entry: global CSS + <AppProviders><App/></AppProviders>
  app/                App shell — route table, providers, error boundary, lazy loading
  pages/<Name>/       One folder per route; composes sections, features and the UI kit
  features/<name>/    Self-contained capabilities with logic + UI + API (enquiry, ai, …)
  components/
    layout/           Site chrome: SiteNav, SiteFooter, Layout
    ui/               Design-system kit — content-free, reusable anywhere
  hooks/              Generic React hooks (usePageMeta, useMotion, useScrollProgress, …)
  context/            App-wide React context (page transitions)
  content/            All site copy and lists, plus image lookups — the "CMS" for now
  api/                HTTP client: request(), stream(), parseSse(), ApiError, mocks
  config/             env (typed VITE_* vars), feature flags, route paths
  lib/                Pure helpers (motion engine, slug, assets, scroll, cx)
  types/              Shared domain types
  styles/             tokens.css (design tokens) + global.css
  assets/             brand/, clients/, team/ images
```

### Dependency rule

Each layer imports only from layers **below** it. ESLint enforces this (`eslint.config.js`), so a wrong
import fails `npm run lint` and CI.

```
app → pages → features → components/layout → components/ui → hooks / context → content → api → config / lib / types
```

| Layer                                                          | May import                                                                                    | Must not import                                                       |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `app/`                                                         | everything                                                                                    | —                                                                     |
| `pages/`                                                       | features (via index), components, hooks, content, config, lib, api, types; `pages/NotFound`   | other pages, `app/`                                                   |
| `features/<x>/`                                                | other features via `@/features/<y>`, `components/ui`, hooks, content, config, lib, api, types | pages, `components/layout`, `app/`                                    |
| `components/layout/`                                           | `components/ui`, hooks, context, content, config, lib, types                                  | pages, features, `app/`                                               |
| `components/ui/`                                               | hooks, context, lib, types                                                                    | **content**, pages, features, layout — the kit takes content as props |
| `hooks`, `context`, `content`, `api`, `config`, `lib`, `types` | each other (downwards)                                                                        | any component, page, feature                                          |

Two more rules:

- **Features have a front door.** Import `@/features/enquiry`, never `@/features/enquiry/api` — each feature's
  `index.ts` is its public API, so its internals can be refactored freely.
- **`import.meta.env` is read only in `src/config/env.ts`.** Everything else imports `env`, `hasBackend`,
  `mockApi` or feature flags from `@/config/*`.

## Conventions

- **Files**: components `PascalCase.tsx` + `PascalCase.module.css` in a folder of the same name with an
  `index.ts`; hooks `useThing.ts`; everything else `camelCase.ts`. Tests sit beside the code: `foo.test.ts`.
- **Styling**: CSS Modules + design tokens only (no raw hex/rgba outside `tokens.css`). Mobile-first — see
  [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- **Exports**: named exports everywhere (pages too); the route table lazy-loads them by name.
- **Functions**: small and single-purpose. Keep logic out of JSX — put it in a hook (`useEnquiryForm`) or a pure
  function (`toPayload`) that can be unit-tested.
- **Formatting/linting**: Prettier + ESLint. Run `npm run check` before pushing; CI runs the same command and
  blocks the deploy on failure.

## Scripts

| Command                               | What it does                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run dev`                         | Dev server at http://localhost:5173 (API mocked when `VITE_API_BASE_URL` is empty) |
| `npm run check`                       | Typecheck + lint + format check + unit tests (what CI runs)                        |
| `npm run lint:fix` / `npm run format` | Auto-fix lint issues / format every file                                           |
| `npm test` / `npm run test:watch`     | Unit tests once / on change                                                        |
| `npm run build`                       | Production build to `dist/`                                                        |

## Recipes

### Add a page

1. `src/pages/Careers/CareersPage.tsx` exporting `CareersPage`; call `usePageMeta({ title: 'Careers', description: '…' })`.
2. Add a line to `APP_ROUTES` in `src/app/routes.ts`:
   `{ path: 'careers', Page: lazyPage(() => import('@/pages/Careers/CareersPage'), 'CareersPage') }`
   (keep `'*'` last).
3. Add `careers: '/careers'` to `ROUTES` in `src/config/routes.ts`, and to `NAV_LINKS` in `src/content/site.ts`
   if it belongs in the nav.

The page is code-split automatically and preloaded in the background.

### Add a section to a page

Create `src/pages/<Page>/sections/<Name>.tsx` (+ `.module.css`) built from `Section` → `SectionHeader` →
`Grid` → `Card`, with its copy in `src/content/`. Render it from the page component.

### Add or change content

Edit `src/content/*.ts` — typed against `src/types`. `content.test.ts` fails if a link points at a page that
doesn't exist. To add images without code: drop `<slug>.jpg` into `src/assets/team/` or `src/assets/clients/`
(see `content/assets.ts`).

**Moving content to a CMS/API later:** endpoints are already specced in `docs/API.md` §2. Add fetchers under
`src/api/` or the relevant feature, and replace the constant imports with a data hook in the pages that need
live data — components already receive content as props, so the UI doesn't change.

### Add a feature

```
src/features/<name>/
  index.ts          public surface — the only file other code imports
  types.ts          request/response + domain types
  api.ts            backend calls via @/api (with a dev mock when mockApi is true)
  use<Name>.ts      state + actions, UI-free
  <Name>.tsx        UI, composed from @/components/ui
  <Name>.module.css
  *.test.ts
```

Ship it behind a flag if it shouldn't be live everywhere yet: add the flag to `FEATURE_FLAGS` in
`src/config/features.ts`, gate with `isEnabled('flag')`, switch on with `VITE_FEATURES=flag`.

### Add a backend endpoint

Call it through `request()` (JSON) or `stream()` (incremental) from `@/api` — never `fetch` directly. You get the
base URL, JSON encoding, timeouts, `AbortSignal` support and typed `ApiError`s (`kind`: `not_configured`,
`network`, `timeout`, `aborted`, `http`). Document the contract in `docs/API.md`.

### Add AI

The foundation is in place — see [`src/features/ai/README.md`](../src/features/ai/README.md):
`streamChat()` already speaks the `/api/ai/chat` SSE contract (docs/API.md §4) and mocks itself in dev. Build
`useChat` + `AssistantWidget` in `features/ai/`, lazy-mount it in `Layout` behind `isEnabled('aiAssistant')`.
AI provider keys stay on the backend — never in a `VITE_*` variable.

## App shell behaviour

- **Routing**: `APP_ROUTES` (`src/app/routes.ts`) is the single route table. Every page is lazy-loaded, then all
  pages are preloaded when the browser is idle, so page transitions never wait on the network.
- **Errors**: each page renders inside its own `ErrorBoundary` (reset on navigation), so a crash shows a
  friendly message while the nav and footer keep working. `componentDidCatch` is the hook for error monitoring.
- **Providers**: `src/app/AppProviders.tsx` is the one place to add app-wide providers (data cache, auth, …).
- **Page meta**: `usePageMeta` sets `<title>` and the meta description per page.
