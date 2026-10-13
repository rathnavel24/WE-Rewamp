import { Button, Section, SectionHeader } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';

export function NotFoundPage() {
  useDocumentTitle('Page not found — WalletEdge Global');
  return (
    <Section pt="hero">
      <SectionHeader
        as="h1"
        size="display-1"
        kicker="404"
        title="This page isn’t part of the group."
        lead="The link may be out of date. Head back home or explore our companies."
        reveal={false}
        action={
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <Button to={ROUTES.home} size="lg" icon="arrow_forward">
              Back to home
            </Button>
            <Button to={ROUTES.companies} variant="secondary" size="lg">
              Our companies
            </Button>
          </div>
        }
      />
    </Section>
  );
}
