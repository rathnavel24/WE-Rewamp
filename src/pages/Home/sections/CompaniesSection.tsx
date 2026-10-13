import { AppLink } from '@/components/ui/AppLink';
import { COMPANIES, ROLL_NAMES } from '@/data/companies';
import s from './CompaniesSection.module.css';

const ROLL = [...ROLL_NAMES, ...ROLL_NAMES];

export function CompaniesSection() {
  return (
    <section data-screen-label="Companies" className={s.section}>
      <div className={s.glow} />
      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <div className={s.headCopy}>
            <span data-reveal="fade" className={`eyebrow ${s.eyebrow}`}>
              02 — Our companies
            </span>
            <h2 data-reveal="up" className="display-2">
              Seven companies. One parent.
            </h2>
          </div>
          <p data-reveal="up" data-delay="100" className={s.intro}>
            Each subsidiary runs its own brand and website. WalletEdge Global holds the major stake — bringing shared capital, governance
            and technology to every one of them.
          </p>
        </div>

        <div data-stagger="70" data-type="left" className={s.list}>
          {COMPANIES.map((c, i) => (
            <AppLink key={c.name} to={c.groupHref} className={s.row}>
              <span className={s.no}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.text}>
                <span className={s.name}>{c.name}</span>
                <span className={s.line}>{c.groupLine}</span>
              </span>
              <span className={s.meta}>
                <span className={s.country}>{c.country}</span>
                <span className={s.arrow} aria-hidden="true">
                  arrow_outward
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
    </section>
  );
}
