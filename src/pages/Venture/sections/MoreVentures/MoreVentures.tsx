import { Card, Grid, Icon, Section, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import type { Venture } from '@/types';
import s from './MoreVentures.module.css';

/** Links to the group's other ventures, at the foot of a venture page. */
export function MoreVentures({ ventures }: { ventures: Venture[] }) {
  return (
    <Section pt="sm" gap="md">
      <h2 data-reveal="fade" className="t-label">
        More from the group
      </h2>
      <Grid min={220} gap="sm" data-stagger="80">
        {ventures.map((o) => (
          <Card key={o.id} to={ROUTES.venture(o.id)} padding="sm" className={s.other}>
            <span className={s.otherName}>
              <Tile icon={o.icon} size="sm" tone={o.tone} />
              {o.name}
            </span>
            <Icon name="arrow_forward" size={20} />
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
