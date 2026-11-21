import { Button } from '../Button';
import { Section, type SectionSpace } from '../Section';
import s from './CtaBanner.module.css';

interface CtaBannerProps {
  title: string;
  cta: string;
  to: string;
  pt?: SectionSpace;
  /** Decorative photo on the right, toned into the green. */
  photo?: string;
}

/** Dark call-to-action strip that closes the Services and Team pages. */
export function CtaBanner({ title, cta, to, pt = 'none', photo }: CtaBannerProps) {
  return (
    <Section pt={pt}>
      <div data-reveal="up" className={`on-dark ${s.banner}`}>
        {photo && <img src={photo} alt="" aria-hidden="true" loading="lazy" decoding="async" className={s.photo} />}
        <p className={`t-h2 ${s.title}`}>{title}</p>
        <Button to={to} variant="accent" size="lg" icon="arrow_forward">
          {cta}
        </Button>
      </div>
    </Section>
  );
}
