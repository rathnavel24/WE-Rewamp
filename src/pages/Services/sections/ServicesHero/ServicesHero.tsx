import { Chip, Section, SectionHeader, Tile } from '@/components/ui';
import { SERVICE_PILLARS } from '@/content/services';
import s from './ServicesHero.module.css';

export function ServicesHero() {
  return (
    <Section data-screen-label="Services hero" pt="hero" pb="sm" gap="md">
      <SectionHeader
        as="h1"
        size="display-1"
        kicker="Our services"
        title="Five practices, run by specialists, backed by one group."
      />
      <nav aria-label="Practices" data-stagger="60" className={s.pillars}>
        {SERVICE_PILLARS.map((p) => (
          <Chip
            key={p.anchor}
            to={p.anchor}
            variant="surface"
            size="lg"
            leading={<Tile icon={p.icon} size="xs" tone={p.tone} round />}
          >
            {p.title}
          </Chip>
        ))}
      </nav>
    </Section>
  );
}
