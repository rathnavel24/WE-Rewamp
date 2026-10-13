# WalletEdge design system

Every page is built from one set of **tokens** (`src/styles/tokens.css`) and a small **UI kit**
(`src/components/ui`). Open **`/design-system`** in the running app to see everything live.

## Rules

1. **No raw values in components.** Colours, font sizes, spacing, radii and shadows come from tokens.
   If you need a value that doesn't exist, add a token — don't hard-code it.
2. **Pages compose primitives.** A page section is `Section` → `SectionHeader` → `Grid` → `Card`.
   Page CSS modules only hold layout that is genuinely unique to that page.
3. **Use semantic tokens**, not primitives (`--color-primary`, not `--green-700`).
4. **Dark context = `.on-dark`.** Any dark band or panel adds `on-dark` so text utilities, labels,
   eyebrows, links and section indexes switch to their light treatment automatically.

## Tokens

| Group | Tokens | Notes |
| --- | --- | --- |
| Surfaces | `--color-canvas`, `--color-surface`, `--color-surface-sunken`, `--color-inverse`, `--color-inverse-2` | Canvas is the page; surface is cards |
| Brand | `--color-primary(-soft)`, `--color-accent(-hover/-strong/-soft/-on-dark)` | Green = trust, orange = action |
| Text | `--text-strong` → `--text-faint`, `--text-on-dark(-muted/-subtle)` | Six steps on light, three on dark |
| Borders | `--border-subtle/default/strong`, `--border-on-dark(-strong)` | |
| Type | `--fs-display-1` … `--fs-label`, `--lh-*`, `--ls-*` | Fluid sizes via `clamp()` |
| Space | `--space-1` (4px) … `--space-30` (120px) | 4px base |
| Rhythm | `--section-y`, `--section-y-sm`, `--nav-clearance`, `--stack-section`, `--gutter` | Vertical rhythm lives here only |
| Radius | `--radius-xs` 8 · `sm` 12 · `md` 16 · `lg` 22 · `xl` 28 · `2xl` 36 · `pill` | |
| Elevation | `--shadow-xs` … `--shadow-xl` | |
| Motion | `--ease`, `--dur-fast`, `--dur-base`, `--lift-sm/md` | |

## Typography utilities

`.t-display-1` · `.t-display-2` · `.t-h1` · `.t-h2` · `.t-h3` · `.t-h4` · `.t-lead` · `.t-body-lg` ·
`.t-body` · `.t-small` · `.t-label` · `.eyebrow`

| Use | Class |
| --- | --- |
| Page hero `h1` | `t-display-1` (via `SectionHeader size="display-1"`) |
| Section `h2` | `t-display-2` (SectionHeader default) |
| Panel `h2` inside a card | `t-h1` |
| Card titles | `t-h2` (large) · `t-h3` · `t-h4` (small) |

## Components

| Component | Purpose | Key props |
| --- | --- | --- |
| `Section` | Page band; owns vertical rhythm + container | `pt`/`pb`: `none · sm · md · hero`, `tone="inverse"`, `gap` |
| `SectionHeader` | Kicker + title + lead + action | `size`, `layout="stack \| split"`, `as`, `kicker`, `action` |
| `Grid` | Responsive auto-column grid | `min` (px), `max` (column cap), `gap`, `mode="fit \| fill"` |
| `Card` | All boxed content | `variant` (8), `padding="sm \| md \| lg \| xl"`, `to`, `interactive`, `spotlight`, `glow` |
| `Button` | Every CTA | `variant` (primary, accent, secondary, inverse, outline-dark, link), `size`, `icon`, `block`, `to` |
| `Chip` | Tags, badges, filters, toggles | `variant` (7), `size`, `mono`, `icon`, `leading`, `to`, `onToggle`/`selected` |
| `Tile` | Icon in a rounded square | `size="xs…xl"`, `tone`, `solid`, `neutral`, `round` |
| `Avatar` | Initials avatar | `name`, `tone`, `size="md \| xl"` |
| `Stat` | Figure + caption, with count-up | `value`, `label`, `count`, `suffix`, `variant`, `size`, `ink` |
| `SectionIndex` | "01 —— Label" kicker | `no`, `label`, `tone` |
| `CtaBanner` | Closing dark CTA strip | `title`, `cta`, `to` |

Import from the barrel: `import { Button, Card, Section } from '@/components/ui';`

### Card padding ↔ radius

Padding drives radius so nested cards stay concentric:
`sm` 20 / 16 · `md` 28 / 22 · `lg` ≤44 / 28 · `xl` ≤64 / 36.
Override the inner gap with `--card-gap` (registered with `inherits: false`, so it never leaks into nested cards).

### Section rhythm

- Default sections: `pt="md" pb="md"` (`--section-y`, 72–112px).
- Page heroes: `pt="hero"` (clears the fixed nav) and `pb="sm"`.
- Runs of panels that belong together: `pt="sm" pb="sm"`.
- A section that continues the previous one: `pt="none"`.

## Adding a page

```tsx
<Section pt="hero" pb="sm">
  <SectionHeader as="h1" size="display-1" kicker="Our services" title="…" lead="…" layout="split" />
</Section>

<Section>
  <SectionHeader kicker="01 — Practices" title="…" />
  <Grid min={300} max={3}>
    {items.map((i) => (
      <Card key={i.id} to={i.href} spotlight glow={i.tone.glow}>
        <Tile icon={i.icon} tone={i.tone} size="lg" />
        <h3 className="t-h3">{i.title}</h3>
        <p className="t-body">{i.desc}</p>
      </Card>
    ))}
  </Grid>
</Section>
```
