import { Button, Section } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { CONTACT_EMAIL } from '@/content/site';
import s from './ContactCta.module.css';

export function ContactCta() {
  return (
    <Section data-screen-label="Contact CTA" pt="none">
      <div data-reveal="scale" className={`on-dark ${s.panel}`}>
        <div className={s.glow} aria-hidden="true" />
        <div className={s.layout}>
          <div className={s.copy}>
            <h2 className="t-display-2">Let’s build your next edge together.</h2>
            <p className="t-lead">Offices in Sharjah and Coimbatore. One conversation reaches the whole group.</p>
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
