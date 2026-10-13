import type { HTMLAttributes } from 'react';

interface SectionIndexProps extends HTMLAttributes<HTMLSpanElement> {
  no: string;
  label: string;
  ruleClassName?: string;
  [dataAttr: `data-${string}`]: string | undefined;
}

/** Numbered label with a short rule: "01 —— IT & BPO". */
export function SectionIndex({ no, label, className, ruleClassName, ...rest }: SectionIndexProps) {
  return (
    <span className={className ? `section-index ${className}` : 'section-index'} {...rest}>
      {no}
      <span className={ruleClassName ? `section-index__rule ${ruleClassName}` : 'section-index__rule'} />
      {label}
    </span>
  );
}
