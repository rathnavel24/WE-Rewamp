import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { VentureId } from '@/types';
import { enquiryMailto, sendsByEmail, submitEnquiry } from './api';
import type { EnquiryPayload } from './types';

/** `emailed`: no backend, so the enquiry was handed to the visitor's email app to send. */
export type EnquiryStatus = 'idle' | 'sending' | 'sent' | 'emailed' | 'error';

interface Options {
  /** Topics ticked on first render (e.g. when arriving from a venture page). */
  initialTopics?: string[];
  venture?: VentureId;
}

/** Reads the form's fields into an API payload; empty optional fields are dropped. */
export function toPayload(
  data: FormData,
  topics: string[],
  extra: Pick<EnquiryPayload, 'venture' | 'source'>
): EnquiryPayload {
  const field = (k: string) => String(data.get(k) ?? '').trim() || undefined;
  return {
    name: field('name') ?? '',
    company: field('company'),
    email: field('email') ?? '',
    phone: field('phone'),
    message: field('message'),
    topics,
    ...extra
  };
}

/** State and actions for the enquiry form — UI-free, so any form layout can reuse it. */
export function useEnquiryForm({ initialTopics = [], venture }: Options = {}) {
  const [status, setStatus] = useState<EnquiryStatus>('idle');
  const [error, setError] = useState('');
  const [topics, setTopics] = useState<string[]>(initialTopics);
  const [name, setName] = useState('');
  const inFlight = useRef<AbortController | null>(null);

  // Cancel a pending submission if the form unmounts.
  useEffect(() => () => inFlight.current?.abort(), []);

  const toggleTopic = useCallback(
    (label: string) => setTopics((t) => (t.includes(label) ? t.filter((x) => x !== label) : [...t, label])),
    []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const payload = toPayload(new FormData(e.currentTarget), topics, { venture, source: window.location.pathname });
    if (sendsByEmail) {
      window.location.href = enquiryMailto(payload);
      setStatus('emailed');
      return;
    }
    const controller = new AbortController();
    inFlight.current = controller;
    setStatus('sending');
    setError('');
    try {
      await submitEnquiry(payload, controller.signal);
      setStatus('sent');
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setError('');
    setTopics(initialTopics);
    setName('');
  };

  return { status, error, topics, toggleTopic, name, setName, onSubmit, reset };
}
