import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { CompaniesSection } from './sections/CompaniesSection';
import { ContactCta } from './sections/ContactCta';
import { Flagships } from './sections/Flagships';
import { Hero } from './sections/Hero';
import { ServicesSection } from './sections/ServicesSection';
import { TeamPreview } from './sections/TeamPreview';
import { TrustedBy } from './sections/TrustedBy';

export function HomePage() {
  useDocumentTitle('WalletEdge Global — Parent Group');
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <CompaniesSection />
      <Flagships />
      <TeamPreview />
      <ContactCta />
    </>
  );
}
