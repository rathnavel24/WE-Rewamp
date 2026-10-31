import { CtaBanner } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/config/routes';
import { SERVICES, SERVICE_DETAILS } from '@/content/services';
import { ServiceDetail, ServicesHero } from './sections';

export function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description:
      'IT & BPO, financial services, consulting and healthcare services from WalletEdge Global and its group companies in the UAE and India.'
  });
  return (
    <>
      <ServicesHero />
      {SERVICES.map((x) => (
        <ServiceDetail key={x.id} service={x} detail={SERVICE_DETAILS[x.id]} />
      ))}
      <CtaBanner title="Discuss your requirements with our team" cta="Contact us" to={ROUTES.contact} />
    </>
  );
}
