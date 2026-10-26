import { Card, Grid, Section, SectionHeader, Tile } from '@/components/ui';
import type { Feature, Tone } from '@/types';
import s from './VentureCapabilities.module.css';

interface VentureCapabilitiesProps {
  title: string;
  features: Feature[];
  tone: Tone;
}

export function VentureCapabilities({ title, features, tone }: VentureCapabilitiesProps) {
  return (
    <Section data-screen-label="Capabilities" pb="sm">
      <SectionHeader title={title} size="h1" />
      <Grid min={300} max={3} gap="sm" data-stagger="80">
        {features.map((f) => (
          <Card key={f.title} interactive className={s.feature}>
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
