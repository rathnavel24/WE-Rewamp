import type { CSSProperties } from 'react';
import { AppLink, Avatar, CtaBanner, Icon, Portrait, Section, SectionHeader } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { teamPhoto } from '@/content/assets';
import { BOARD, DIVISION_LEADERS, FOUNDERS } from '@/content/team';
import { alternate, GREEN, ORANGE } from '@/content/tones';
import type { Person } from '@/types';
import s from './TeamPage.module.css';

const SECTIONS = [
  { id: 'founders', label: 'Founders' },
  { id: 'board', label: 'Board of directors' },
  { id: 'leadership', label: 'Business leaders' }
];

export function TeamPage() {
  usePageMeta({
    title: 'Our Team',
    description: 'The founders, board of directors and business leaders of WalletEdge Global and its group companies.'
  });
  return (
    <>
      <Section data-screen-label="Team hero" pt="hero" pb="sm" gap="md">
        <SectionHeader
          as="h1"
          size="display-1"
          layout="split"
          kicker="Our team"
          title="Leadership and management"
          lead="The founders, board and business leaders responsible for the companies of WalletEdge Global."
        />
        <nav aria-label="Sections on this page" className={s.contents}>
          {SECTIONS.map((x, i) => (
            <AppLink
              key={x.id}
              to={`#${x.id}`}
              className={s.entry}
              style={{ '--tone': alternate(i).accent } as CSSProperties}
            >
              <span className={s.entryLabel}>
                {x.label}
                <Icon name="arrow_downward" size={18} className={s.arrow} />
              </span>
            </AppLink>
          ))}
        </nav>
      </Section>

      {/* Founders: the one dark band on the page. */}
      <Section id="founders" data-screen-label="Founders" tone="inverse">
        <div className={s.founders}>
          {FOUNDERS.map((p, i) => {
            const photo = teamPhoto(p.name);
            return (
              <article key={p.name} className={s.founder}>
                {photo ? (
                  <Portrait name={p.name} photo={photo} variant="glass" className={s.founderPhoto} />
                ) : (
                  <span
                    className={s.monogram}
                    style={{ '--tone': (i % 2 ? ORANGE : GREEN).accent } as CSSProperties}
                    aria-hidden="true"
                  >
                    {p.initials}
                  </span>
                )}
                <h2 className={`t-display-2 ${s.founderName}`}>{p.name}</h2>
                <p className={s.founderRole}>{p.role}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="board" data-screen-label="Board" pb="sm" gap="none">
        <GroupHead title="Board of directors" />
        <ul className={s.people}>
          {BOARD.map((p, i) => (
            <PersonRow key={p.name} person={p} index={i} />
          ))}
        </ul>
      </Section>

      <Section id="leadership" data-screen-label="Business leaders" pt="sm" gap="none">
        <GroupHead title="Business leadership" lead="The leaders responsible for each business in the group." />
        <ul className={s.people}>
          {DIVISION_LEADERS.map((p) => (
            <li key={p.name} className={`${s.person} ${s.personPlain}`}>
              <span className={s.personName}>{p.name}</span>
              <span className={s.personRole}>{p.role}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner title="Contact the leadership team" cta="Contact us" to={ROUTES.contact} pt="none" />
    </>
  );
}

function GroupHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <header className={s.groupHead}>
      <h2 className="t-h1">{title}</h2>
      {lead && <p className={s.groupLead}>{lead}</p>}
    </header>
  );
}

function PersonRow({ person: p, index }: { person: Person; index: number }) {
  const photo = teamPhoto(p.name);
  return (
    <li className={s.person}>
      <span className={s.personWho}>
        {photo ? (
          <Portrait name={p.name} photo={photo} tone={alternate(index)} className={s.personPhoto} />
        ) : (
          <Avatar name={p.name} tone={alternate(index)} />
        )}
        <span className={s.personName}>{p.name}</span>
      </span>
      <span className={s.personRole}>{p.role}</span>
    </li>
  );
}
