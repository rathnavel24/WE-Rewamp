import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { CONTACT_EMAIL, ENQUIRY_TOPICS } from '@/data/site';
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
        <Tile icon="check" size={64} radius={20} iconSize={34} bg="#03643B" ink="#fff" />
        <span className={s.sentTitle}>Thank you, {name.trim().split(' ')[0] || 'there'}.</span>
        <span className={s.sentText}>Your message is with the WalletEdge Global team. We’ll reply within one business day.</span>
        <button type="button" className={s.again} onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <span className={s.formTitle}>Send an enquiry</span>

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>I’m interested in</legend>
        <div className={s.topics}>
          {ENQUIRY_TOPICS.map((t) => {
            const on = picked.includes(t.label);
            return (
              <button key={t.label} type="button" aria-pressed={on} className={`${s.topic} ${on ? s.topicOn : ''}`} onClick={() => toggle(t.label)}>
                <Icon name={on ? 'check' : t.icon} size={16} />
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={s.fields}>
        <input className={s.input} name="name" required placeholder="Full name" aria-label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={s.input} name="company" placeholder="Company" aria-label="Company" autoComplete="organization" />
        <input className={s.input} name="email" type="email" required placeholder="Work email" aria-label="Work email" autoComplete="email" />
        <input className={s.input} name="phone" type="tel" placeholder="Phone" aria-label="Phone" autoComplete="tel" />
      </div>
      <textarea className={`${s.input} ${s.textarea}`} name="message" rows={4} placeholder="How can we help?" aria-label="Message" />

      {status === 'error' && (
        <p className={s.error} role="alert">
          {error} You can also email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <button type="submit" className={s.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <Icon name="arrow_forward" size={21} />
      </button>
    </form>
  );
}
