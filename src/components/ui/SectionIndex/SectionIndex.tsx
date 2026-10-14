import type { HTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import s from './SectionIndex.module.css';

interface SectionIndexProps extends HTMLAttributes<HTMLSpanElement> {
  no: string;
  label: string;
  /** `health` = muted green used on the mint panel. Light text is inherited from `.on-dark`. */
  tone?: 'default' | 'health';
  [dataAttr: `data-${string}`]: string | undefined;
}

/** Numbered label with a short rule: "01 —— IT & BPO". */
export function SectionIndex({ no, label, tone = 'default', className, ...rest }: SectionIndexProps) {
  return (
    <span className={cx(s.index, tone === 'health' && s.health, className)} {...rest}>
      {no}
      <span className={s.rule} />
      {label}
    </span>
  );
}
