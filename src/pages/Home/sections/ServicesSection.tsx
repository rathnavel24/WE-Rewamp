import type { CSSProperties } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { ROUTES } from '@/data/routes';
import { SERVICE_CARDS } from '@/data/services';
import s from './ServicesSection.module.css';

export function ServicesSection() {
  return (
    <section data-screen-label="Services" className={s.section}>
      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <div className={s.headCopy}>
            <span data-reveal="fade" className="eyebrow">
              01 — Our services
            </span>
            <h2 data-reveal="up" className="display-2">
              Five practices. One accountable group.
            </h2>
          </div>
          <AppLink data-reveal="fade" to={ROUTES.services} className={s.allLink}>
            All services
            <Icon name="arrow_outward" size={18} />
          </AppLink>
        </div>

        <div data-stagger="90" className={s.grid}>
          {SERVICE_CARDS.map((c) => (
            <AppLink key={c.no} to={c.href} data-spot="1" className={s.card} style={{ '--glow': c.tone.glow } as CSSProperties}>
              <div className={s.cardTop}>
                <Tile icon={c.icon} size={54} radius={16} iconSize={28} bg={c.tone.soft} ink={c.tone.ink} />
                <span className={s.no}>{c.no}</span>
              </div>
              <div className={s.body}>
                <h3 className={s.title}>{c.title}</h3>
                <p className={s.desc}>{c.desc}</p>
              </div>
              <div className={s.tags}>
                {c.tags.map((t) => (
                  <span key={t} className={s.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </AppLink>
          ))}

          <AppLink to={ROUTES.contact} className={s.partner}>
            <Icon name="handshake" size={36} />
            <div className={s.partnerBody}>
              <h3 className={s.partnerTitle}>Need a partner across more than one of these?</h3>
              <span className={s.partnerLink}>
                Talk to the group
                <Icon name="arrow_forward" size={18} />
              </span>
            </div>
          </AppLink>
        </div>
      </div>
    </section>
  );
}
