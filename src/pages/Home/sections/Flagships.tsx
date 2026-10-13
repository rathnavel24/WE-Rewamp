import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { ROUTES } from '@/data/routes';
import { INSURELIV_TAGS } from '@/data/services';
import s from './Flagships.module.css';

const AROGYA_STATS = [
  { count: '10000', suffix: '+', display: '10,000+', label: 'Families served' },
  { count: '250', suffix: '+', display: '250+', label: 'Lab tests' },
  { count: '48', suffix: 'h', display: '48h', label: 'Digital reports' }
];

export function Flagships() {
  return (
    <section data-screen-label="Flagships" className={s.section}>
      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <span data-reveal="fade" className="eyebrow">
            03 — Flagship platforms
          </span>
          <h2 data-reveal="up" className="display-2">
            Technology that already works at scale.
          </h2>
        </div>

        <div className={s.grid}>
          {/* InsureLiv */}
          <div data-reveal="up" className={s.card}>
            <div className={s.top}>
              <span className={s.brand}>
                <Tile icon="shield_with_heart" size={46} radius={14} iconSize={24} bg="#03643B" ink="#fff" />
                InsureLiv
              </span>
              <span className={s.pill}>InsurTech · GCC</span>
            </div>
            <p className={s.statement}>
              An AI-powered insurance operating system that unifies broker, insurer and TPA workflows into one secure pipeline.
            </p>
            <div className={s.stats2}>
              <div className="stat">
                <span data-count="90" data-suffix="%" className={`stat__value ${s.statBig}`}>
                  90%
                </span>
                <span className="stat__label">Faster processing times</span>
              </div>
              <div className="stat">
                <span className={`stat__value ${s.statBig}`}>1</span>
                <span className="stat__label">Unified pipeline — lead to renewal</span>
              </div>
            </div>
            <div className={s.chips}>
              {INSURELIV_TAGS.map((t) => (
                <span key={t.label} className={s.chip}>
                  <Icon name={t.icon} size={17} color="#03643B" />
                  {t.label}
                </span>
              ))}
            </div>
            <AppLink to={ROUTES.venture('insureliv')} className={s.more}>
              Discover InsureLiv
              <Icon name="arrow_forward" size={18} />
            </AppLink>
          </div>

          {/* ArogyaPlus */}
          <div data-reveal="up" data-delay="120" className={`${s.card} ${s.cardWarm}`}>
            <div className={s.top}>
              <span className={s.brand}>
                <Tile icon="biotech" size={46} radius={14} iconSize={24} bg="#CF5512" ink="#fff" />
                ArogyaPlus
              </span>
              <span className={`${s.pill} ${s.pillWarm}`}>HealthTech · Dubai</span>
            </div>
            <p className={s.statement}>
              Home diagnostics and preventive health packages, delivered by DHA-licensed professionals and CAP-accredited labs.
            </p>
            <div className={s.stats3}>
              {AROGYA_STATS.map((st) => (
                <div key={st.label} className={`stat ${s.statWarm}`}>
                  <span data-count={st.count} data-suffix={st.suffix} className={`stat__value ${s.statValueWarm}`}>
                    {st.display}
                  </span>
                  <span className="stat__label">{st.label}</span>
                </div>
              ))}
            </div>
            <AppLink to={ROUTES.venture('arogyaplus')} className={s.more}>
              Discover ArogyaPlus
              <Icon name="arrow_forward" size={18} />
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
