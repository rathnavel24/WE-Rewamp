import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { ROUTES } from '@/data/routes';
import { LOGO_ALT } from '@/data/site';
import { GREEN, ORANGE } from '@/data/tones';
import logo from '@/assets/walletedge-logo.png';
import s from './Hero.module.css';

/** Words cycled by the headline roller. The last entry repeats the first for a seamless loop. */
const ROLLER_WORDS: Array<{ text: string; green?: boolean }> = [
  { text: 'IT & BPO.' },
  { text: 'Financial services.', green: true },
  { text: 'Healthcare.' },
  { text: 'Consulting.', green: true },
  { text: 'Real estate.' },
  { text: 'IT & BPO.' }
];

/** Ventures orbiting the logo; positions are % of the square visual. */
const ORBIT = [
  { name: 'InsureLiv', icon: 'shield_with_heart', tone: GREEN, left: '50%', top: '5%' },
  { name: 'ArogyaPlus', icon: 'biotech', tone: ORANGE, left: '92.8%', top: '36.1%' },
  { name: 'CareHub', icon: 'home_health', tone: GREEN, left: '76.5%', top: '86.4%' },
  { name: 'Global Cure RX', icon: 'medication', tone: ORANGE, left: '23.5%', top: '86.4%' },
  { name: 'Recovery', icon: 'account_balance', tone: GREEN, left: '7.2%', top: '36.1%' }
];

const STATS = [
  { count: '7', label: 'Group companies' },
  { count: '15', suffix: '+', label: 'Insurer & enterprise clients' },
  { count: '2', label: 'Countries · UAE, India' }
];

export function Hero() {
  return (
    <section data-screen-label="Hero" data-spot="1" className={s.hero}>
      <div className={s.gridBg} />
      <div className={`container ${s.layout}`}>
        <div className={s.copy}>
          <div data-reveal="blur" className={s.badge}>
            <span className={s.dot}>
              <span data-pulse="0" className={s.ping} />
            </span>
            Parent group · UAE &amp; India
          </div>

          <h1 data-reveal="up" data-delay="80" className={s.title}>
            One group building the edge in
            <span data-roller="2300" className={s.roller}>
              <span className={s.rollerTrack}>
                {ROLLER_WORDS.map((w, i) => (
                  <span key={i} className={`${s.rollerWord} ${w.green ? s.green : ''}`}>
                    {w.text}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p data-reveal="up" data-delay="160" className={s.lead}>
            WalletEdge Global is the principal stakeholder behind seven companies across the UAE and India — from AI-powered insurance
            platforms and DHA-licensed healthcare to financial recovery and business consulting.
          </p>

          <div data-reveal="up" data-delay="240" className={s.buttons}>
            <AppLink to={ROUTES.companies} className={s.primary}>
              Explore our companies
              <Icon name="arrow_forward" size={20} />
            </AppLink>
            <AppLink to={ROUTES.services} className={s.secondary}>
              Our services
            </AppLink>
          </div>

          <div data-stagger="90" className={s.stats}>
            {STATS.map((st) => (
              <div key={st.label} className={s.stat}>
                <span data-count={st.count} data-suffix={st.suffix} className={s.statValue}>
                  {st.count}
                  {st.suffix}
                </span>
                <span className={s.statLabel}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal="scale" data-delay="200" className={s.visual}>
          <div className={s.ringOuter} />
          <div className={s.ringInner} />
          <div data-orbit="70" className={s.orbit}>
            {ORBIT.map((o) => (
              <div key={o.name} className={s.planet} style={{ left: o.left, top: o.top }}>
                <div data-orbit-counter="1" className={s.chip}>
                  <Tile icon={o.icon} size={30} radius={9} iconSize={18} bg={o.tone.soft} ink={o.tone.ink} />
                  {o.name}
                </div>
              </div>
            ))}
          </div>
          <div data-float="8" className={s.core}>
            <img src={logo} alt={LOGO_ALT} className={s.coreLogo} />
          </div>
        </div>
      </div>
    </section>
  );
}
