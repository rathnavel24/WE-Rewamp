import type { CSSProperties } from 'react';
import { Button, Icon, Section, Stat, Tile } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { HERO_GROUP_CHIP, HERO_ORBIT, HERO_SECTORS, HERO_SECTORS_SENTENCE, HERO_STATS } from '@/content/hero';
import { GREEN } from '@/content/tones';
import { useCycle } from '@/hooks/useCycle';
import { cx } from '@/lib/cx';
import { HeroRoller } from './HeroRoller';
import { HeroWheel } from './HeroWheel';
import s from './Hero.module.css';

export function Hero() {
  const { index, previous, next, clearPrevious } = useCycle(HERO_SECTORS.length);
  const sector = HERO_SECTORS[index];
  const lit = new Set(sector.ventures);
  const groupLit = lit.size === 0;
  const toneVars = { '--tone': sector.tone.accent, '--tone-soft': sector.tone.soft } as CSSProperties;

  return (
    <Section data-screen-label="Hero" pt="hero" pb="sm" className={s.hero} innerClassName={s.layout} gap="none">
      <div className={s.gridBg} aria-hidden="true" />
      <div className={s.copy}>
        <div data-reveal="blur" className={s.badge}>
          <span className={s.dot}>
            <span data-pulse="0" className={s.ping} />
          </span>
          Parent group · UAE &amp; India
        </div>

        <h1 data-reveal="up" data-delay="80" className="t-display-1">
          One group building the edge in <span className="visually-hidden">{HERO_SECTORS_SENTENCE}</span>
          <HeroRoller sectors={HERO_SECTORS} index={index} previous={previous} onNext={next} onLeft={clearPrevious} />
        </h1>

        {/* Phones/tablets (no orbit): the companies behind the current word, as chips. */}
        <div className={s.sectorStrip} style={toneVars} aria-hidden="true">
          <Icon name="subdirectory_arrow_right" size={20} className={s.sectorArrow} />
          <span key={index} className={s.sectorChips}>
            {(groupLit ? [{ ...HERO_GROUP_CHIP, tone: sector.tone }] : HERO_ORBIT.filter((o) => lit.has(o.id))).map(
              (c, i) => (
                <span key={c.name} className={s.sectorChip} style={{ '--i': i } as CSSProperties}>
                  <Tile icon={c.icon} size="xs" tone={c.tone} />
                  {c.name}
                </span>
              )
            )}
          </span>
        </div>

        <p data-reveal="up" data-delay="160" className={`t-lead ${s.lead}`}>
          WalletEdge Global is the principal stakeholder behind seven companies across the UAE and India — from
          AI-powered insurance platforms and DHA-licensed healthcare to financial recovery and business consulting.
        </p>

        <div data-reveal="up" data-delay="240" className={s.buttons}>
          <Button to={ROUTES.companies} icon="arrow_forward" size="lg">
            Explore our companies
          </Button>
          <Button to={ROUTES.services} variant="secondary" size="lg">
            Our services
          </Button>
        </div>

        <div data-stagger="90" className={s.stats}>
          {HERO_STATS.map((st) => (
            <Stat
              key={st.label}
              variant="plain"
              size="sm"
              count={st.count}
              suffix={st.suffix}
              value={`${st.count}${st.suffix ?? ''}`}
              label={st.label}
            />
          ))}
        </div>
      </div>

      {/* The wheel follows the headline: each word turns it to that sector's companies. */}
      <div data-reveal="scale" data-delay="200" className={s.visual} style={toneVars} aria-hidden="true">
        <div className={cx(s.halo, s.haloGreen, sector.tone === GREEN && s.haloOn)} />
        <div className={cx(s.halo, s.haloOrange, sector.tone !== GREEN && s.haloOn)} />
        <HeroWheel sectors={HERO_SECTORS} index={index} />
      </div>
    </Section>
  );
}
