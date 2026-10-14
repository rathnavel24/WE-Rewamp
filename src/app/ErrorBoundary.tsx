import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Section, SectionHeader } from '@/components/ui';
import { ROUTES } from '@/config/routes';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches a crash inside one page so the nav and footer keep working.
 * Keyed by path in <PageShell>, so navigating away clears the error.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Single place to forward errors to a monitoring service (Sentry etc.) later.
    console.error('[page error]', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Section pt="hero">
        <SectionHeader
          as="h1"
          size="display-2"
          kicker="Something went wrong"
          title="This page didn’t load properly."
          lead="Please try again. If it keeps happening, contact us and we’ll look into it."
          reveal={false}
          action={
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button onClick={() => window.location.reload()} size="lg" icon="refresh">
                Reload the page
              </Button>
              <Button to={ROUTES.home} variant="secondary" size="lg">
                Back to home
              </Button>
            </div>
          }
        />
      </Section>
    );
  }
}
