import { Card, Grid, Section, SectionHeader, Tile, type SectionSpace } from '@/components/ui';
import type { Feature, Tone } from '@/types';
import s from './VentureCapabilities.module.css';

interface VentureCapabilitiesProps {
  title: string;
  features: Feature[];
  tone: Tone;
  /** Space above; tighter directly under the hero, whose own padding already separates them. */
  pt?: SectionSpace;
}

export function VentureCapabilities({ title, features, tone, pt }: VentureCapabilitiesProps) {
  return (
    <Section data-screen-label="Capabilities" pt={pt} pb="sm">
      <SectionHeader title={title} size="h1" />
      <Grid min={300} max={3} gap="sm" data-stagger="80" className={s.grid}>
        {features.map((f) => (
          <Card key={f.title} className={s.feature}>
            <Tile icon={f.icon} tone={tone} />
            <span className={s.featureText}>
              <span className="t-h3">{f.title}</span>
              <span className="t-body">{f.desc}</span>
            </span>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
