import { Card, Portrait } from '@/components/ui';
import { teamPhoto } from '@/content/assets';
import type { Person } from '@/types';
import s from './PersonCard.module.css';

interface PersonCardProps {
  person: Person;
  /** Heading level for the name, to fit the page's outline. */
  as?: 'h2' | 'h3';
}

/** One team member: the portrait, or a placeholder until there is one, with the name and designation at its foot. */
export function PersonCard({ person: p, as: Name = 'h3' }: PersonCardProps) {
  return (
    <Card as="article" variant="inverse" padding="sm" interactive className={s.person}>
      <Portrait name={p.name} photo={teamPhoto(p.name)} figure={p.figure} variant="glass" className={s.photo} />
      <div className={s.text}>
        <Name className={`t-h4 ${s.name}`}>{p.name}</Name>
        <p className={`t-small ${s.role}`}>{p.role}</p>
        {p.company && <p className={`t-small ${s.company}`}>{p.company}</p>}
      </div>
    </Card>
  );
}
