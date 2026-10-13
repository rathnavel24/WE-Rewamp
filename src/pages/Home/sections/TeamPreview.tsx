import { Avatar, Button, Card, Grid, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/data/routes';
import { HOME_LEADERS, LEADER_COUNT } from '@/data/team';
import { alternate } from '@/data/tones';
import s from './TeamPreview.module.css';

export function TeamPreview() {
  return (
    <Section data-screen-label="Team" pt="none" innerClassName={s.layout}>
      <div className={s.copy}>
        <SectionHeader
          kicker="04 — Our team"
          title="Founder-led, with operators in every business."
          lead="A board that sets direction for the group, and dedicated leaders running each company day to day."
          action={
            <Button to={ROUTES.team} icon="arrow_forward">
              Meet all {LEADER_COUNT} leaders
            </Button>
          }
        />
      </div>

      <Grid min={220} gap="sm" data-stagger="80">
        {HOME_LEADERS.map((p, i) => (
          <Card key={p.name} padding="sm" interactive className={s.card}>
            <Avatar name={p.name} tone={alternate(i)} />
            <span className={s.text}>
              <span className="t-h4">{p.name}</span>
              <span className="t-small">{p.role}</span>
            </span>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
