import { Button, Section, SectionHeader } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';

export function NotFoundPage() {
  usePageMeta({ title: 'Page not found' });
  return (
    <Section pt="hero">
      <SectionHeader
        as="h1"
        size="display-1"
        kicker="404"
        title="Page not found"
        lead="The page you are looking for may have moved. Return to the home page or view our services."
        reveal={false}
        action={
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <Button to={ROUTES.home} size="lg" icon="arrow_forward">
              Back to home
            </Button>
            <Button to={ROUTES.services} variant="secondary" size="lg">
              Our services
            </Button>
          </div>
        }
      />
    </Section>
  );
}
