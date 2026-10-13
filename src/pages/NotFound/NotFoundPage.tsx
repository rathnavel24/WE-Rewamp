import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';

export function NotFoundPage() {
  useDocumentTitle('Page not found — WalletEdge Global');
  return (
    <section className="page-hero" style={{ paddingBottom: 140 }}>
      <div className="container page-hero__lead">
        <span className="eyebrow">404</span>
        <h1 className="display-1">This page isn’t part of the group.</h1>
        <p className="page-hero__copy">The link may be out of date. Head back home or explore our companies.</p>
        <AppLink
          to={ROUTES.home}
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '17px 24px',
            borderRadius: 16,
            background: '#0E1F17',
            color: '#fff',
            textDecoration: 'none',
            font: "500 16px/1 'Geist',sans-serif"
          }}
        >
          Back to home
          <Icon name="arrow_forward" size={20} />
        </AppLink>
      </div>
    </section>
  );
}
