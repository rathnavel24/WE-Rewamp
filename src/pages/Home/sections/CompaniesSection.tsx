import { AppLink, Chip, Icon, Section, SectionHeader, Tile } from '@/components/ui';
import { COMPANIES } from '@/content/companies';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './CompaniesSection.module.css';

const PARENT = COMPANIES.find((c) => c.parent)!;
const SUBSIDIARIES = COMPANIES.filter((c) => !c.parent);
const COUNTRIES = Object.entries(
  COMPANIES.reduce<Record<string, number>>((acc, c) => ({ ...acc, [c.country]: (acc[c.country] ?? 0) + 1 }), {})
);

export function CompaniesSection() {
  return (
    <Section data-screen-label="Companies" tone="inverse" contained={false}>
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <SectionHeader
          kicker="02 — Our companies"
          title="Seven companies. One parent."
          layout="split"
          lead="Each subsidiary runs its own brand and website. WalletEdge Global holds the major stake — bringing shared capital, governance and technology to every one of them."
        />

        <div className={s.layout}>
          {/* Parent: the holding company every subsidiary reports into. */}
          <AppLink data-reveal="up" to={PARENT.groupHref} className={s.parent}>
            <span className={s.parentLogoWrap}>
              <img src={logo} alt="" className={s.parentLogo} />
            </span>
            <span className={s.parentBody}>
              <span className={s.parentLabel}>Parent company</span>
              <span className={s.parentName}>{PARENT.name}</span>
              <span className={s.parentDesc}>{PARENT.desc}</span>
            </span>
            <span className={s.parentStats}>
              <span className={s.parentStat}>
                <span className={s.parentValue}>{COMPANIES.length}</span>
                <span className={s.parentKey}>Companies</span>
              </span>
              {COUNTRIES.map(([country, n]) => (
                <span key={country} className={s.parentStat}>
                  <span className={s.parentValue}>{n}</span>
                  <span className={s.parentKey}>{country}</span>
                </span>
              ))}
            </span>
            <span className={s.parentCta}>
              View the group
              <Icon name="arrow_forward" size={18} />
            </span>
          </AppLink>

          {/* Subsidiaries */}
          <div data-stagger="70" className={s.grid}>
            {SUBSIDIARIES.map((c) => (
              <AppLink key={c.name} to={c.groupHref} className={s.card}>
                <span className={s.cardTop}>
                  <Tile icon={c.icon} size="sm" tone={c.tone} solid />
                  <Chip variant="outline-dark" mono size="sm">
                    {c.country}
                  </Chip>
                </span>
                <span className={s.cardBody}>
                  <span className={s.sector}>{c.sector}</span>
                  <span className={s.name}>{c.name}</span>
                  <span className={s.line}>{c.groupLine}</span>
                </span>
                <span className={s.arrow} aria-hidden="true">
                  <Icon name="arrow_outward" size={18} />
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
