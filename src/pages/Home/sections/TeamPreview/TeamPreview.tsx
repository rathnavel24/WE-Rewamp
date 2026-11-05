import { Avatar, Button, Card, Grid, Portrait, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { HOME_LEADERS } from '@/content/team';
import { alternate } from '@/content/tones';
import { teamPhoto } from '@/content/assets';
import s from './TeamPreview.module.css';

export function TeamPreview() {
  return (
    <Section data-screen-label="Team" pt="none">
      <SectionHeader
        kicker="Our team"
        title="Experienced leadership across the group"
        layout="split"
        lead="Our founders and board set the direction of the group, supported by dedicated leaders for each business."
        action={
          <Button to={ROUTES.team} variant="link" icon="arrow_outward">
            Meet the executive team
          </Button>
        }
      />

      <Grid min={240} max={4} gap="sm" data-stagger="80" className={s.list}>
        {HOME_LEADERS.map((p, i) => (
          <Card key={p.name} padding="sm" className={s.card}>
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
