import { Card, Grid, Section, SectionHeader, SectionIndex } from '@/components/ui';
import { IT_BPO_PLATFORMS } from '@/content/services';
import { PracticeCompanyCard } from '../PracticeCompanyCard';
import s from './ItBpoPractice.module.css';

/** 01 — IT & BPO */
export function ItBpoPractice() {
  return (
    <Section id="it-bpo" data-screen-label="IT & BPO" pt="sm" pb="sm">
      <Card data-reveal="up" padding="xl" className={s.panel}>
        <SectionHeader
          kicker={<SectionIndex no="01" label="IT & BPO" />}
          title="AI platforms for insurance and healthcare."
          size="h1"
          layout="split"
          reveal={false}
          lead="Our technology companies build and operate digital platforms that remove manual work from regulated industries."
        />
        <Grid min={420}>
          {IT_BPO_PLATFORMS.map((c) => (
            <PracticeCompanyCard key={c.venture} company={c} />
          ))}
        </Grid>
      </Card>
    </Section>
  );
}
