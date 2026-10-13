import { Button, Card, Chip, Grid, Icon, Section, SectionHeader, Tile } from '@/components/ui';
import { ROUTES } from '@/data/routes';
import { SERVICE_CARDS } from '@/data/services';
import s from './ServicesSection.module.css';

export function ServicesSection() {
  return (
    <Section data-screen-label="Services">
      <SectionHeader
        kicker="01 — Our services"
        title="Five practices. One accountable group."
        layout="split"
        action={
          <Button to={ROUTES.services} variant="link" icon="arrow_outward">
            All services
          </Button>
        }
      />

      <Grid min={300} max={3} data-stagger="90">
        {SERVICE_CARDS.map((c) => (
          <Card key={c.no} to={c.href} spotlight glow={c.tone.glow} className={s.card}>
            <div className={s.cardTop}>
              <Tile icon={c.icon} size="lg" tone={c.tone} />
              <span className={`t-mono ${s.no}`}>{c.no}</span>
            </div>
            <div className={s.body}>
              <h3 className="t-h3">{c.title}</h3>
              <p className="t-body">{c.desc}</p>
            </div>
            <div className={s.tags}>
              {c.tags.map((t) => (
                <Chip key={t} size="sm">
                  {t}
                </Chip>
              ))}
            </div>
          </Card>
        ))}

        <Card to={ROUTES.contact} variant="accent" className={s.card}>
          <Icon name="handshake" size={36} />
          <div className={s.partnerBody}>
            <h3 className="t-h2">Need a partner across more than one of these?</h3>
            <span className={s.partnerLink}>
              Talk to the group
              <Icon name="arrow_forward" size={18} />
            </span>
          </div>
        </Card>
      </Grid>
    </Section>
  );
}
