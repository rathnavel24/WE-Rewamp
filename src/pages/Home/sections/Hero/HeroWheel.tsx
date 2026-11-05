import { useState, type CSSProperties } from 'react';
import { Icon, Tile } from '@/components/ui';
import { HERO_FINALE, type HeroSector } from '@/content/hero';
import { cx } from '@/lib/cx';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './HeroWheel.module.css';

/** Roughly how many degrees apart neighbouring cards sit on the rim. */
const CARD_SPACING = 17;

interface HeroWheelProps {
  sectors: HeroSector[];
  /** Sector shown in the headline; the wheel turns to bring its cards round. */
  index: number;
}

/**
 * The hero's right-hand visual: every sector's cards ride the rim of one large wheel whose hub
 * sits off to the right. Each headline word turns the wheel one step, so the current service card sweeps
 * up and away while the next category rises in from below. Cards counter-rotate to stay upright.
 * On the closing (finale) word the wheel holds still and the four category cards nearest the middle fly
 * along the rim into it and merge into one WalletEdge card, which gives way when the next
 * round starts.
 * Decorative — the headline and the sections below carry the same information.
 */
export function HeroWheel({ sectors, index }: HeroWheelProps) {
  const wheelSectors = sectors.filter((sector) => sector.card);
  const n = wheelSectors.length;
  // The category cards repeat round the whole rim, so the wheel can keep turning forward and the
  // neighbouring categories always sit just above and below the current one.
  const slots = n * Math.max(1, Math.round(360 / (n * CARD_SPACING)));
  const step = 360 / slots;
  const merging = Boolean(sectors[index].finale);
  // The finale has no card of its own: the wheel stays on the sector before it while the cards merge.
  const at = wheelSectors.indexOf(sectors[merging ? (index - 1 + sectors.length) % sectors.length : index]);

  // Count steps instead of using the position directly, so the wheel always turns forward —
  // wrapping from the last sector to the first must not spin it backwards.
  const [turn, setTurn] = useState({ at, steps: at });
  if (turn.at !== at) {
    setTurn({ at, steps: turn.steps + ((at - turn.at + n) % n) });
  }
  const current = ((turn.steps % slots) + slots) % slots;

  // Every slot's resting angle, and how far round the wheel it is from the card in the middle
  // (taken the short way, so cards above come down to the middle and cards below come up to it).
  const cards = Array.from({ length: slots }, (_, k) => {
    const g = k % n;
    const rest = -k * step;
    const fromMiddle = ((((current * step + rest) % 360) + 540) % 360) - 180;
    return { card: wheelSectors[g].card!, g, i: k, rest, fromMiddle, shown: k === current };
  });
  // Finale order: the nearest cards are gathered first, each later one landing on top of the pile.
  const byDistance = [...cards].sort((x, y) => Math.abs(x.fromMiddle) - Math.abs(y.fromMiddle));

  return (
    <div className={s.wheel} style={{ '--wheel': `${turn.steps * step}deg` } as CSSProperties}>
      <div className={s.hub}>
        <div className={s.rim} />
        <div className={s.rimInner} />
        {cards.map((entry) => {
          const { card, i, rest, fromMiddle, shown } = entry;
          // The previous category above and the next two below stay on screen, dimmed, so all four show.
          const near = !shown && !merging && fromMiddle >= -1.5 * step && fromMiddle <= 2.5 * step;
          const rank = byDistance.indexOf(entry);
          const merges = merging && rank < n; // the four categories nearest the middle, one of each
          const vars = {
            '--a': `${merges ? rest - fromMiddle : rest}deg`,
            '--rank': rank,
            '--from': shown ? 1 : 0,
            '--i': 0,
            '--tone': card.tone.accent,
            '--tone-ink': card.tone.ink
          } as CSSProperties;
          return (
            <div key={i} className={cx(s.item, merges && s.itemMerge)} style={vars}>
              <div className={cx(s.spoke, ((shown && !merging) || merges) && s.spokeOn)} />
              <div className={s.slot}>
                <div className={cx(s.card, shown && !merging && s.cardOn, near && s.cardNear, merges && s.cardMerge)}>
                  <Tile icon={card.icon} size="lg" tone={card.tone} />
                  <div className={s.text}>
                    <span className={s.title}>{card.title}</span>
                    <span className={s.note}>{card.note}</span>
                  </div>
                  <span className={s.check}>
                    <Icon name="check" size={18} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What the cards merge into: sits where the middle of each set rests on the rim. */}
      <div className={cx(s.finale, merging && s.finaleOn)}>
        {/* Two cards peeking out underneath, so it reads as the whole set stacked into one. */}
        <div className={cx(s.ghost, s.ghostBack)} />
        <div className={cx(s.ghost, s.ghostMid)} />
        <div className={s.finaleCard}>
          <img src={logo} alt="" className={s.finaleLogo} />
          <div className={s.finaleFoot}>
            <span className={s.finaleNote}>
              <span className={s.finaleCheck}>
                <Icon name="check" size={14} />
              </span>
              {HERO_FINALE.note}
            </span>
            <span className={s.finaleStack}>
              {HERO_FINALE.icons.map((t) => (
                <Tile key={t.icon} icon={t.icon} size="xs" tone={t.tone} round className={s.finaleTile} />
              ))}
              <span className={s.finaleMore}>{HERO_FINALE.more}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
