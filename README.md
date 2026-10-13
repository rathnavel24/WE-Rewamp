# WalletEdge Global — Website (frontend)

React build of the **WalletEdge Global redesign** from Claude Design: a pixel-matched port of the six
design pages (Home, Services, Companies, Team, Contact, Venture × 5), including the motion system,
page-transition curtain, mega-menu and responsive behaviour.

**Stack:** React 19 · TypeScript · Vite · React Router · CSS Modules (no UI library, so nothing changes the design).

## Run

```bash
npm install
cp .env.example .env      # optional in dev — leave VITE_API_BASE_URL empty to use mocks (dev server only)
npm run dev               # http://localhost:5173
npm run build             # type-check + production build to dist/
npm run preview           # serve the production build
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` (`#it-bpo`, `#financial`, `#real-estate`, `#consulting`, `#healthcare`) | Services |
| `/companies` | Companies (group structure + filterable directory) |
| `/team` | Our Team |
| `/contact` (`?venture=<id>` pre-selects a topic) | Contact + enquiry form |
| `/ventures/:id` — `insureliv`, `arogyaplus`, `carehub`, `globalcure`, `recovery` | Venture detail |

It's a client-side router, so the host must serve `index.html` for unknown paths
(`public/_redirects` covers Netlify; on Vercel add a rewrite to `/index.html`).

## Structure

```
src/
  main.tsx, App.tsx          entry + routes
  assets/                    logo
  styles/                    tokens.css (design colours/type), global.css (shared primitives)
  components/
    layout/                  SiteNav, SiteFooter, Layout
    ui/                      AppLink, Icon, Tile, SectionIndex, CtaBanner
  context/                   PageTransitionContext (curtain + intro animation)
  hooks/                     useMotion, useScrollProgress, useViewport, useDocumentTitle
  lib/motion.ts              typed port of the design's we-motion.js
  data/                      ALL site copy and lists (ventures, companies, team, services…)
  services/                  http.ts (fetch wrapper), enquiries.ts (contact form API)
  types/                     shared TypeScript types
  utils/                     helpers
  pages/<Page>/              one folder per page, each with its own CSS module
docs/API.md                  backend endpoints the frontend expects
```

### Motion

Elements opt in with data attributes (`data-reveal`, `data-stagger`, `data-count`, `data-marquee`,
`data-roller`, `data-orbit`, `data-float`, `data-pulse`, `data-flow`, `data-spot`), exactly as in the design.
`useMotion()` (mounted once in `Layout`) wires up new elements as React renders them. All motion respects
`prefers-reduced-motion`.

### Links

Use `<AppLink to="…">` for every link: internal paths go through the page-transition curtain,
`#anchors` smooth-scroll under the fixed nav, and `tel:` / `mailto:` / `https:` behave natively.

## Backend

See [`docs/API.md`](docs/API.md). Only `POST /api/enquiries` is needed for launch; the rest are optional
if the content should become editable.
