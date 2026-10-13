import { useSearchParams } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
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
    <section data-screen-label="Contact" className={s.section}>
      <div className={`container ${s.layout}`}>
        <div className={s.intro}>
          <span data-reveal="fade" className="eyebrow">
            Contact W.E. Global
          </span>
          <h1 data-reveal="up" className={s.title}>
            Let’s talk about what you’re building.
          </h1>
          <p data-reveal="up" data-delay="80" className={s.lead}>
            Tell us what you need and we’ll connect you with the right company in the group.
          </p>

          <div data-stagger="100" className={s.offices}>
            {OFFICES.map((o) => (
              <div key={o.country} className={s.office}>
                <div className={s.officeHead}>
                  <span className={s.officeName}>
                    <Tile icon={o.icon} size={40} radius={12} iconSize={21} bg={o.tone.soft} ink={o.tone.ink} />
                    {o.country}
                  </span>
                  <span className={s.officeBadge}>{o.badge}</span>
                </div>
                <span className={s.address}>
                  {o.addressLines[0]}
                  <br />
                  {o.addressLines[1]}
                </span>
                <div className={s.officeLinks}>
                  <a href={o.phone.href} className={s.officeLink}>
                    <Icon name="call" size={17} />
                    {o.phone.label}
                  </a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={s.officeLink}>
                    <Icon name="mail" size={17} />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal="up" data-delay="150" className={s.panel}>
          <div className={s.panelGlow} />
          <EnquiryForm key={venture ?? 'general'} venture={venture} initialTopics={venture ? [VENTURE_TOPIC[venture]] : []} />
        </div>
      </div>
    </section>
  );
}
