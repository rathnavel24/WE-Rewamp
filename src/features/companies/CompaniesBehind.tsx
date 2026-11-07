import { AppLink, ArrowText, Icon } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { companyLogo } from '@/content/assets';
import { COUNTRY_LABELS } from '@/content/companies';
import { VENTURES } from '@/content/ventures';
import { cx } from '@/lib/cx';
import type { GroupCompany } from '@/types';
import s from './CompaniesBehind.module.css';

interface CompaniesBehindProps {
  companies: GroupCompany[];
  /** The service's name, which labels the block for screen readers. */
  service: string;
  className?: string;
}

/**
 * A highlighted block naming the group companies that deliver a service, each with its country and what it
 * does for the service. Colours follow the section's `--ink` / `--muted` / `--faint` / `--rule` / `--panel-bg`.
 */
export function CompaniesBehind({ companies, service, className }: CompaniesBehindProps) {
  if (!companies.length) return null;
  return (
    <section className={cx(s.panel, className)} aria-label={`Companies behind ${service}`}>
      <p className={s.heading}>Explore the {companies.length === 1 ? 'company' : 'companies'}</p>
      <ul className={s.list}>
        {companies.map((c) => {
          const venture = c.venture ? VENTURES[c.venture] : undefined;
          return (
            <li key={c.name} className={s.item}>
              <span className={s.logo} aria-hidden="true">
                {companyLogo(c) ? <img src={companyLogo(c)} alt="" /> : <Icon name="corporate_fare" size={22} />}
              </span>
              <span className={s.body}>
                <span className={s.name}>{c.name}</span>
                {c.note &&
                  (venture ? (
                    <AppLink to={ROUTES.venture(venture.id)} className={s.role}>
                      <span className={s.roleText}>
                        <ArrowText text={c.note} size={16} iconClassName={s.arrow} />
                      </span>
                    </AppLink>
                  ) : (
                    <span className={s.role}>{c.note}</span>
                  ))}
              </span>
              <span className={s.country}>
                <Icon name="location_on" size={16} />
                {COUNTRY_LABELS[c.country]}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
