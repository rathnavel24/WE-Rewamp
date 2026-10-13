import type { CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { AppLink, Button, Card, Chip, Grid, Icon, Section, SectionHeader, Stat, Tile } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';
import { GREEN, ORANGE } from '@/data/tones';
import { isVentureId, VENTURE_LIST, VENTURES } from '@/data/ventures';
import type { Venture } from '@/types';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';
import s from './VenturePage.module.css';

const CASE_POINTS = [
  {
    icon: 'automation',
    tone: GREEN,
    title: 'Automated claims management',
    desc: 'Workflows that close expectation gaps between real estate entities, TPAs and insurers.'
  },
  {
    icon: 'sync_alt',
    tone: ORANGE,
    title: 'Integrated TPA routing',
    desc: 'Claims sync directly with corporate asset panels — verification from months to a few digital cycles.'
  }
];

export function VenturePage() {
  const { id } = useParams();
  if (!isVentureId(id)) return <NotFoundPage />;
  // Keyed so switching ventures remounts and replays the motion.
  return <VentureView key={id} v={VENTURES[id]} />;
}

function VentureView({ v }: { v: Venture }) {
  useDocumentTitle(`${v.name} — WalletEdge Global`);
  const toneVars = { '--accent': v.tone.accent } as CSSProperties;
  const others = VENTURE_LIST.filter((o) => o.id !== v.id);

  return (
    <div style={toneVars}>
      {/* Hero */}
      <Section data-screen-label="Venture hero" pt="hero" pb="sm" gap="md">
        <nav data-reveal="fade" aria-label="Breadcrumb" className={s.crumbs}>
          <AppLink to={ROUTES.companies} className={s.back}>
            <Icon name="arrow_back" size={17} />
            Our companies
          </AppLink>
          <span className={s.sep} aria-hidden="true">
            /
          </span>
          <span aria-current="page" className={s.current}>
            {v.name}
          </span>
        </nav>

        <div className={s.heroGrid}>
          <div className={s.heroLead}>
            <span data-reveal="up" className={s.identity}>
              <Tile icon={v.icon} size="xl" tone={v.tone} solid />
              <Chip variant="surface" mono>
                {v.sector}
              </Chip>
            </span>
            <h1 data-reveal="up" data-delay="60" className="t-display-1">
              {v.name}
            </h1>
            <p data-reveal="up" data-delay="120" className={s.tagline}>
              {v.tagline}
            </p>
          </div>
          <div data-reveal="up" data-delay="180" className={s.aboutCol}>
            <p className="t-body-lg">{v.about}</p>
            <div className={s.actions}>
              <Button to={`${ROUTES.contact}?venture=${v.id}`} icon="arrow_forward" className={s.enquire}>
                Enquire about {v.name}
              </Button>
              {v.site && (
                <Button to={v.site.href} target={v.site.href.startsWith('http') ? '_blank' : undefined} variant="secondary" icon="open_in_new">
                  {v.site.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Stats */}
      {v.stats && (
        <Section pt="none" pb="none">
          <Grid min={220} gap="sm" data-stagger="90">
            {v.stats.map((st) => (
              <Stat key={st.label} variant="soft" size="lg" soft={v.tone.soft} ink={v.tone.ink} count={st.n} suffix={st.suffix} value={`${st.n}${st.suffix}`} label={st.label} />
            ))}
          </Grid>
        </Section>
      )}

      {/* Capabilities */}
      <Section data-screen-label="Capabilities" pb="sm">
        <SectionHeader title={v.featTitle} size="h1" />
        <Grid min={300} max={3} gap="sm" data-stagger="80">
          {v.features.map((f) => (
            <Card key={f.title} spotlight glow={v.tone.glow} interactive className={s.feature}>
              <Tile icon={f.icon} tone={v.tone} />
              <span className={s.featureText}>
                <span className="t-h3">{f.title}</span>
                <span className="t-body">{f.desc}</span>
              </span>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Process */}
      {v.steps && (
        <Section data-screen-label="Process" pt="sm" pb="sm">
          <Card data-reveal="up" variant="inverse" padding="xl" className={`on-dark ${s.panel}`}>
            <h2 className="t-h1">Simple and efficient process</h2>
            <Grid min={220} gap="sm" data-stagger="120">
              {v.steps.map((st) => (
                <Card key={st.no} variant="glass" padding="md" className={s.step}>
                  <div className={s.stepTop}>
                    <Tile icon={st.icon} tone={ORANGE} solid />
                    <span className="t-mono t-small">{st.no}</span>
                  </div>
                  <span className={s.featureText}>
                    <span className="t-h4">{st.title}</span>
                    <span className="t-small">{st.desc}</span>
                  </span>
                </Card>
              ))}
            </Grid>
          </Card>
        </Section>
      )}

      {/* Case study */}
      {v.caseStudy && (
        <Section data-screen-label="Case study" pt="sm" pb="sm">
          <Card data-reveal="up" padding="xl" className={s.case}>
            <SectionHeader
              kicker="Case focus · EMAAR Group"
              title="Streamlining the corporate recovery process."
              size="h1"
              reveal={false}
              lead="EMAAR coordinates massive property portfolios where Emaar Community Management mandates master property insurance, public liability and fidelity guarantee. When incidents affect assets, recovery depends on complex commercial claims with regional insurers — the gaps WalletEdge is built to close."
            />
            <div className={s.casePoints}>
              {CASE_POINTS.map((p) => (
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
      )}

      {/* More from the group */}
      <Section pt="sm" gap="md">
        <h2 data-reveal="fade" className="t-label">
          More from the group
        </h2>
        <Grid min={220} gap="sm" data-stagger="80">
          {others.map((o) => (
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
    </div>
  );
}
