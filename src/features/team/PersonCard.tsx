import { Card, Portrait } from '@/components/ui';
import { teamPhoto } from '@/content/assets';
import { cx } from '@/lib/cx';
import type { Person } from '@/types';
import s from './PersonCard.module.css';

interface PersonCardProps {
  person: Person;
  /** Heading level for the name, to fit the page's outline. */
  as?: 'h2' | 'h3';
  /** Name and designation only: reserves less height for text. */
  compact?: boolean;
}

/** One team member: the portrait, or a placeholder until there is one, with the name and designation at its foot. */
export function PersonCard({ person: p, as: Name = 'h3', compact }: PersonCardProps) {
  return (
    <Card as="article" variant="inverse" padding="sm" className={cx(s.person, !compact && s.full)}>
      <Portrait name={p.name} photo={teamPhoto(p.name)} figure={p.figure} variant="glass" className={s.photo} />
      <div className={cx(s.text, compact && s.compact)}>
        <Name className={`t-h4 ${s.name}`}>{p.name}</Name>
        <p className={`t-small ${s.role}`}>{p.role}</p>
        {p.company && <p className={`t-small ${s.company}`}>{p.company}</p>}
      </div>
    </Card>
  );
}
