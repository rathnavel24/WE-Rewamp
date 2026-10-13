import type { CSSProperties } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';
import { isVentureId, VENTURE_LIST, VENTURES } from '@/data/ventures';
import type { Venture } from '@/types';
import s from './VenturePage.module.css';

const CASE_POINTS = [
  {
    icon: 'automation',
    bg: '#03643B',
    title: 'Automated claims management',
    desc: 'Workflows that close expectation gaps between real estate entities, TPAs and insurers.'
  },
  {
    icon: 'sync_alt',
    bg: '#CF5512',
    title: 'Integrated TPA routing',
    desc: 'Claims sync directly with corporate asset panels — verification from months to a few digital cycles.'
  }
];

export function VenturePage() {
  const { id } = useParams();
  if (!isVentureId(id)) return <Navigate to={ROUTES.venture('insureliv')} replace />;
  // Keyed so switching ventures remounts and replays the motion.
  return <VentureView key={id} v={VENTURES[id]} />;
}

function VentureView({ v }: { v: Venture }) {
  useDocumentTitle(`${v.name} — WalletEdge Global`);
  const toneVars = { '--accent': v.tone.accent, '--ink': v.tone.ink, '--soft': v.tone.soft, '--glow': v.tone.glow } as CSSProperties;
  const others = VENTURE_LIST.filter((o) => o.id !== v.id);

  return (
    <div style={toneVars}>
      {/* Hero */}
      <section data-screen-label="Venture hero" className={s.hero}>
        <div className={`container ${s.heroInner}`}>
          <div data-reveal="fade" className={s.crumbs}>
            <AppLink to={ROUTES.companies} className={s.back}>
              <Icon name="arrow_back" size={17} />
              Our companies
            </AppLink>
            <span className={s.sep}>/</span>
            <span className={s.current}>{v.name}</span>
          </div>

          <div className={s.heroGrid}>
            <div className={s.heroLead}>
              <span data-reveal="up" className={s.identity}>
                <Tile icon={v.icon} size={64} radius={20} iconSize={32} bg={v.tone.accent} ink="#fff" />
                <span className={s.sector}>{v.sector}</span>
              </span>
              <h1 data-reveal="up" data-delay="60" className={s.name}>
                {v.name}
              </h1>
              <p data-reveal="up" data-delay="120" className={s.tagline}>
                {v.tagline}
              </p>
            </div>
            <div data-reveal="up" data-delay="180" className={s.aboutCol}>
              <p className={s.about}>{v.about}</p>
              <div className={s.actions}>
                <AppLink to={`${ROUTES.contact}?venture=${v.id}`} className={s.enquire}>
                  Enquire about {v.name}
                  <Icon name="arrow_forward" size={19} />
                </AppLink>
                {v.site && (
                  <AppLink to={v.site.href} target={v.site.href.startsWith('http') ? '_blank' : undefined} className={s.site}>
                    {v.site.label}
                    <Icon name="open_in_new" size={18} />
                  </AppLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {v.stats && (
        <section className={s.statsSection}>
          <div data-stagger="90" className={`container ${s.stats}`}>
            {v.stats.map((st) => (
              <div key={st.label} className={s.statCard}>
                <span data-count={st.n} data-suffix={st.suffix} className={s.statValue}>
                  {st.n}
                  {st.suffix}
                </span>
                <span className={s.statLabel}>{st.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section data-screen-label="Capabilities" className={s.featSection}>
        <div className={`container ${s.featInner}`}>
          <h2 data-reveal="up" className={s.featTitle}>
            {v.featTitle}
          </h2>
          <div data-stagger="80" className={s.features}>
            {v.features.map((f) => (
              <div key={f.title} data-spot="1" className={s.feature}>
                <Tile icon={f.icon} size={50} radius={15} iconSize={25} bg={v.tone.soft} ink={v.tone.ink} />
                <span className={s.featureText}>
                  <span className={s.featureTitle}>{f.title}</span>
                  <span className={s.featureDesc}>{f.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      {v.steps && (
        <section data-screen-label="Process" className={s.processSection}>
          <div data-reveal="up" className={s.process}>
            <h2 className={s.processTitle}>Simple and efficient process</h2>
            <div data-stagger="120" className={s.steps}>
              {v.steps.map((st) => (
                <div key={st.no} className={s.step}>
                  <div className={s.stepTop}>
                    <Tile icon={st.icon} size={46} radius={14} iconSize={23} bg="#CF5512" ink="#fff" />
                    <span className={s.stepNo}>{st.no}</span>
                  </div>
                  <span className={s.stepText}>
                    <span className={s.stepTitle}>{st.title}</span>
                    <span className={s.stepDesc}>{st.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case study */}
      {v.caseStudy && (
        <section data-screen-label="Case study" className={s.caseSection}>
          <div data-reveal="up" className={s.case}>
            <div className={s.caseCopy}>
              <span className="eyebrow">Case focus · EMAAR Group</span>
              <h2 className={s.caseTitle}>Streamlining the corporate recovery process.</h2>
              <p className={s.caseText}>
                EMAAR coordinates massive property portfolios where Emaar Community Management mandates master property insurance, public
                liability and fidelity guarantee. When incidents affect assets, recovery depends on complex commercial claims with regional
                insurers — the gaps WalletEdge is built to close.
              </p>
            </div>
            <div className={s.casePoints}>
              {CASE_POINTS.map((p) => (
                <div key={p.title} className={s.casePoint}>
                  <Tile icon={p.icon} size={44} radius={13} iconSize={22} bg={p.bg} ink="#fff" />
                  <span className={s.casePointText}>
                    <span className={s.casePointTitle}>{p.title}</span>
                    <span className={s.casePointDesc}>{p.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More from the group */}
      <section className={s.moreSection}>
        <div className={`container ${s.moreInner}`}>
          <span data-reveal="fade" className={s.moreLabel}>
            More from the group
          </span>
          <div data-stagger="80" className={s.others}>
            {others.map((o) => (
              <AppLink key={o.id} to={ROUTES.venture(o.id)} className={s.other}>
                <span className={s.otherName}>
                  <Tile icon={o.icon} size={40} radius={12} iconSize={20} bg={o.tone.soft} ink={o.tone.ink} />
                  {o.name}
                </span>
                <Icon name="arrow_forward" size={20} />
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
