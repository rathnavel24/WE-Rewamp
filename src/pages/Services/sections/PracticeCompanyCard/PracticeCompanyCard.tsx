import { Card, Icon, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { cx } from '@/lib/cx';
import type { PracticeCompany } from '@/types';
import s from './PracticeCompanyCard.module.css';

/** A group company inside a practice: links to its venture page. */
export function PracticeCompanyCard({ company: c }: { company: PracticeCompany }) {
  return (
    <Card
      to={ROUTES.venture(c.venture)}
      variant={c.variant}
      padding="lg"
      className={cx(s.card, c.meta !== undefined && s.withMeta)}
    >
      <div className={s.top}>
        <Tile icon={c.icon} size="lg" tone={c.tone} solid />
        {c.meta !== undefined ? <span className="t-label">{c.meta}</span> : <Icon name="arrow_outward" size={24} />}
      </div>
      <h3 className="t-h2">{c.title}</h3>
      <p className="t-body">{c.desc}</p>
      {c.meta !== undefined && (
        <span className={s.more}>
          View company
          <Icon name="arrow_forward" size={18} />
        </span>
      )}
    </Card>
  );
}
