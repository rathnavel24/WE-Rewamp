import { Button, Chip, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { CONTACT_EMAIL, ENQUIRY_TOPICS } from '@/content/site';
import { GREEN } from '@/content/tones';
import type { VentureId } from '@/types';
import { useEnquiryForm } from './useEnquiryForm';
import s from './EnquiryForm.module.css';

interface EnquiryFormProps {
  /** Topics ticked on first render (e.g. when arriving from a venture page). */
  initialTopics?: string[];
  venture?: VentureId;
}

/** Contact form for dark panels. Logic lives in useEnquiryForm; this is layout only. */
export function EnquiryForm({ initialTopics, venture }: EnquiryFormProps) {
  const { status, error, topics, toggleTopic, name, setName, onSubmit, reset } = useEnquiryForm({
    initialTopics,
    venture
  });

  if (status === 'sent') {
    return (
      <div className={s.sent} role="status">
        <Tile icon="check" size="xl" tone={GREEN} solid />
        <span className="t-h1">Thank you, {name.trim().split(' ')[0] || 'there'}.</span>
        <p className={`t-body-lg ${s.sentText}`}>
          Your message is with the WalletEdge Global team. We’ll reply within one business day.
        </p>
        <div className={s.sentActions}>
          <Button to={ROUTES.services} variant="inverse" icon="arrow_forward">
            Explore our services
          </Button>
          <Button variant="outline-dark" onClick={reset}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <header className={s.head}>
        <h2 className="t-h2">Send an enquiry</h2>
        <p className={s.sub}>We’ll connect you with the right company in the group.</p>
      </header>

      <fieldset className={s.fieldset}>
        <legend className={`t-label ${s.legend}`}>I’m interested in</legend>
        <div className={s.topics}>
          {ENQUIRY_TOPICS.map((t) => {
            const on = topics.includes(t.label);
            return (
              <Chip
                key={t.label}
                variant="outline-dark"
                icon={on ? 'check' : t.icon}
                selected={on}
                onToggle={() => toggleTopic(t.label)}
                className={s.topic}
              >
                {t.label}
              </Chip>
            );
          })}
        </div>
      </fieldset>

      <div className={s.fields}>
        <Field name="name" label="Full name" required autoComplete="name" value={name} onChange={setName} />
        <Field name="company" label="Company" autoComplete="organization" />
        <Field name="email" type="email" label="Work email" required autoComplete="email" />
        <Field name="phone" type="tel" label="Phone" autoComplete="tel" />
        <label className={`${s.field} ${s.wide}`}>
          <span className={s.label}>Message</span>
          <textarea className={s.textarea} name="message" rows={3} placeholder="How can we help?" />
        </label>
      </div>

      {status === 'error' && (
        <p className={s.error} role="alert">
          {error} You can also email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <div className={s.footer}>
        <Button
          type="submit"
          variant="accent"
          icon="arrow_forward"
          disabled={status === 'sending'}
          className={s.submit}
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className={s.alt}>
          or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (v: string) => void;
}

/** Boxed field: a small label sits inside the box, above the input. */
function Field({ name, label, type = 'text', required, autoComplete, value, onChange }: FieldProps) {
  return (
    <label className={s.field}>
      <span className={s.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      <input
        className={s.input}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : {})}
      />
    </label>
  );
}
