import { Button } from '../Button';
import { Section, type SectionSpace } from '../Section';
import s from './CtaBanner.module.css';

interface CtaBannerProps {
  title: string;
  cta: string;
  to: string;
  pt?: SectionSpace;
}

/** Dark call-to-action strip that closes the Services and Team pages. */
export function CtaBanner({ title, cta, to, pt = 'none' }: CtaBannerProps) {
  return (
    <Section pt={pt}>
      <div data-reveal="up" className={`on-dark ${s.banner}`}>
        <p className={`t-h2 ${s.title}`}>{title}</p>
        <Button to={to} variant="accent" size="lg" icon="arrow_forward">
          {cta}
        </Button>
      </div>
    </Section>
  );
}
