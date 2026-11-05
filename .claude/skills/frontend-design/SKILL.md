---
name: frontend-design
description: Frontend design guidance for the WalletEdge Global website (React + CSS Modules). Use when building or reshaping any page, section or component in this repo. Works inside the existing WalletEdge design system — tokens, UI kit and approved design — rather than inventing a new visual identity.
license: Complete terms in LICENSE.txt. Adapted from Anthropic's frontend-design skill; the "WalletEdge project rules" section was added for this repo.
---

# WalletEdge project rules (read first — these override the general guidance below)

This site has an **approved design**. The general guidance further down is about creating a new visual identity; here it applies only as a quality bar and a critique checklist, never as licence to change the look. Where the two conflict, these rules win.

## Don't reinvent — extend

- **Palette and type are fixed.** Brand forest green (trust) and orange (action) on a soft sage-paper neutral; Instrument Sans for headings and text (display sizes use its narrower cut via `--font-stretch-display`), IBM Plex Mono for small labels — chosen with the client on 1 Nov 2026. Do not propose new palettes, typefaces or a new layout concept unless the client asks.
- **The visual language is already chosen** — mono uppercase labels/kickers, rounded cards, the hero card wheel, page-transition curtain. The "AI tells" listed below are deliberate here; keep them consistent rather than removing them. The client had prefixed numbers removed site-wide (tracker WE012, 5 Nov 2026): no "01 — Our services" kickers, numbered markers or counts on the public pages.
- Spend design effort on **hierarchy, spacing, responsiveness, empty/loading/error states and copy**, not on new decoration.

## Where things live

- `docs/DESIGN_SYSTEM.md` — the rules, token groups and component props. Read it before styling anything. Live reference at `/design-system` in the running app.
- `src/styles/tokens.css` — every colour, size, space, radius, shadow and motion value. `src/styles/global.css` — typography utilities (`.t-display-1` … `.t-label`, `.eyebrow`).
- `src/components/ui` — the UI kit: `Section`, `SectionHeader`, `Grid`, `Swipe`, `Card`, `Button`, `Chip`, `Tile`, `Stat`, `Icon`, `AppLink`, `Avatar`, `Portrait`, `CtaBanner`, `SectionIndex`. Import from `@/components/ui`.
- `src/content/*.ts` — all copy and data (companies, sectors, ventures, services, team, hero). Pages render content; they don't hard-code it.
- `src/config/routes.ts` — `ROUTES` for every link; never write URLs by hand.
- `src/pages/<Page>/` and `src/pages/<Page>/sections/<Section>/` — one folder per page/section, each with its `.module.css`.

## Rules (from the design system)

1. **No raw values in components.** Colours, sizes, spacing, radii, shadows come from tokens. Need a new value? Add a token.
2. **Compose primitives.** A section is `Section` → `SectionHeader` → `Grid` → `Card`. Page CSS modules hold only layout unique to that page.
3. **Semantic tokens only** (`--color-primary`, not `--green-700`).
4. **Dark bands/panels** use `tone="inverse"` / `variant="inverse"` (the `.on-dark` context) so text, labels and links switch automatically.
5. **No orange glows on dark surfaces** — glows on dark use `--glow-on-dark` / `--glow-primary-on-dark`. Orange stays for solid accents.
6. **Tones alternate** green/orange using `GREEN`, `ORANGE` and `alternate(i)` from `src/content/tones.ts`.
7. Internal links go through `AppLink` / `to=` props (page-transition curtain and smooth anchor scrolling). Anchor scrolling clears the fixed nav via `NAV_OFFSET` in `src/lib/scroll.ts` and `scroll-margin-top` in `global.css`; if the nav height changes, update both.
8. Motion uses the existing data attributes (`data-reveal`, `data-stagger`, `data-float`, `data-flow`, `data-delay`) and must respect reduced motion.

## Content constraints

- **The client's content document is the source of truth** (`WEGlobal.docx`); the group's IT head checks the site against it. Don't invent claims, numbers or descriptions — use the document's wording, and flag anything it doesn't cover.
- **Services first, no separate company directory.** Four services, in this order: IT & BPO, Financial Services, Consulting, Healthcare (`SERVICES` in `src/content/services.ts`). The group's seven companies (`GROUP_COMPANIES` in `src/content/companies.ts`, names and order exactly as in the document) appear under their service ("Delivered by") and in full in the Home "Our companies" register, after the services. Parents: Wallet Edge Global FZC LLC (UAE) and Wallet Edge Services Pvt Ltd (India).
- **Real Estate is held back** — don't mention it (or the Seyyone Ventures project) anywhere until the client says so. `content.test.ts` enforces this.
- Write copy from the visitor's point of view, in British/UAE-business English, sentence case.

## Quality floor and verification

- Responsive from 360px phones (16px+ gutters, no horizontal scroll) through tablet (≤1024px) to desktop; check the existing 600px and 1023/1024px breakpoints. Touch targets ≥ 44px on coarse pointers.
- Visible keyboard focus, real alt text (decorative images `alt=""`), sufficient contrast on both light and inverse surfaces.
- Before finishing: `npm run check` (typecheck, lint, Prettier, Vitest) must pass, and look at the change in the running app (`npm run dev`) on desktop and phone widths.

---

# General guidance (Anthropic frontend-design)

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. If there's any information in your memory about the client's preferences or context about what they're building, use that as a hint. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

Avoid these default typographic treatments; they are the commonest tells of a generated page:

- Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color.
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a stepped process or a timeline. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy and placeholder content. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

## Process: plan, review against the brief, build, critique

For calibration, AI-generated design right now clusters around some traits:

1. a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent (often near #D97757 — Anthropic's own Claude-interaction accent, so on a user's brief it reads as a tell);
2. a near-black background with a single bright acid-green or vermilion accent;
3. a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;
4. the SaaS-card kit: content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, the same soft grey shadow (rgba(0,0,0,.1)) under each, and gradient washes as decoration;
5. template chrome that appears whatever the subject: a tracked-out ALL-CAPS eyebrow label above every heading; meta strings joined with middle dots ('A · B · C'); labels built as 'WORD — fragment' with a spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; a monospace face for small data labels; a '→' appended to link and button text.

All traits are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. As with a hired human designer, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles.

- Color: describe the core base palette as 4–6 named hex values.
- Type: the typefaces and their roles.
- Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Include alignment guidance; should the content be left aligned, center aligned, justified?
- Principles: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and an element-based selector like .cta). This can happen often with padding/margin between sections.

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes. Critique your own work as you build, taking screenshots to review if your environment supports it — a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creatives have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design content, not decoration. Bring the same intentionality and minimalism to copywriting that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's perspective. Name things by what users will understand in simple language, not by how the system is built. A user manages notifications, not webhook config. Describe what something is or does in plain terms rather than selling it. Being specific and legible to new users is always better than being clever.

Use active voice as default. A CTA says exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the tone conversational: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each written element do exactly one job.
