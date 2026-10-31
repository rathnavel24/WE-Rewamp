import { useSearchParams } from 'react-router-dom';
import { AppLink, Card, Icon, Section, SectionHeader } from '@/components/ui';
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
      'Contact WalletEdge Global — offices in Sharjah, UAE and Coimbatore, India. Send an enquiry and we will connect you with the relevant company in the group.'
  });
  const [params] = useSearchParams();
  const v = params.get('venture') ?? undefined;
  const venture = isVentureId(v) ? v : undefined;
  const t = params.get('topic');
  const topic = ENQUIRY_TOPICS.find((e) => e.label === t)?.label;
  // A venture implies its topic; ?topic= adds one directly.
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
          title="Get in touch"
          lead="Send us an enquiry and we will connect you with the relevant company in the group."
        />

        {/* Offices: a ruled directory, one block per office. */}
        <div className={s.offices}>
          {OFFICES.map((o) => (
            <address key={o.country} className={s.office}>
              <div className={s.officeHead}>
                <h2 className={s.country}>{o.country}</h2>
                {o.badge === 'HQ' && <span className={s.badge}>Head office</span>}
              </div>
              <p className={s.address}>
                {o.addressLines.map((line, i) => (
                  <span key={line} className={i === 0 ? s.addressFirst : undefined}>
                    {line}
                  </span>
                ))}
              </p>
              <dl className={s.lines}>
                <div className={s.line}>
                  <dt>Phone</dt>
                  <dd>
                    <a href={o.phone.href} className={s.link}>
                      {o.phone.label}
                    </a>
                  </dd>
                </div>
                <div className={s.line}>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${CONTACT_EMAIL}`} className={s.link}>
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </address>
          ))}
        </div>
      </div>

      <Card data-reveal="up" data-delay="150" variant="ink" padding="lg" className={`on-dark ${s.panel}`}>
        <EnquiryForm key={`${venture ?? 'general'}:${topic ?? ''}`} venture={venture} initialTopics={initialTopics} />
      </Card>
    </Section>
  );
}
