import { Card, Grid, Section, SectionHeader, SectionIndex, Tile } from '@/components/ui';
import { CONSULTING_SERVICES } from '@/content/services';
import s from './ConsultingPractice.module.css';

/** 04 — Consulting */
export function ConsultingPractice() {
  return (
    <Section id="consulting" data-screen-label="Consulting" pt="sm" pb="sm">
      <SectionHeader
        kicker={<SectionIndex no="04" label="Consulting services" />}
        title="From company setup to steady growth."
        size="h1"
        layout="split"
        lead="Practical advisory for founders and enterprises entering or scaling in the UAE."
      />
      <Grid min={220} gap="sm" data-stagger="70">
        {CONSULTING_SERVICES.map((c) => (
          <Card key={c.title} className={s.consultCard}>
            <Tile icon={c.icon} neutral />
            <span className={s.consultText}>
              <span className={`t-h4 ${s.consultTitle}`}>{c.title}</span>
              <span className="t-small">{c.desc}</span>
            </span>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
