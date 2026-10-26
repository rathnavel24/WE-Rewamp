import { Button, Card, Chip, Grid, Icon, Section, SectionIndex, Stat } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import s from './FinancialRealEstate.module.css';

/** 02 — Financial services · 03 — Real estate, side by side. */
export function FinancialRealEstate() {
  return (
    <Section id="financial" data-screen-label="Financial" pt="sm" pb="sm">
      <Grid min={420}>
        <Card data-reveal="up" variant="inverse" padding="lg" className={`on-dark ${s.split}`}>
          <div className={s.finGlow} aria-hidden="true" />
          <SectionIndex no="02" label="Financial services" />
          <h2 className="t-h1">Insurance recovery agent services.</h2>
          <p className="t-body-lg">
            Professional financial recovery and asset retrieval — faster turnaround through data-driven processes and
            transparent communication with every stakeholder.
          </p>
          <div className={s.finChips}>
            <Chip variant="glass" size="lg" icon="apartment" className={s.finChip}>
              EMAAR
            </Chip>
            <Chip variant="glass" size="lg" icon="verified_user" className={s.finChip}>
              LIVA Insurance
            </Chip>
            <Button to={ROUTES.venture('recovery')} variant="inverse" size="sm" icon="arrow_forward">
              Recovery Services
            </Button>
          </div>
        </Card>

        <Card id="real-estate" data-reveal="up" data-delay="120" padding="lg" className={`anchor ${s.split}`}>
          <SectionIndex no="03" label="Real estate" />
          <h2 className="t-h1">Building homes in Coimbatore.</h2>
          <p className="t-body-lg">
            Jointly developing an apartment project in partnership with Seyyone Ventures — experienced in the real
            estate sector for more than two decades in Coimbatore.
          </p>
          <Grid min={160} gap="sm" pair className={s.reStats}>
            <Stat count={20} suffix="+" value="20+" label="Years of partner experience" />
            <Stat value={<Icon name="location_city" size={38} />} label="Apartment project, Coimbatore" />
          </Grid>
        </Card>
      </Grid>
    </Section>
  );
}
