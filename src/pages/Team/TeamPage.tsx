import { Card, Chip, CtaBanner, Grid, Portrait, Section, SectionHeader } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { BOARD, DIVISION_LEADERS, FOUNDERS } from '@/content/team';
import { alternate } from '@/content/tones';
import type { Person } from '@/types';
import { teamPhoto } from '@/content/assets';
import s from './TeamPage.module.css';

/** Colours alternate across both groups continuously, as in the design. */
const GROUPS: Array<{ title: string; people: Array<Person & { index: number }> }> = (() => {
  let k = 0;
  const tag = (list: Person[]) => list.map((p) => ({ ...p, index: k++ }));
  return [
    { title: 'Board of directors', people: tag(BOARD) },
    { title: 'Company & division leadership', people: tag(DIVISION_LEADERS) }
  ];
})();

export function TeamPage() {
  usePageMeta({
    title: 'Our Team',
    description: 'The founders, board and leaders running each WalletEdge Global company day to day.'
  });
  return (
    <>
      <Section data-screen-label="Team hero" pt="hero" pb="sm">
        <SectionHeader
          as="h1"
          size="display-1"
          layout="split"
          kicker="Our team"
          title="The people behind the group."
          lead="Founders and a board who set direction, with dedicated leaders running healthcare, recovery, real estate and technology every day."
        />
      </Section>

      <Section data-screen-label="Founders" pt="none" pb="sm">
        <Grid min={460} data-stagger="120">
          {FOUNDERS.map((p) => (
            <div key={p.name} className={`on-dark ${s.founder}`} style={{ background: p.background }}>
              <div className={s.founderGlow} aria-hidden="true" />
              <div className={s.founderText}>
                <Chip variant="glass" mono>
                  Founder
                </Chip>
                <div className={s.founderName}>
                  <span>{p.name}</span>
                  <span className="t-body-lg">{p.role}</span>
                </div>
              </div>
              <Portrait name={p.name} photo={teamPhoto(p.name)} variant="glass" className={s.founderPhoto} />
            </div>
          ))}
        </Grid>
      </Section>

      {GROUPS.map((g) => (
        <Section key={g.title} pt="sm" pb="none" gap="md">
          <div data-reveal="fade" className={s.groupHead}>
            <h2 className="t-label">{g.title}</h2>
            <span className={s.groupRule} />
            <span className="t-label">{String(g.people.length).padStart(2, '0')}</span>
          </div>
          {/* Three per row keeps both groups (3 and 9 people) as complete rows. */}
          <Grid min={280} max={3} gap="sm" data-stagger="60">
            {g.people.map((p) => {
              const tone = alternate(p.index);
              return (
                <Card key={p.name} padding="sm" interactive className={s.person}>
                  <Portrait name={p.name} photo={teamPhoto(p.name)} tone={tone} className={s.personPhoto} />
                  <span className={s.personText}>
                    <span className="t-h4">{p.name}</span>
                    <span className="t-small">{p.role}</span>
                    {p.unit && (
                      <Chip size="sm" mono style={{ color: tone.ink }}>
                        {p.unit}
                      </Chip>
                    )}
                  </span>
                </Card>
              );
            })}
          </Grid>
        </Section>
      ))}

      <CtaBanner
        title="Want to speak with someone on the leadership team?"
        cta="Book a meeting"
        to={ROUTES.contact}
        pt="md"
      />
    </>
  );
}
