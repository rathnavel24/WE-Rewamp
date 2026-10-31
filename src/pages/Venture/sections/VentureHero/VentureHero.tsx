import { AppLink, Button, Chip, Icon, Section, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { ventureLogo } from '@/content/assets';
import { SERVICES, serviceHref } from '@/content/services';
import type { Venture } from '@/types';
import s from './VentureHero.module.css';

export function VentureHero({ v }: { v: Venture }) {
  return (
    <Section data-screen-label="Venture hero" pt="hero" pb="sm" gap="md">
      <nav data-reveal="fade" aria-label="Breadcrumb" className={s.crumbs}>
        <AppLink to={serviceHref(v.service)} className={s.back}>
          <Icon name="arrow_back" size={17} />
          {SERVICES.find((x) => x.id === v.service)!.title}
        </AppLink>
        <span className={s.sep} aria-hidden="true">
          /
        </span>
        <span aria-current="page" className={s.current}>
          {v.name}
        </span>
      </nav>

      <div className={s.heroGrid}>
        <div className={s.heroLead}>
          <span data-reveal="up" className={s.identity}>
            {ventureLogo(v.id) ? (
              <span className={s.logo}>
                <img src={ventureLogo(v.id)} alt={`${v.name} logo`} />
              </span>
            ) : (
              <Tile icon={v.icon} size="xl" tone={v.tone} solid />
            )}
            <Chip variant="surface" mono>
              {v.sector}
            </Chip>
          </span>
          <h1 data-reveal="up" data-delay="60" className="t-display-1">
            {v.name}
          </h1>
          <p data-reveal="up" data-delay="120" className={s.tagline}>
            {v.tagline}
          </p>
        </div>
        <div data-reveal="up" data-delay="180" className={s.aboutCol}>
          <p className="t-body-lg">{v.about}</p>
          <div className={s.actions}>
            <Button to={ROUTES.enquire({ venture: v.id })} icon="arrow_forward" className={s.enquire}>
              Enquire about {v.name}
            </Button>
            {v.site && (
              <Button
                to={v.site.href}
                target={v.site.href.startsWith('http') ? '_blank' : undefined}
                variant="secondary"
                icon="open_in_new"
              >
                {v.site.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
