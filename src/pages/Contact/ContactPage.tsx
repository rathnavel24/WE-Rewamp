import { useSearchParams } from 'react-router-dom';
import { Button, Card, Chip, Section, SectionHeader, Tile } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { CONTACT_EMAIL, OFFICES } from '@/data/site';
import { isVentureId } from '@/data/ventures';
import type { VentureId } from '@/types';
import { EnquiryForm } from './EnquiryForm';
import s from './ContactPage.module.css';

/** Topic pre-selected when arriving from a venture's "Enquire about…" button. */
const VENTURE_TOPIC: Record<VentureId, string> = {
  insureliv: 'IT & BPO',
  arogyaplus: 'Healthcare',
  carehub: 'Healthcare',
  globalcure: 'Healthcare',
  recovery: 'Financial services'
};

export function ContactPage() {
  useDocumentTitle('Contact — WalletEdge Global');
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
        <EnquiryForm key={venture ?? 'general'} venture={venture} initialTopics={venture ? [VENTURE_TOPIC[venture]] : []} />
      </Card>
    </Section>
  );
}
