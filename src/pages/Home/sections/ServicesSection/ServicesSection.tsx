import type { CSSProperties } from 'react';
import { AppLink, ArrowText, Button, Icon, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { SERVICES, serviceHref } from '@/content/services';
import type { Service, ServiceOffering } from '@/types';
import s from './ServicesSection.module.css';

const toneVars = (x: Service) =>
  ({ '--tone': x.tone.accent, '--tone-ink': x.tone.ink, '--tone-soft': x.tone.soft }) as CSSProperties;

/** The four services: one ruled row each, the service on the left and what it offers on the right. */
export function ServicesSection() {
  return (
    <Section data-screen-label="Services">
      <SectionHeader
        kicker="Our services"
        title="A portfolio of services across four sectors"
        layout="split"
        lead="WalletEdge Global brings together IT & BPO, financial services, consulting and healthcare, delivered through its group companies in the UAE and India."
        action={
          <Button to={ROUTES.services} variant="link" icon="arrow_outward">
            All services
          </Button>
        }
      />

      <ol className={s.rows}>
        {SERVICES.map((x) => (
          <ServiceRow key={x.id} service={x} />
        ))}
      </ol>
    </Section>
  );
}

function ServiceRow({ service: x }: { service: Service }) {
  return (
    <li className={s.row} style={toneVars(x)}>
      <div className={s.intro}>
        <h3 className={`t-h1 ${s.title}`}>{x.title}</h3>
        <p className={s.summary}>{x.summary}</p>
        <Button to={serviceHref(x.id)} variant="link" icon="arrow_forward" className={s.explore}>
          Explore {x.short}
        </Button>
      </div>

      <div className={s.detail}>
        <ul className={s.offers}>
          {x.offerings.map((o) => (
            <li key={o.title}>
              <Offer offering={o} />
              {o.download && (
                <Button to={o.download.href} download variant="link" icon="download" className={s.download}>
                  {o.download.label}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Offer({ offering: o }: { offering: ServiceOffering }) {
  const body = (
    <>
      <span className={s.offerMain}>
        <span className={s.offerTitle}>
          {o.href ? <ArrowText text={o.title} size={20} iconClassName={s.offerArrow} /> : o.title}
        </span>
        {o.meta && <span className={s.offerMeta}>{o.meta}</span>}
        {o.desc && <span className={s.offerDesc}>{o.desc}</span>}
        {o.items && (
          <span className={s.items}>
            {o.items.map((item) => (
              <span key={item} className={s.item}>
                <Icon name="check" size={16} className={s.check} />
                {item}
              </span>
            ))}
          </span>
        )}
      </span>
      {o.stat && (
        <span className={s.stat}>
          <span className={s.statValue}>{o.stat.value}</span>
          <span className={s.statLabel}>{o.stat.label}</span>
        </span>
      )}
    </>
  );
  return o.href ? (
    <AppLink to={o.href} className={`${s.offer} ${s.offerLink}`}>
      {body}
    </AppLink>
  ) : (
    <div className={s.offer}>{body}</div>
  );
}
