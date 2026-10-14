# WalletEdge Global — Website (frontend)

React build of the **WalletEdge Global redesign** from Claude Design: a pixel-matched port of the six
design pages (Home, Services, Companies, Team, Contact, Venture × 5), including the motion system,
page-transition curtain, mega-menu and responsive behaviour.

**Stack:** React 19 · TypeScript · Vite · React Router · CSS Modules (no UI library, so nothing changes the design)
· ESLint · Prettier · Vitest.

## Run

```bash
npm install
cp .env.example .env      # optional in dev — leave VITE_API_BASE_URL empty to use mocks (dev server only)
npm run dev               # http://localhost:5173
npm run check             # typecheck + lint + format check + unit tests (CI runs this before every deploy)
npm run build             # type-check + production build to dist/
npm run preview           # serve the production build
```

Feature flags (e.g. the AI assistant) are switched on per environment with `VITE_FEATURES` — see `.env.example`.

## Routes

| Path                                                                                | Page                                               |
| ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| `/`                                                                                 | Home                                               |
| `/services` (`#it-bpo`, `#financial`, `#real-estate`, `#consulting`, `#healthcare`) | Services                                           |
| `/companies`                                                                        | Companies (group structure + filterable directory) |
| `/team`                                                                             | Our Team                                           |
| `/contact` (`?venture=<id>` pre-selects a topic)                                    | Contact + enquiry form                             |
| `/ventures/:id` — `insureliv`, `arogyaplus`, `carehub`, `globalcure`, `recovery`    | Venture detail                                     |
| `/design-system` (not linked in the nav)                                            | Living style guide — every token and component     |

It's a client-side router, so the host must serve `index.html` for unknown paths
(`public/_redirects` covers Netlify; on Vercel add a rewrite to `/index.html`).

## Structure

Layered so it can grow (new pages, features, a CMS, AI) without turning messy. Full guide with the import
rules and step-by-step recipes: **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**.

```
src/
  main.tsx                   entry
  app/                       route table (lazy pages), providers, error boundary
  pages/<Page>/              one folder per route (Home splits into pages/Home/sections/)
  features/
    enquiry/                 contact form: UI, useEnquiryForm hook, API call, types
    ai/                      AI foundation: streaming chat client + contract (no UI yet)
  components/
    layout/<Name>/           SiteNav, SiteFooter, Layout
    ui/<Name>/               design-system kit (content-free) — import from '@/components/ui'
  hooks/                     usePageMeta, useMotion, useScrollProgress, useViewport
  context/                   page-transition curtain
  content/                   ALL site copy and lists + image lookups (assets.ts)
  api/                       HTTP client: request(), stream(), parseSse(), ApiError
  config/                    env.ts (typed VITE_* vars), features.ts (flags), routes.ts (paths)
  lib/                       motion engine, slug, assets, scroll, cx, initials
  types/                     shared domain types
  styles/                    tokens.css (design tokens), global.css
  assets/                    brand/, clients/<slug>.svg, team/<slug>.jpg
docs/ARCHITECTURE.md         layers, import rules, how to add pages / features / endpoints / AI
docs/API.md                  backend endpoints the frontend expects
docs/DESIGN_SYSTEM.md        tokens, components and layout rules (live reference at /design-system)
```

### Motion

Elements opt in with data attributes (`data-reveal`, `data-stagger`, `data-count`, `data-marquee`,
`data-orbit`, `data-float`, `data-pulse`, `data-flow`, `data-spot`), exactly as in the design.
`useMotion()` (mounted once in `Layout`) wires up new elements as React renders them. All motion respects
`prefers-reduced-motion`.

### Links

Use `<AppLink to="…">` for every link: internal paths go through the page-transition curtain,
`#anchors` smooth-scroll under the fixed nav, and `tel:` / `mailto:` / `https:` behave natively.

## Backend

See [`docs/API.md`](docs/API.md). Only `POST /api/enquiries` is needed for launch; the rest are optional
(editable content, admin panel, and `POST /api/ai/chat` for the AI assistant).
