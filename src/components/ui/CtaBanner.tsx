import type { CSSProperties } from 'react';
import { AppLink } from './AppLink';
import { Icon } from './Icon';
import s from './CtaBanner.module.css';

interface CtaBannerProps {
  title: string;
  cta: string;
  to: string;
  sectionStyle?: CSSProperties;
}

/** Dark full-width call-to-action strip used at the bottom of Services and Team. */
export function CtaBanner({ title, cta, to, sectionStyle }: CtaBannerProps) {
  return (
    <section className={s.section} style={sectionStyle}>
      <div data-reveal="up" className={s.banner}>
        <span className={s.title}>{title}</span>
        <AppLink to={to} className={s.button}>
          {cta}
          <Icon name="arrow_forward" size={20} />
        </AppLink>
      </div>
    </section>
  );
}
