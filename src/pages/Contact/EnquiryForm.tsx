import { useState, type FormEvent } from 'react';
import { Button, Chip, Tile } from '@/components/ui';
import { CONTACT_EMAIL, ENQUIRY_TOPICS } from '@/data/site';
import { GREEN } from '@/data/tones';
import { submitEnquiry } from '@/services/enquiries';
import type { VentureId } from '@/types';
import s from './ContactPage.module.css';

interface EnquiryFormProps {
  /** Topics ticked on first render (e.g. when arriving from a venture page). */
  initialTopics?: string[];
  venture?: VentureId;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function EnquiryForm({ initialTopics = [], venture }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [picked, setPicked] = useState<string[]>(initialTopics);
  const [name, setName] = useState('');

  const toggle = (label: string) => setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) ?? '').trim() || undefined;
    setStatus('sending');
    setError('');
    try {
      await submitEnquiry({
        name: field('name') ?? '',
        company: field('company'),
        email: field('email') ?? '',
        phone: field('phone'),
        message: field('message'),
        topics: picked,
        venture,
        source: window.location.pathname
      });
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setPicked(initialTopics);
    setName('');
  };

  if (status === 'sent') {
    return (
      <div className={s.sent} role="status">
        <Tile icon="check" size="xl" tone={GREEN} solid />
        <span className="t-h1">Thank you, {name.trim().split(' ')[0] || 'there'}.</span>
        <p className={`t-body-lg ${s.sentText}`}>Your message is with the WalletEdge Global team. We’ll reply within one business day.</p>
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
            const on = picked.includes(t.label);
            return (
              <Chip key={t.label} variant="outline-dark" size="lg" icon={on ? 'check' : t.icon} selected={on} onToggle={() => toggle(t.label)} className={s.topic}>
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
