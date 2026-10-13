import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/data/routes';
import { HOME_LEADERS, LEADER_COUNT } from '@/data/team';
import { alternate } from '@/data/tones';
import { initials } from '@/utils/initials';
import s from './TeamPreview.module.css';

export function TeamPreview() {
  return (
    <section data-screen-label="Team" className={s.section}>
      <div className={`container ${s.layout}`}>
        <div className={s.copy}>
          <span data-reveal="fade" className="eyebrow">
            04 — Our team
          </span>
          <h2 data-reveal="up" className="display-2">
            Founder-led, with operators in every business.
          </h2>
          <p data-reveal="up" className={s.lead}>
            A board that sets direction for the group, and dedicated leaders running each company day to day.
          </p>
          <AppLink data-reveal="up" to={ROUTES.team} className={s.cta}>
            Meet all {LEADER_COUNT} leaders
            <Icon name="arrow_forward" size={19} />
          </AppLink>
        </div>

        <div data-stagger="80" className={s.grid}>
          {HOME_LEADERS.map((p, i) => {
            const tone = alternate(i);
            return (
              <div key={p.name} className={s.card}>
                <span className={s.avatar} style={{ background: tone.soft, color: tone.ink }}>
                  {initials(p.name)}
                </span>
                <span className={s.text}>
                  <span className={s.name}>{p.name}</span>
                  <span className={s.role}>{p.role}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
