import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/data/routes';
import { CONTACT_EMAIL } from '@/data/site';
import s from './ContactCta.module.css';

export function ContactCta() {
  return (
    <section data-screen-label="Contact CTA" className={s.section}>
      <div data-reveal="scale" className={s.panel}>
        <div className={s.glow} />
        <div className={s.layout}>
          <div className={s.copy}>
            <h2 className={s.title}>Let’s build your next edge together.</h2>
            <p className={s.lead}>Offices in Sharjah and Coimbatore. One conversation reaches the whole group.</p>
          </div>
          <div className={s.actions}>
            <AppLink to={ROUTES.contact} className={s.primary}>
              Start a conversation
              <Icon name="arrow_forward" size={22} color="#CF5512" />
            </AppLink>
            <a href={`mailto:${CONTACT_EMAIL}`} className={s.secondary}>
              {CONTACT_EMAIL}
              <Icon name="mail" size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
