import { COUNTRY_LABELS } from '@/content/companies';
import { cx } from '@/lib/cx';
import type { GroupCompany } from '@/types';
import s from './DeliveredBy.module.css';

interface DeliveredByProps {
  companies: GroupCompany[];
  label?: string;
  className?: string;
}

/**
 * One quiet line naming the companies behind a service, each with its country.
 * Colours follow `--ink` / `--muted` when a dark section sets them.
 */
export function DeliveredBy({ companies, label = 'Delivered by', className }: DeliveredByProps) {
  if (!companies.length) return null;
  return (
    <dl className={cx(s.line, className)}>
      <dt className={s.label}>{label}</dt>
      {companies.map((c) => (
        <dd key={c.name} className={s.company}>
          {c.name}
          <span className={s.country}>{COUNTRY_LABELS[c.country]}</span>
        </dd>
      ))}
    </dl>
  );
}
