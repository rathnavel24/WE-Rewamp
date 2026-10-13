import { CtaBanner } from '@/components/ui/CtaBanner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';
import { BOARD, DIVISION_LEADERS, FOUNDERS } from '@/data/team';
import { alternate } from '@/data/tones';
import type { Person } from '@/types';
import { initials } from '@/utils/initials';
import s from './TeamPage.module.css';

/** Colours alternate across both groups continuously, as in the design. */
const GROUPS: Array<{ title: string; people: Array<Person & { index: number }> }> = (() => {
  let k = 0;
  const tag = (list: Person[]) => list.map((p) => ({ ...p, index: k++ }));
  return [
    { title: 'Board of directors', people: tag(BOARD) },
    { title: 'Company & division leadership', people: tag(DIVISION_LEADERS) }
  ];
})();

export function TeamPage() {
  useDocumentTitle('Our Team — WalletEdge Global');
  return (
    <>
      <section data-screen-label="Team hero" className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__lead">
            <span data-reveal="fade" className="eyebrow">
              Our team
            </span>
            <h1 data-reveal="up" className="display-1">
              The people behind the group.
            </h1>
          </div>
          <p data-reveal="up" data-delay="100" className="page-hero__copy">
            Founders and a board who set direction, with dedicated leaders running healthcare, recovery, real estate and technology every
            day.
          </p>
        </div>
      </section>

      <section data-screen-label="Founders" className={s.foundersSection}>
        <div data-stagger="120" className={`container ${s.founders}`}>
          {FOUNDERS.map((p) => (
            <div key={p.name} className={s.founder} style={{ background: p.background }}>
              <div className={s.founderGlow} />
              <div className={s.founderTop}>
                <span className={s.founderAvatar}>{p.initials}</span>
                <span className={s.founderBadge}>Founder</span>
              </div>
              <div className={s.founderText}>
                <span className={s.founderName}>{p.name}</span>
                <span className={s.founderRole}>{p.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className={s.groupSection}>
          <div className={`container ${s.groupInner}`}>
            <div data-reveal="fade" className={s.groupHead}>
              <span className={s.groupTitle}>{g.title}</span>
              <span className={s.groupRule} />
              <span className={s.groupCount}>{String(g.people.length).padStart(2, '0')}</span>
            </div>
            <div data-stagger="60" className={s.people}>
              {g.people.map((p) => {
                const tone = alternate(p.index);
                return (
                  <div key={p.name} className={s.person}>
                    <span className={s.avatar} style={{ background: tone.soft, color: tone.ink }}>
                      {initials(p.name)}
                    </span>
                    <span className={s.personText}>
                      <span className={s.personName}>{p.name}</span>
                      <span className={s.personRole}>{p.role}</span>
                      {p.unit && (
                        <span className={s.unit} style={{ color: tone.ink }}>
                          {p.unit}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <CtaBanner
        title="Want to speak with someone on the leadership team?"
        cta="Book a meeting"
        to={ROUTES.contact}
        sectionStyle={{ padding: '60px 24px 110px' }}
      />
    </>
  );
}
