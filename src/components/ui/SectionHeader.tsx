import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';
import s from './SectionHeader.module.css';

interface SectionHeaderProps {
  /** Small kicker above the title. A string renders as the accent eyebrow. */
  kicker?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Right-aligned action (e.g. "All services →"). */
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  /** Title scale. Page heroes use display-1, sections display-2, panels h1. */
  size?: 'display-1' | 'display-2' | 'h1';
  /** `split`: title left, lead/action right, bottom-aligned. `stack`: everything in one column. */
  layout?: 'stack' | 'split';
  /** Animate with the scroll-reveal system (default true). */
  reveal?: boolean;
  className?: string;
}

/** Kicker + title + lead block used at the top of every section. */
export function SectionHeader({
  kicker,
  title,
  lead,
  action,
  as: H = 'h2',
  size = 'display-2',
  layout = 'stack',
  reveal = true,
  className
}: SectionHeaderProps) {
  const r = (kind: string, delay?: number) => (reveal ? { 'data-reveal': kind, ...(delay && { 'data-delay': String(delay) }) } : {});
  const leadIsText = typeof lead === 'string';
  const aside = (lead || action) && (
    <div className={s.aside}>
      {lead && (leadIsText ? <p className={cx(s.lead, size === 'display-1' ? 't-lead' : 't-body-lg')} {...r('up', 100)}>{lead}</p> : lead)}
      {action && <div {...r('fade', 150)}>{action}</div>}
    </div>
  );

  return (
    <header className={cx(s.header, s[layout], s[size], className)}>
      <div className={s.main}>
        {kicker && (typeof kicker === 'string' ? <span className="eyebrow" {...r('fade')}>{kicker}</span> : <div {...r('fade')}>{kicker}</div>)}
        <H className={`t-${size}`} {...r('up', 40)}>
          {title}
        </H>
        {layout === 'stack' && aside}
      </div>
      {layout === 'split' && aside}
    </header>
  );
}
