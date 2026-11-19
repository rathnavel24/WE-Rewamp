import { Button, Grid, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { HOME_LEADERS } from '@/content/team';
import { PersonCard } from '@/features/team';
import s from './TeamPreview.module.css';

export function TeamPreview() {
  return (
    <Section data-screen-label="Team">
      <SectionHeader
        kicker="Our team"
        title="Leadership Team"
        layout="split"
        action={
          <Button to={ROUTES.team} variant="link" icon="arrow_outward">
            Meet the executive team
          </Button>
        }
      />

      <Grid min={160} gap="sm" data-stagger="80" className={s.list}>
        {HOME_LEADERS.map((p) => (
          <PersonCard key={p.name} person={p} compact />
        ))}
      </Grid>
    </Section>
  );
}
