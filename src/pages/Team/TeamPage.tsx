import { CtaBanner, Section, SectionHeader, Swipe } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { TEAM } from '@/content/team';
import { PersonCard } from '@/features/team';

export function TeamPage() {
  usePageMeta({
    title: 'Our Team',
    description: 'The founders, board of directors and business leaders of WalletEdge Global and its group companies.'
  });
  return (
    <>
      <Section data-screen-label="Team hero" pt="hero" pb="sm">
        <SectionHeader as="h1" size="display-1" kicker="Our team" title="Leadership Team" />
      </Section>

      <Section data-screen-label="Team" pt="none">
        <Swipe label="Our team" view={4} peek={78} data-stagger="60">
          {TEAM.map((p) => (
            <PersonCard key={p.name} person={p} as="h2" />
          ))}
        </Swipe>
      </Section>

      <CtaBanner title="Contact the leadership team" cta="Contact us" to={ROUTES.contact} pt="none" />
    </>
  );
}
