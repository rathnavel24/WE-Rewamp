import { Button, Card, Chip, CtaBanner, Grid, Icon, Section, SectionHeader, SectionIndex, Stat, Tile } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';
import { CONSULTING_SERVICES, SERVICE_PILLARS } from '@/data/services';
import { GREEN, ORANGE } from '@/data/tones';
import s from './ServicesPage.module.css';

export function ServicesPage() {
  useDocumentTitle('Services — WalletEdge Global');
  return (
    <>
      {/* Hero */}
      <Section data-screen-label="Services hero" pt="hero" pb="sm" gap="md">
        <SectionHeader as="h1" size="display-1" kicker="Our services" title="Five practices, run by specialists, backed by one group." />
        <nav aria-label="Practices" data-stagger="60" className={s.pillars}>
          {SERVICE_PILLARS.map((p) => (
            <Chip key={p.anchor} to={p.anchor} variant="surface" size="lg" leading={<Tile icon={p.icon} size="xs" tone={p.tone} round />}>
              {p.title}
            </Chip>
          ))}
        </nav>
      </Section>

      {/* 01 — IT & BPO */}
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
            <Card to={ROUTES.venture('insureliv')} variant="sunken" padding="lg">
              <div className={s.cardTop}>
                <Tile icon="shield_with_heart" size="lg" tone={GREEN} solid />
                <Icon name="arrow_outward" size={24} />
              </div>
              <h3 className="t-h2">InsureLiv</h3>
              <p className="t-body">
                An AI-powered insurance operating system built by WhiteBlue FinTech for brokerages. It automates the entire broker workflow
                — lead capture, multi-insurer quoting, document verification and renewals — boosting productivity while cutting turnaround
                and cost.
              </p>
            </Card>
            <Card to={ROUTES.venture('arogyaplus')} variant="accent-soft" padding="lg">
              <div className={s.cardTop}>
                <Tile icon="biotech" size="lg" tone={ORANGE} solid />
                <Icon name="arrow_outward" size={24} />
              </div>
              <h3 className="t-h2">ArogyaPlus</h3>
              <p className="t-body">
                A Dubai-based health technology platform powered by Wallet Edge Technologies — at-home and in-clinic medical services,
                health packages, lab test bookings with home sample collection, and professional nursing care.
              </p>
            </Card>
          </Grid>
        </Card>
      </Section>

      {/* 02 — Financial · 03 — Real estate */}
      <Section id="financial" data-screen-label="Financial" pt="sm" pb="sm">
        <Grid min={420}>
          <Card data-reveal="up" variant="inverse" padding="lg" className={`on-dark ${s.split}`}>
            <div className={s.finGlow} aria-hidden="true" />
            <SectionIndex no="02" label="Financial services" />
            <h2 className="t-h1">Insurance recovery agent services.</h2>
            <p className="t-body-lg">
              Professional financial recovery and asset retrieval — faster turnaround through data-driven processes and transparent
              communication with every stakeholder.
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
              Jointly developing an apartment project in partnership with Seyyone Ventures — experienced in the real estate sector for more
              than two decades in Coimbatore.
            </p>
            <Grid min={160} gap="sm" className={s.reStats}>
              <Stat count={20} suffix="+" value="20+" label="Years of partner experience" />
              <Stat value={<Icon name="location_city" size={38} />} label="Apartment project, Coimbatore" />
            </Grid>
          </Card>
        </Grid>
      </Section>

      {/* 04 — Consulting */}
      <Section id="consulting" data-screen-label="Consulting" pt="sm" pb="sm">
        <SectionHeader
          kicker={<SectionIndex no="04" label="Consulting services" />}
          title="From company setup to steady growth."
          size="h1"
          layout="split"
          lead="Practical advisory for founders and enterprises entering or scaling in the UAE."
        />
        <Grid min={220} gap="sm" data-stagger="70">
          {CONSULTING_SERVICES.map((c) => (
            <Card key={c.title} spotlight glow="var(--glow-accent)" className={s.consultCard}>
              <Tile icon={c.icon} neutral />
              <span className={s.consultText}>
                <span className={`t-h4 ${s.consultTitle}`}>{c.title}</span>
                <span className="t-small">{c.desc}</span>
              </span>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* 05 — Healthcare */}
      <Section id="healthcare" data-screen-label="Healthcare" pt="sm">
        <Card data-reveal="up" variant="primary-soft" padding="xl" className={s.panel}>
          <SectionHeader
            kicker={<SectionIndex no="05" label="Healthcare services" tone="health" />}
            title="Major stakes in DHA-licensed healthcare."
            size="h1"
            layout="split"
            reveal={false}
            lead="WalletEdge Global owns major stakes in the following Dubai Health Authority licensed companies."
          />
          <Grid min={420}>
            <HealthCard
              to={ROUTES.venture('carehub')}
              icon="home_health"
              solid={GREEN}
              meta="carehubuae.com"
              title="CareHub Healthcare LLC"
              desc="A premier DHA-licensed home healthcare provider in Dubai — 24/7 private nursing, elderly assistance, post-operative recovery, wound care, IV infusions, physiotherapy and digital phlebotomy."
            />
            <HealthCard
              to={ROUTES.venture('globalcure')}
              icon="medication"
              solid={ORANGE}
              meta="+971 50 515 2391"
              title="Global Cure RX Pharmacy LLC"
              desc="A community pharmacy in Dubai dispensing high-value prescriptions with insurance tie-ups — plus OTC medicines, supplements, medication counselling and repeat dispensing. Walk-ins welcome."
            />
          </Grid>
        </Card>
      </Section>

      <CtaBanner title="Not sure which practice fits? We’ll route you to the right team." cta="Contact us" to={ROUTES.contact} />
    </>
  );
}

interface HealthCardProps {
  to: string;
  icon: string;
  solid: typeof GREEN;
  meta: string;
  title: string;
  desc: string;
}

function HealthCard({ to, icon, solid, meta, title, desc }: HealthCardProps) {
  return (
    <Card to={to} padding="lg" className={s.healthCard}>
      <div className={s.cardTop}>
        <Tile icon={icon} size="lg" tone={solid} solid />
        <span className="t-label">{meta}</span>
      </div>
      <h3 className="t-h2">{title}</h3>
      <p className="t-body">{desc}</p>
      <span className={s.healthMore}>
        View company
        <Icon name="arrow_forward" size={18} />
      </span>
    </Card>
  );
}
