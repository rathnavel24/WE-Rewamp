import { Card, Grid, Section, SectionHeader, SectionIndex } from '@/components/ui';
import { HEALTHCARE_COMPANIES } from '@/content/services';
import { PracticeCompanyCard } from '../PracticeCompanyCard';
import s from './HealthcarePractice.module.css';

/** 05 — Healthcare */
export function HealthcarePractice() {
  return (
    <Section id="healthcare" data-screen-label="Healthcare" pt="sm">
      <Card data-reveal="up" variant="primary-soft" padding="xl" className={s.panel}>
        <SectionHeader
          kicker={<SectionIndex no="05" label="Healthcare services" tone="health" />}
          title="Major stakes in DHA-licensed healthcare."
          size="h1"
          layout="split"
          reveal={false}
          lead="WalletEdge Global owns major stakes in the following Dubai Health Authority licensed companies."
        />
        <Grid min={420}>
          {HEALTHCARE_COMPANIES.map((c) => (
            <PracticeCompanyCard key={c.venture} company={c} />
          ))}
        </Grid>
      </Card>
    </Section>
  );
}
