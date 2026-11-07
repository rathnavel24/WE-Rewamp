import { Card, CtaBanner, Portrait, Section, SectionHeader, Swipe } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { teamPhoto } from '@/content/assets';
import { TEAM } from '@/content/team';
import s from './TeamPage.module.css';

export function TeamPage() {
  usePageMeta({
    title: 'Our Team',
    description: 'The founders, board of directors and business leaders of WalletEdge Global and its group companies.'
  });
  return (
    <>
      <Section data-screen-label="Team hero" pt="hero" pb="sm">
        <SectionHeader
          as="h1"
          size="display-1"
          layout="split"
          kicker="Our team"
          title="Leadership and management"
          lead="The founders, board and business leaders responsible for the companies of WalletEdge Global."
        />
      </Section>

      <Section data-screen-label="Team" pt="none">
        <Swipe label="Our team" view={4} peek={78} data-stagger="60">
          {TEAM.map((p) => (
            <Card key={p.name} as="article" variant="inverse" padding="sm" interactive className={s.person}>
              <Portrait name={p.name} photo={teamPhoto(p.name)} variant="glass" className={s.photo} />
              <span className={s.text}>
                <span className={`t-h4 ${s.name}`}>{p.name}</span>
                <span className={`t-small ${s.role}`}>{p.role}</span>
              </span>
            </Card>
          ))}
        </Swipe>
      </Section>

      <CtaBanner title="Contact the leadership team" cta="Contact us" to={ROUTES.contact} pt="none" />
    </>
  );
}
