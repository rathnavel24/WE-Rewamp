# WalletEdge Global — Backend API contract

The frontend is fully functional without a backend: all page content ships as typed data in
`src/content/`, and the contact form uses a mock when `VITE_API_BASE_URL` is empty — in the dev server only; a production build without it shows an error instead.

This document lists the endpoints the frontend expects once a backend is linked, in priority order.

Conventions

- Base URL: `VITE_API_BASE_URL` (e.g. `https://api.walletedgeglobal.com`), all paths below are relative.
- JSON in, JSON out. `Content-Type: application/json`.
- Errors: non-2xx status with `{ "detail": "Human readable message" }` — the frontend shows `detail` to the user
  (FastAPI's default error shape works as-is).
- CORS must allow the site's origin.

---

## 1. Required now

### `POST /api/enquiries` — submit the contact form

**Purpose:** the only write action on the site. Captures leads from the Contact page (and from every venture page's
"Enquire about …" button, which deep-links to `/contact?venture=<id>`).

Request

```json
{
  "name": "Aisha Khan", // required
  "email": "aisha@company.ae", // required, valid email
  "company": "Acme LLC", // optional
  "phone": "+971 50 000 0000", // optional
  "message": "We'd like to discuss…", // optional
  "topics": ["Healthcare", "Partnership"], // 0..n of: "IT & BPO", "Financial services", "Real estate",
  //          "Consulting", "Healthcare", "Partnership"
  "venture": "carehub", // optional: insureliv | arogyaplus | carehub | globalcure | recovery
  "source": "/contact" // optional: page path the form was sent from
}
```

Response `201 Created`

```json
{ "id": "enq_01J…", "status": "received", "createdAt": "2026-10-13T10:15:00Z" }
```

Errors: `422` validation error, `429` rate limited.

Backend responsibilities (not visible to the frontend, but expected):

- Email notification to `admin@walletedgeglobal.com` (and optionally route by `venture`/`topics` to the subsidiary).
- Optional auto-reply to the visitor ("We'll reply within one business day" is promised in the UI).
- Spam protection: rate limit by IP; optionally a honeypot field or captcha token (tell me and I'll add the field).

Frontend file: `src/features/enquiry/api.ts`.

---

## 2. Optional — only if content should be editable from an admin panel

Today every list below is hard-coded in `src/content/*.ts`. If the client wants to edit content without a redeploy,
expose these read-only endpoints and I'll swap the data imports for fetches (shapes mirror `src/types/index.ts`).

| Endpoint                 | Purpose                                                                                                        | Replaces                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `GET /api/site`          | Contact email, office addresses & phones, footer blurb, headline stats (7 companies, 15+ clients, 2 countries) | `src/content/site.ts`      |
| `GET /api/companies`     | The 7 group companies (name, sector, country, description, links) — Companies page, Home list, group diagram   | `src/content/companies.ts` |
| `GET /api/ventures`      | Summary list of the 5 ventures — nav mega-menu, footer, "More from the group"                                  | `src/content/ventures.ts`  |
| `GET /api/ventures/{id}` | Full venture detail: tagline, about, stats, features, process steps, website                                   | `src/content/ventures.ts`  |
| `GET /api/services`      | Service cards, consulting services, pillars                                                                    | `src/content/services.ts`  |
| `GET /api/team`          | Founders, board, division leaders (name, role, unit, optional photo URL)                                       | `src/content/team.ts`      |
| `GET /api/clients`       | "Trusted by" client names (optionally logo URLs)                                                               | `src/content/clients.ts`   |

Example — `GET /api/ventures/arogyaplus`

```json
{
  "id": "arogyaplus",
  "name": "ArogyaPlus",
  "icon": "biotech",
  "tone": "orange",
  "sector": "HealthTech · Wallet Edge Technologies",
  "tagline": "Premium clinical accuracy meets at-home convenience.",
  "about": "ArogyaPlus is a Dubai-based…",
  "site": { "label": "arogyaplus.com", "href": "https://arogyaplus.com" },
  "stats": [{ "n": 10000, "suffix": "+", "label": "Families served" }],
  "featTitle": "Healthcare, on demand",
  "features": [{ "icon": "home_health", "title": "At-home & in-clinic services", "desc": "…" }],
  "steps": [{ "no": "01", "icon": "inventory_2", "title": "Pick a package", "desc": "…" }]
}
```

`icon` values are Material Symbols Rounded ligature names; `tone` is `"green"` or `"orange"`.

---

## 3. Optional — admin panel (if one is built later)

Not used by the public site; listed so the backend can plan for it.

| Endpoint                                          | Purpose                                   |
| ------------------------------------------------- | ----------------------------------------- |
| `POST /api/admin/login`                           | Admin authentication (JWT or session)     |
| `GET /api/admin/enquiries?status=&venture=&page=` | List / filter enquiries                   |
| `PATCH /api/admin/enquiries/{id}`                 | Mark as contacted / closed, add notes     |
| `PUT /api/admin/{resource}/{id}`                  | Edit the content resources from section 2 |

---

## 4. Optional — AI assistant

Frontend client: `src/features/ai/api.ts` (`streamChat`). Ships behind the `aiAssistant` feature flag
(`VITE_FEATURES=aiAssistant`), so the backend can be built and tested before the site shows anything.

### `POST /api/ai/chat` — stream an assistant reply

The backend owns the AI provider key, model choice, system prompt (grounded in the site content), rate limiting
and logging. **No provider key ever reaches the browser.**

Request

```json
{
  "messages": [{ "role": "user", "content": "Which company handles home healthcare?" }],
  "context": { "path": "/ventures/carehub" }
}
```

Response: `200` with `Content-Type: text/event-stream`, one event per chunk of the reply:

```
event: delta
data: {"text":"CareHub Healthcare "}

event: delta
data: {"text":"provides DHA-licensed home nursing…"}

event: done
data: {}
```

If generation fails part-way, send `event: error` with `data: {"message":"Human readable message"}` and close the
stream. Errors before streaming starts use the normal `{ "detail": "…" }` JSON shape with a non-2xx status
(e.g. `429` when rate limited).
