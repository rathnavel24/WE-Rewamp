import { useSearchParams } from 'react-router-dom';
import { AppLink, Button, Card, Chip, Icon, Section, SectionHeader, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { usePageMeta } from '@/hooks/usePageMeta';
import { CONTACT_EMAIL, ENQUIRY_TOPICS, OFFICES } from '@/content/site';
import { isVentureId, VENTURES } from '@/content/ventures';
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
  const t = params.get('topic');
  const topic = ENQUIRY_TOPICS.find((e) => e.label === t)?.label;
  // A venture implies its topic; ?topic= adds one directly (e.g. from a Services practice).
  const initialTopics = [
    ...new Set([venture && VENTURES[venture].enquiryTopic, topic].filter((x): x is string => !!x))
  ];

  return (
    <Section data-screen-label="Contact" pt="hero" innerClassName={s.layout} gap="none">
      <div className={s.intro}>
        {venture && (
          <AppLink data-reveal="fade" to={ROUTES.venture(venture)} className={s.back}>
            <Icon name="arrow_back" size={17} />
            Back to {VENTURES[venture].name}
          </AppLink>
        )}
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
        <EnquiryForm key={`${venture ?? 'general'}:${topic ?? ''}`} venture={venture} initialTopics={initialTopics} />
      </Card>
    </Section>
  );
}
