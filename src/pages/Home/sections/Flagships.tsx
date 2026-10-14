import { Button, Card, Chip, Grid, Section, SectionHeader, Stat, Swipe, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { INSURELIV_TAGS } from '@/content/services';
import { GREEN, ORANGE } from '@/content/tones';
import s from './Flagships.module.css';

const AROGYA_STATS = [
  { count: 10000, suffix: '+', display: '10,000+', label: 'Families served' },
  { count: 250, suffix: '+', display: '250+', label: 'Lab tests' },
  { count: 48, suffix: 'h', display: '48h', label: 'Digital reports' }
];

export function Flagships() {
  return (
    <Section data-screen-label="Flagships">
      <SectionHeader kicker="03 — Flagship platforms" title="Technology that already works at scale." />

      <Swipe label="Flagship platforms" min={460} peek={88}>
        {/* InsureLiv */}
        <Card data-reveal="up" padding="lg" className={s.card}>
          <div className={s.top}>
            <span className={s.brand}>
              <Tile icon="shield_with_heart" tone={GREEN} solid />
              InsureLiv
            </span>
            <Chip variant="primary" mono>
              InsurTech · GCC
            </Chip>
          </div>
          <p className={s.statement}>
            An AI-powered insurance operating system that unifies broker, insurer and TPA workflows into one secure
            pipeline.
          </p>
          <Grid min={140} gap="sm" pair>
            <Stat count={90} suffix="%" value="90%" label="Faster processing times" />
            <Stat value="1" label="Unified pipeline — lead to renewal" />
          </Grid>
          <div className={s.chips}>
            {INSURELIV_TAGS.map((t) => (
              <Chip key={t.label} variant="outline" icon={t.icon} className={s.feature}>
                {t.label}
              </Chip>
            ))}
          </div>
          <Button to={ROUTES.venture('insureliv')} variant="link" icon="arrow_forward" className={s.more}>
            Discover InsureLiv
          </Button>
        </Card>

        {/* ArogyaPlus */}
        <Card data-reveal="up" data-delay="120" variant="accent-soft" padding="lg" className={s.card}>
          <div className={s.top}>
            <span className={s.brand}>
              <Tile icon="biotech" tone={ORANGE} solid />
              ArogyaPlus
            </span>
            <Chip variant="surface" mono className={s.warmChip}>
              HealthTech · Dubai
            </Chip>
          </div>
          <p className={s.statement}>
            Home diagnostics and preventive health packages, delivered by DHA-licensed professionals and CAP-accredited
            labs.
          </p>
          <Grid min={120} gap="sm" pair>
            {AROGYA_STATS.map((st) => (
              <Stat
                key={st.label}
                variant="surface"
                ink={ORANGE.ink}
                count={st.count}
                suffix={st.suffix}
                value={st.display}
                label={st.label}
              />
            ))}
          </Grid>
          <Button to={ROUTES.venture('arogyaplus')} variant="link" icon="arrow_forward" className={s.more}>
            Discover ArogyaPlus
          </Button>
        </Card>
      </Swipe>
    </Section>
  );
}
