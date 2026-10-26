import { Avatar, Button, Card, Grid, Portrait, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { HOME_LEADERS, LEADER_COUNT } from '@/content/team';
import { alternate } from '@/content/tones';
import { teamPhoto } from '@/content/assets';
import s from './TeamPreview.module.css';

export function TeamPreview() {
  return (
    <Section data-screen-label="Team" pt="none">
      <SectionHeader
        kicker="04 — Our team"
        title="Founder-led, with operators in every business."
        layout="split"
        lead="A board that sets direction for the group, and dedicated leaders running each company day to day."
        action={
          <Button to={ROUTES.team} variant="link" icon="arrow_outward">
            Meet all {LEADER_COUNT} leaders
          </Button>
        }
      />

      <Grid min={240} max={4} gap="sm" data-stagger="80">
        {HOME_LEADERS.map((p, i) => (
          <Card key={p.name} padding="sm" interactive className={s.card}>
            {teamPhoto(p.name) ? (
              <Portrait name={p.name} photo={teamPhoto(p.name)} tone={alternate(i)} className={s.photo} />
            ) : (
              <Avatar name={p.name} tone={alternate(i)} />
            )}
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
