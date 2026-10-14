import { AppLink, Chip, Icon, Section, SectionHeader } from '@/components/ui';
import { COMPANIES, ROLL_NAMES } from '@/content/companies';
import s from './CompaniesSection.module.css';

const ROLL = [...ROLL_NAMES, ...ROLL_NAMES];

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

        <div data-stagger="70" data-type="left" className={s.list}>
          {COMPANIES.map((c, i) => (
            <AppLink key={c.name} to={c.groupHref} className={s.row}>
              <span className={`t-mono ${s.no}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.text}>
                <span className={s.name}>{c.name}</span>
                <span className="t-small">{c.groupLine}</span>
              </span>
              <span className={s.meta}>
                <Chip variant="outline-dark" mono>
                  {c.country}
                </Chip>
                <span className={s.arrow}>
                  <Icon name="arrow_outward" size={20} />
                </span>
              </span>
            </AppLink>
          ))}
        </div>
      </div>

      <div className={s.marquee} data-marquee="left" data-speed="45" aria-hidden="true">
        {ROLL.map((n, i) => (
          <span key={i} className={s.rollName}>
            {n}
            <span className={s.square} />
          </span>
        ))}
      </div>
    </Section>
  );
}
