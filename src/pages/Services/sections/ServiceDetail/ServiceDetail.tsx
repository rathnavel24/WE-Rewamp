import type { CSSProperties } from 'react';
import { AppLink, ArrowText, Button, Icon, Section } from '@/components/ui';
import { ventureLogo } from '@/content/assets';
import { companiesFor } from '@/content/companies';
import { cx } from '@/lib/cx';
import { CompaniesBehind } from '@/features/companies';
import type { Service, ServiceColumn, ServiceDetail as Detail } from '@/types';
import s from './ServiceDetail.module.css';

interface ServiceDetailProps {
  service: Service;
  detail: Detail;
}

/** One service in full: name and statement, its offerings as ruled columns, and the companies behind it. */
export function ServiceDetail({ service: x, detail: d }: ServiceDetailProps) {
  // Where the offerings already name their companies (healthcare), they aren't named twice.
  const companies = companiesFor(x.id).filter((c) => !d.columns.some((col) => col.meta?.startsWith(c.name)));
  // On the dark band the stylesheet sets a lighter --tone-ink; an inline value here would override it.
  const vars = { '--tone': x.tone.accent, ...(!d.dark && { '--tone-ink': x.tone.ink }) } as CSSProperties;
  return (
    <Section
      id={x.id}
      data-screen-label={x.short}
      tone={d.dark ? 'inverse' : 'canvas'}
      pt={d.dark ? 'md' : 'sm'}
      pb={d.dark ? 'md' : 'sm'}
    >
      <div className={cx(s.wrap, d.dark && s.dark)} style={vars}>
        <header className={s.head}>
          <div className={s.name}>
            <h2 className="t-display-2">{x.title}</h2>
          </div>
          <div className={s.intro}>
            <p className={s.heading}>{d.heading}</p>
            <p className={s.summary}>{x.summary}</p>
            {d.clients && (
              <p className={s.clients}>
                <span className={s.clientsLabel}>Clients include</span>
                {d.clients.map((c) => (
                  <span key={c} className={s.client}>
                    {c}
                  </span>
                ))}
              </p>
            )}
          </div>
        </header>

        <div className={s.columns}>
          {d.columns.map((col) => (
            <Column key={col.title} column={col} />
          ))}
        </div>

        <CompaniesBehind companies={companies} service={x.title} />
      </div>
    </Section>
  );
}

function Column({ column: c }: { column: ServiceColumn }) {
  return (
    <article className={s.column}>
      {c.venture && ventureLogo(c.venture) && (
        <span className={s.colLogo}>
          <img src={ventureLogo(c.venture)} alt="" />
        </span>
      )}
      <h3 className={s.colTitle}>
        {c.href ? (
          <AppLink to={c.href} className={s.colLink}>
            <ArrowText text={c.title} size={22} iconClassName={s.arrow} />
          </AppLink>
        ) : (
          c.title
        )}
      </h3>
      {c.meta && <span className={s.meta}>{c.meta}</span>}
      {c.desc && <p className={s.desc}>{c.desc}</p>}
      {c.stats && c.stats.length > 0 && (
        <dl className={s.stats}>
          {c.stats.map((st) => (
            <div key={st.label} className={s.stat}>
              <dt className={s.statLabel}>{st.label}</dt>
              <dd className={s.statValue}>
                {st.prefix}
                {st.n.toLocaleString('en')}
                {st.suffix}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {c.points && (
        <ul className={s.points}>
          {c.points.map((p) => (
            <li key={p} className={s.point}>
              <Icon name="check" size={18} className={s.check} />
              {p}
            </li>
          ))}
        </ul>
      )}
      {c.site && (
        <Button to={c.site.href} target="_blank" variant="link" icon="open_in_new" className={s.download}>
          Visit {c.site.label}
        </Button>
      )}
      {c.download && (
        <Button to={c.download.href} download variant="link" icon="download" className={s.download}>
          {c.download.label}
        </Button>
      )}
    </article>
  );
}
