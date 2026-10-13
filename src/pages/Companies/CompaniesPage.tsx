import { useState, type CSSProperties } from 'react';
import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { COMPANIES } from '@/data/companies';
import type { Country } from '@/types';
import logo from '@/assets/walletedge-logo.png';
import s from './CompaniesPage.module.css';

type Filter = 'All' | 'UAE' | 'India';
const FILTERS: Filter[] = ['All', 'UAE', 'India'];
const matches = (f: Filter, country: Country) => f === 'All' || country === f.toUpperCase();

const SUBSIDIARIES = COMPANIES.filter((c) => !c.parent);

export function CompaniesPage() {
  useDocumentTitle('Our Companies — WalletEdge Global');
  const [filter, setFilter] = useState<Filter>('All');
  const shown = COMPANIES.filter((c) => matches(filter, c.country));

  return (
    <>
      <section data-screen-label="Companies hero" className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__lead">
            <span data-reveal="fade" className="eyebrow">
              Our companies
            </span>
            <h1 data-reveal="up" className="display-1">
              The WalletEdge group.
            </h1>
          </div>
          <p data-reveal="up" data-delay="100" className="page-hero__copy">
            Wallet Edge Global FZC LLC is the parent and main stakeholder of every company below. Each runs independently with its own brand
            — united by shared capital, governance and technology.
          </p>
        </div>
      </section>

      <section data-screen-label="Group structure" className={s.structureSection}>
        <div data-reveal="scale" className={s.structure}>
          <div className={s.dots} />
          <div data-float="6" className={s.parent}>
            <img src={logo} alt="WalletEdge" className={s.parentLogo} />
          </div>
          <div className={s.stem}>
            <span className={s.stemFill} />
          </div>
          <div className={s.bar}>
            <span data-flow="3600" className={s.streak} />
          </div>
          <div data-stagger="80" className={s.subs}>
            {SUBSIDIARIES.map((c, i) => (
              <AppLink key={c.name} to={c.href} className={s.sub}>
                <Tile icon={c.icon} size={38} radius={11} iconSize={20} bg={i % 2 ? '#03643B' : '#CF5512'} ink="#fff" />
                <span className={s.subName}>{c.short}</span>
                <span className={s.subCountry}>{c.country}</span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Directory" className={s.dirSection}>
        <div className={`container ${s.dirInner}`}>
          <div className={s.dirHead}>
            <h2 data-reveal="up" className={s.dirTitle}>
              Company directory
            </h2>
            <div data-reveal="fade" className={s.filters} role="group" aria-label="Filter by country">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  className={`${s.filter} ${filter === f ? s.filterOn : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f} <span className={s.filterCount}>{COMPANIES.filter((c) => matches(f, c.country)).length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.grid}>
            {shown.map((c) => (
              <AppLink key={c.name} to={c.href} data-spot="1" className={s.card} style={{ '--glow': c.tone.glow } as CSSProperties}>
                <div className={s.cardTop}>
                  <Tile icon={c.icon} size={52} radius={16} iconSize={26} bg={c.tone.soft} ink={c.tone.ink} />
                  <span className={s.location}>
                    <Icon name="location_on" size={15} />
                    {c.country}
                  </span>
                </div>
                <div className={s.cardBody}>
                  <span className={s.sector} style={{ color: c.tone.ink }}>
                    {c.sector}
                  </span>
                  <h3 className={s.name}>{c.name}</h3>
                  <p className={s.desc}>{c.desc}</p>
                </div>
                <span className={s.cta}>
                  {c.cta}
                  <Icon name="arrow_forward" size={18} />
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
