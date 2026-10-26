import { Card, Grid, Section, Tile } from '@/components/ui';
import { ORANGE } from '@/content/tones';
import type { ProcessStep } from '@/types';
import s from './VentureProcess.module.css';

export function VentureProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <Section data-screen-label="Process" pt="sm" pb="sm">
      <Card data-reveal="up" variant="inverse" padding="xl" className={`on-dark ${s.panel}`}>
        <h2 className="t-h1">Simple and efficient process</h2>
        <Grid min={220} gap="sm" data-stagger="120">
          {steps.map((st) => (
            <Card key={st.no} variant="glass" padding="md" className={s.step}>
              <div className={s.stepTop}>
                <Tile icon={st.icon} tone={ORANGE} solid />
                <span className="t-mono t-small">{st.no}</span>
              </div>
              <span className={s.featureText}>
                <span className="t-h4">{st.title}</span>
                <span className="t-small">{st.desc}</span>
              </span>
            </Card>
          ))}
        </Grid>
      </Card>
    </Section>
  );
}
