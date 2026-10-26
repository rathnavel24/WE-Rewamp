import { CtaBanner } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { ConsultingPractice, FinancialRealEstate, HealthcarePractice, ItBpoPractice, ServicesHero } from './sections';

export function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description:
      'Five practices backed by one group: IT & BPO, financial services, real estate, consulting and healthcare.'
  });
  return (
    <>
      <ServicesHero />
      <ItBpoPractice />
      <FinancialRealEstate />
      <ConsultingPractice />
      <HealthcarePractice />
      <CtaBanner
        title="Not sure which practice fits? We’ll route you to the right team."
        cta="Contact us"
        to={ROUTES.contact}
      />
    </>
  );
}
