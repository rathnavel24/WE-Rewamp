import { Button, Section } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { PHOTOS } from '@/content/assets';
import { CONTACT_EMAIL } from '@/content/site';
import s from './ContactCta.module.css';

export function ContactCta() {
  return (
    <Section data-screen-label="Contact CTA" pt="none">
      <div data-reveal="scale" className={`on-dark ${s.panel}`}>
        <img src={PHOTOS.glassTowers} alt="" aria-hidden="true" loading="lazy" decoding="async" className={s.photo} />
        <div className={s.glow} aria-hidden="true" />
        <div className={s.layout}>
          <div className={s.copy}>
            <h2 className="t-display-2">Connect with WalletEdge Global</h2>
            <p className="t-lead">
              Speak with our teams in Dubai and Coimbatore about any of our services or group companies.
            </p>
          </div>
          <div className={s.actions}>
            <Button to={ROUTES.contact} variant="inverse" size="lg" icon="arrow_forward" block>
              Start a conversation
            </Button>
            <Button
              to={`mailto:${CONTACT_EMAIL}`}
              variant="outline-dark"
              size="lg"
              icon="mail"
              block
              className={s.mail}
            >
              {CONTACT_EMAIL}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
