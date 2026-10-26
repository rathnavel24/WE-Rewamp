import { Card, Section, SectionHeader, Tile } from '@/components/ui';
import type { CaseStudy } from '@/types';
import s from './VentureCaseStudy.module.css';

export function VentureCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <Section data-screen-label="Case study" pt="sm" pb="sm">
      <Card data-reveal="up" padding="xl" className={s.case}>
        <SectionHeader kicker={study.kicker} title={study.title} size="h1" reveal={false} lead={study.lead} />
        <div className={s.casePoints}>
          {study.points.map((p) => (
            <Card key={p.title} variant="sunken" padding="sm" className={s.casePoint}>
              <Tile icon={p.icon} tone={p.tone} solid />
              <span className={s.featureText}>
                <span className="t-h4">{p.title}</span>
                <span className="t-small">{p.desc}</span>
              </span>
            </Card>
          ))}
        </div>
      </Card>
    </Section>
  );
}
