import { usePageMeta } from '@/hooks/usePageMeta';
import { ContactCta, Hero, OurCompanies, ServicesSection, TeamPreview, TrustedBy } from './sections';

export function HomePage() {
  usePageMeta();
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <OurCompanies />
      <TeamPreview />
      <ContactCta />
    </>
  );
}
