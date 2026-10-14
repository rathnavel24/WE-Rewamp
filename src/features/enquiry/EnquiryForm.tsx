import { Button, Chip, Tile } from '@/components/ui';
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
        <Button variant="outline-dark" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <h2 className="t-h2">Send an enquiry</h2>

      <fieldset className={s.fieldset}>
        <legend className={`t-label ${s.legend}`}>I’m interested in</legend>
        <div className={s.topics}>
          {ENQUIRY_TOPICS.map((t) => {
            const on = topics.includes(t.label);
            return (
              <Chip
                key={t.label}
                variant="outline-dark"
                size="lg"
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
      </div>
      <label className={s.field}>
        <span className="visually-hidden">Message</span>
        <textarea className={`${s.input} ${s.textarea}`} name="message" rows={4} placeholder="How can we help?" />
      </label>

      {status === 'error' && (
        <p className={s.error} role="alert">
          {error} You can also email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" icon="arrow_forward" block disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>
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

/** Labelled text input; the label is visually hidden and the placeholder carries the hint. */
function Field({ name, label, type = 'text', required, autoComplete, value, onChange }: FieldProps) {
  return (
    <label className={s.field}>
      <span className="visually-hidden">{label}</span>
      <input
        className={s.input}
        name={name}
        type={type}
        required={required}
        placeholder={required ? `${label} *` : label}
        autoComplete={autoComplete}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : {})}
      />
    </label>
  );
}
