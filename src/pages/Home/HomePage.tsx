import { usePageMeta } from '@/hooks/usePageMeta';
import { CompaniesSection, ContactCta, Flagships, Hero, ServicesSection, TeamPreview, TrustedBy } from './sections';

export function HomePage() {
  usePageMeta();
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
