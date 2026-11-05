import type { CSSProperties } from 'react';
import { AppLink, Icon, Section, SectionHeader } from '@/components/ui';
import { PARENT_COMPANIES } from '@/content/companies';
import { SERVICES } from '@/content/services';
import { DeliveredBy } from '@/features/companies';
import s from './ServicesHero.module.css';

export function ServicesHero() {
  return (
    <Section data-screen-label="Services hero" pt="hero" pb="sm" gap="md">
      <SectionHeader
        as="h1"
        size="display-1"
        layout="split"
        kicker="Our services"
        title="Our services and the companies that deliver them"
        lead="WalletEdge Global operates across four sectors. Each section below sets out what we offer and the group companies responsible for delivering it."
      />
      {/* Contents: the four services as a ruled strip, each linking to its section. */}
      <nav aria-label="Services on this page" data-stagger="70" className={s.contents}>
        {SERVICES.map((x) => (
          <AppLink key={x.id} to={`#${x.id}`} className={s.entry} style={{ '--tone': x.tone.accent } as CSSProperties}>
            <span className={s.name}>
              {x.title}
              <Icon name="arrow_downward" size={18} className={s.arrow} />
            </span>
            <span className={s.covers}>{x.tags.join(', ')}</span>
          </AppLink>
        ))}
      </nav>
      <DeliveredBy companies={PARENT_COMPANIES} label="Parent companies" />
    </Section>
  );
}
