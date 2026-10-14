import { useSearchParams } from 'react-router-dom';
import { Button, Card, Chip, Section, SectionHeader, Tile } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { CONTACT_EMAIL, OFFICES, VENTURE_ENQUIRY_TOPIC } from '@/content/site';
import { isVentureId } from '@/content/ventures';
import { EnquiryForm } from '@/features/enquiry';
import s from './ContactPage.module.css';

export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Contact WalletEdge Global — offices in Sharjah, UAE and Coimbatore, India. Send an enquiry and we’ll connect you with the right company in the group.'
  });
  const [params] = useSearchParams();
  const v = params.get('venture') ?? undefined;
  const venture = isVentureId(v) ? v : undefined;

  return (
    <Section data-screen-label="Contact" pt="hero" innerClassName={s.layout} gap="none">
      <div className={s.intro}>
        <SectionHeader
          as="h1"
          size="display-1"
          kicker="Contact W.E. Global"
          title="Let’s talk about what you’re building."
          lead="Tell us what you need and we’ll connect you with the right company in the group."
        />

        <div data-stagger="100" className={s.offices}>
          {OFFICES.map((o) => (
            <Card key={o.country} as="article" padding="md">
              <div className={s.officeHead}>
                <span className={s.officeName}>
                  <Tile icon={o.icon} size="sm" tone={o.tone} />
                  <h2 className="t-h4">{o.country}</h2>
                </span>
                <Chip size="sm" mono>
                  {o.badge}
                </Chip>
              </div>
              <address className={s.address}>
                {o.addressLines[0]}
                <br />
                {o.addressLines[1]}
              </address>
              <div className={s.officeLinks}>
                <Button to={o.phone.href} variant="secondary" size="sm" iconStart="call">
                  {o.phone.label}
                </Button>
                <Button to={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="sm" iconStart="mail">
                  {CONTACT_EMAIL}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card data-reveal="up" data-delay="150" variant="ink" padding="lg" className={`on-dark ${s.panel}`}>
        <div className={s.panelGlow} aria-hidden="true" />
        <EnquiryForm
          key={venture ?? 'general'}
          venture={venture}
          initialTopics={venture ? [VENTURE_ENQUIRY_TOPIC[venture]] : []}
        />
      </Card>
    </Section>
  );
}
