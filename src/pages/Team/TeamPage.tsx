import type { CSSProperties } from 'react';
import { AppLink, Avatar, CtaBanner, Icon, Portrait, Section, SectionHeader } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { teamPhoto, ventureLogo } from '@/content/assets';
import { BOARD, DIVISION_LEADERS, FOUNDERS } from '@/content/team';
import { alternate, GREEN, ORANGE } from '@/content/tones';
import { VENTURES } from '@/content/ventures';
import type { Person, VentureId } from '@/types';
import s from './TeamPage.module.css';

/** Business leaders grouped by the business they lead, in the content document's order. */
const BUSINESSES = DIVISION_LEADERS.reduce<Array<{ venture: VentureId; unit: string; people: Person[] }>>(
  (groups, p) => {
    if (!p.venture) return groups;
    const group = groups.find((g) => g.venture === p.venture);
    if (group) group.people.push(p);
    else groups.push({ venture: p.venture, unit: p.unit ?? VENTURES[p.venture].name, people: [p] });
    return groups;
  },
  []
);

const SECTIONS = [
  { id: 'founders', label: 'Founders', count: FOUNDERS.length },
  { id: 'board', label: 'Board of directors', count: BOARD.length },
  { id: 'leadership', label: 'Business leaders', count: DIVISION_LEADERS.length }
];

const pad = (n: number) => String(n).padStart(2, '0');

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
              <span className={s.count}>{pad(x.count)}</span>
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
                <span className={s.founderLabel}>Founder</span>
                <h2 className={`t-display-2 ${s.founderName}`}>{p.name}</h2>
                <p className={s.founderRole}>{p.role}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="board" data-screen-label="Board" pb="sm" gap="none">
        <GroupHead title="Board of directors" count={BOARD.length} />
        <ul className={s.people}>
          {BOARD.map((p, i) => (
            <PersonRow key={p.name} person={p} index={i} />
          ))}
        </ul>
      </Section>

      <Section id="leadership" data-screen-label="Business leaders" pt="sm" gap="none">
        <GroupHead
          title="Business leadership"
          count={DIVISION_LEADERS.length}
          lead="The leaders responsible for each business in the group."
        />
        <div className={s.businesses}>
          {BUSINESSES.map((b, bi) => {
            const logo = ventureLogo(b.venture);
            return (
              <section key={b.venture} className={s.business} aria-label={b.unit}>
                <AppLink to={ROUTES.venture(b.venture)} className={s.businessName}>
                  <span className={s.logo}>
                    {logo ? (
                      <img src={logo} alt="" />
                    ) : (
                      <Icon name={VENTURES[b.venture].icon} size={24} className={s.logoIcon} />
                    )}
                  </span>
                  <span className={s.unit}>
                    {b.unit}
                    <Icon name="arrow_outward" size={16} className={s.arrow} />
                  </span>
                </AppLink>
                <ul className={s.people}>
                  {b.people.map((p, i) => (
                    <PersonRow key={p.name} person={p} index={bi + i} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>

      <CtaBanner title="Contact the leadership team" cta="Contact us" to={ROUTES.contact} pt="none" />
    </>
  );
}

function GroupHead({ title, count, lead }: { title: string; count: number; lead?: string }) {
  return (
    <header className={s.groupHead}>
      <h2 className="t-h1">{title}</h2>
      {lead && <p className={s.groupLead}>{lead}</p>}
      <span className={s.groupCount}>{pad(count)}</span>
    </header>
  );
}

function PersonRow({ person: p, index }: { person: Person; index: number }) {
  const photo = teamPhoto(p.name);
  return (
    <li className={s.person}>
      {photo ? (
        <Portrait name={p.name} photo={photo} tone={alternate(index)} className={s.personPhoto} />
      ) : (
        <Avatar name={p.name} tone={alternate(index)} />
      )}
      <span className={s.personName}>{p.name}</span>
      <span className={s.personRole}>{p.role}</span>
    </li>
  );
}
