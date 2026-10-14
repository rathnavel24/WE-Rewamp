import type { ReactNode } from 'react';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Grid,
  Section,
  SectionHeader,
  SectionIndex,
  Stat,
  Tile,
  type TileSize
} from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { GREEN, ORANGE } from '@/content/tones';
import s from './DesignSystemPage.module.css';

/**
 * Living reference for the WalletEdge design system. Not linked from the nav —
 * open /design-system while building to see every token and component in one place.
 */

const SWATCHES: Array<{ group: string; items: Array<[string, string]> }> = [
  {
    group: 'Brand',
    items: [
      ['--color-primary', 'Primary green'],
      ['--color-primary-soft', 'Primary soft'],
      ['--color-accent', 'Accent orange'],
      ['--color-accent-strong', 'Accent strong'],
      ['--color-accent-soft', 'Accent soft'],
      ['--color-accent-on-dark', 'Accent on dark']
    ]
  },
  {
    group: 'Surfaces',
    items: [
      ['--color-canvas', 'Canvas'],
      ['--color-surface', 'Surface'],
      ['--color-surface-hover', 'Surface hover'],
      ['--color-inverse', 'Inverse (forest)'],
      ['--color-inverse-2', 'Inverse 2 (ink)']
    ]
  },
  {
    group: 'Text',
    items: [
      ['--text-strong', 'Strong'],
      ['--text-default', 'Default'],
      ['--text-body', 'Body'],
      ['--text-muted', 'Muted'],
      ['--text-subtle', 'Subtle'],
      ['--text-faint', 'Faint']
    ]
  }
];

const TYPE: Array<[string, string, string]> = [
  ['t-display-1', 'Display 1', 'Page hero headline'],
  ['t-display-2', 'Display 2', 'Section headline'],
  ['t-h1', 'Heading 1', 'Panel headline'],
  ['t-h2', 'Heading 2', 'Large card title'],
  ['t-h3', 'Heading 3', 'Card title'],
  ['t-h4', 'Heading 4', 'Small card title'],
  ['t-lead', 'Lead', 'Intro paragraph under a hero headline.'],
  ['t-body-lg', 'Body large', 'Section lead and panel copy.'],
  ['t-body', 'Body', 'Card descriptions and general copy.'],
  ['t-small', 'Small', 'Roles, captions and secondary detail.'],
  ['t-label', 'Label', 'Mono uppercase meta']
];

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 30];
const RADII = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'pill'];
const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl'];
const TILE_SIZES: TileSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function DesignSystemPage() {
  usePageMeta({ title: 'Design system' });
  return (
    <>
      <Section pt="hero" pb="sm">
        <SectionHeader
          as="h1"
          size="display-1"
          layout="split"
          kicker="Design system"
          title="WalletEdge UI kit."
          lead="Tokens and components every page is built from. Change a token in src/styles/tokens.css and it updates everywhere."
          reveal={false}
        />
      </Section>

      <Block no="01" title="Colour">
        {SWATCHES.map((g) => (
          <div key={g.group} className={s.stack}>
            <h3 className="t-label">{g.group}</h3>
            <Grid min={150} gap="sm">
              {g.items.map(([token, name]) => (
                <div key={token} className={s.swatch}>
                  <span className={s.chipColor} style={{ background: `var(${token})` }} />
                  <span className="t-h4">{name}</span>
                  <code className={s.code}>{token}</code>
                </div>
              ))}
            </Grid>
          </div>
        ))}
      </Block>

      <Block no="02" title="Typography">
        <Card padding="lg" className={s.typeList}>
          {TYPE.map(([cls, name, sample]) => (
            <div key={cls} className={s.typeRow}>
              <div className={s.typeMeta}>
                <span className="t-h4">{name}</span>
                <code className={s.code}>.{cls}</code>
              </div>
              <span className={cls}>
                {cls.startsWith('t-display') || cls.startsWith('t-h') ? 'One group, every edge.' : sample}
              </span>
            </div>
          ))}
          <div className={s.typeRow}>
            <div className={s.typeMeta}>
              <span className="t-h4">Eyebrow</span>
              <code className={s.code}>.eyebrow</code>
            </div>
            <span className="eyebrow">01 — Our services</span>
          </div>
        </Card>
      </Block>

      <Block no="03" title="Spacing, radius & elevation">
        <Grid min={340}>
          <Card padding="lg">
            <h3 className="t-label">Spacing — 4px base</h3>
            <div className={s.stack}>
              {SPACE.map((n) => (
                <div key={n} className={s.spaceRow}>
                  <code className={s.code}>--space-{n}</code>
                  <span className={s.spaceBar} style={{ width: `var(--space-${n})` }} />
                </div>
              ))}
            </div>
          </Card>
          <div className={s.stack}>
            <Card padding="lg">
              <h3 className="t-label">Radius</h3>
              <div className={s.row}>
                {RADII.map((r) => (
                  <div key={r} className={s.demoItem}>
                    <span className={s.radiusBox} style={{ borderRadius: `var(--radius-${r})` }} />
                    <code className={s.code}>{r}</code>
                  </div>
                ))}
              </div>
            </Card>
            <Card padding="lg" variant="sunken">
              <h3 className="t-label">Elevation</h3>
              <div className={s.row}>
                {SHADOWS.map((sh) => (
                  <div key={sh} className={s.demoItem}>
                    <span className={s.shadowBox} style={{ boxShadow: `var(--shadow-${sh})` }} />
                    <code className={s.code}>shadow-{sh}</code>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Grid>
      </Block>

      <Block no="04" title="Buttons">
        <Card padding="lg">
          <Demo label="Variants">
            <Button>Primary</Button>
            <Button variant="accent" icon="arrow_forward">
              Accent
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="link" icon="arrow_outward">
              Link
            </Button>
          </Demo>
          <Demo label="Sizes">
            <Button size="sm" icon="arrow_forward">
              Small
            </Button>
            <Button icon="arrow_forward">Medium</Button>
            <Button size="lg" icon="arrow_forward">
              Large
            </Button>
            <Button disabled>Disabled</Button>
          </Demo>
        </Card>
        <Card padding="lg" variant="ink" className="on-dark">
          <Demo label="On dark">
            <Button variant="inverse" icon="arrow_forward">
              Inverse
            </Button>
            <Button variant="outline-dark" icon="mail">
              Outline dark
            </Button>
            <Button variant="accent">Accent</Button>
            <Button variant="link" icon="arrow_forward">
              Link
            </Button>
          </Demo>
        </Card>
      </Block>

      <Block no="05" title="Chips & tiles">
        <Grid min={420}>
          <Card padding="lg">
            <Demo label="Chips">
              <Chip>Neutral</Chip>
              <Chip variant="surface">Surface</Chip>
              <Chip variant="outline" icon="bolt">
                Outline
              </Chip>
              <Chip variant="primary" mono>
                Primary
              </Chip>
              <Chip variant="accent" mono>
                Accent
              </Chip>
              <Chip mono icon="location_on">
                UAE
              </Chip>
              <Chip size="sm" mono>
                Small mono
              </Chip>
            </Demo>
            <Demo label="Tiles">
              {TILE_SIZES.map((sz, i) => (
                <Tile key={sz} icon="shield_with_heart" size={sz} tone={i % 2 ? ORANGE : GREEN} solid={i > 2} />
              ))}
              <Tile icon="handshake" neutral />
              <Tile icon="hub" size="xs" tone={GREEN} round />
            </Demo>
            <Demo label="Avatars">
              <Avatar name="Sai Pranav" tone={GREEN} />
              <Avatar name="Gopi Raja" tone={ORANGE} />
            </Demo>
          </Card>
          <Card padding="lg" variant="inverse" className="on-dark">
            <Demo label="On dark">
              <Chip variant="glass" icon="apartment">
                Glass
              </Chip>
              <Chip variant="outline-dark" mono>
                India
              </Chip>
              <Chip variant="outline-dark" onToggle={() => undefined}>
                Toggle
              </Chip>
              <Chip variant="outline-dark" icon="check" selected onToggle={() => undefined}>
                Selected
              </Chip>
            </Demo>
            <Demo label="Section index">
              <SectionIndex no="02" label="Financial services" />
            </Demo>
            <Demo label="Avatar xl">
              <Avatar name="Sai Pranav" size="xl" />
            </Demo>
          </Card>
        </Grid>
      </Block>

      <Block no="06" title="Cards & stats">
        <Grid min={240} max={4} gap="sm">
          {(['surface', 'sunken', 'primary-soft', 'accent-soft', 'accent', 'inverse', 'ink', 'glass'] as const).map(
            (v) => (
              <Card
                key={v}
                variant={v}
                interactive
                className={['accent', 'inverse', 'ink', 'glass'].includes(v) ? 'on-dark' : undefined}
                style={v === 'glass' ? { background: 'var(--color-inverse)' } : undefined}
              >
                <Tile icon="layers" size="sm" tone={v === 'accent-soft' ? ORANGE : GREEN} />
                <span className="t-h4">{v}</span>
                <span className="t-small">variant=&quot;{v}&quot;</span>
              </Card>
            )
          )}
        </Grid>
        <Grid min={200} gap="sm">
          <Stat count={90} suffix="%" value="90%" label="Sunken (default)" />
          <Stat variant="surface" value="48h" label="Surface" ink={ORANGE.ink} />
          <Stat variant="soft" size="lg" soft={GREEN.soft} value="250+" label="Soft · large" />
          <Stat variant="plain" size="sm" value="7" label="Plain · small" />
        </Grid>
      </Block>

      <Block no="07" title="Section header">
        <Card padding="xl">
          <SectionHeader
            kicker="01 — Kicker"
            title="Split layout keeps lead and actions on the right."
            size="h1"
            layout="split"
            reveal={false}
            lead="Use split for section intros; stack for narrow columns and heroes without a lead."
            action={
              <Button variant="link" icon="arrow_outward">
                Action
              </Button>
            }
          />
        </Card>
      </Block>
    </>
  );
}

function Block({ no, title, children }: { no: string; title: string; children: ReactNode }) {
  return (
    <Section pt="sm" pb="sm" gap="md">
      <SectionIndex no={no} label={title} />
      {children}
    </Section>
  );
}

function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.stack}>
      <span className="t-label">{label}</span>
      <div className={s.row}>{children}</div>
    </div>
  );
}
