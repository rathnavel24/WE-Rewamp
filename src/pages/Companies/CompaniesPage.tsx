import { useState } from 'react';
import { Card, Chip, Grid, Icon, Section, SectionHeader, Stat, Tile } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import { COMPANIES, COUNTRY_LABELS } from '@/content/companies';
import { alternate } from '@/content/tones';
import type { Country } from '@/types';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './CompaniesPage.module.css';

type Filter = 'All' | Country;
// One filter per country that has a company, in the order they first appear.
const FILTERS: Filter[] = ['All', ...new Set(COMPANIES.map((c) => c.country))];
const matches = (f: Filter, country: Country) => f === 'All' || country === f;
const filterLabel = (f: Filter) => (f === 'All' ? 'All' : COUNTRY_LABELS[f]);

const SUBSIDIARIES = COMPANIES.filter((c) => !c.parent);
/** The group at a glance, shown on the parent company's card — derived, so it stays right as companies are added. */
const GROUP_FACTS = [
  { count: SUBSIDIARIES.length, label: 'Subsidiaries' },
  { count: new Set(SUBSIDIARIES.map((c) => c.sector)).size, label: 'Sectors' },
  { count: new Set(COMPANIES.map((c) => c.country)).size, label: 'Countries' }
];

export function CompaniesPage() {
  usePageMeta({
    title: 'Our Companies',
    description:
      'The seven companies of WalletEdge Global across the UAE and India — insurance technology, healthcare, pharmacy, financial recovery and consulting.'
  });
  const [filter, setFilter] = useState<Filter>('All');
  const shown = COMPANIES.filter((c) => matches(filter, c.country));

  return (
    <>
      <Section data-screen-label="Companies hero" pt="hero" pb="sm">
        <SectionHeader
          as="h1"
          size="display-1"
          layout="split"
          kicker="Our companies"
          title="The WalletEdge group."
          lead="Wallet Edge Global FZC LLC is the parent and main stakeholder of every company below. Each runs independently with its own brand — united by shared capital, governance and technology."
        />
      </Section>

      <Section data-screen-label="Group structure" pt="none" pb="sm">
        <Card data-reveal="scale" variant="inverse" padding="xl" className={s.structure}>
          <div className={s.dots} aria-hidden="true" />
          <div data-float="6" className={s.parent}>
            <img src={logo} alt="WalletEdge" className={s.parentLogo} />
          </div>
          <div className={s.stem} aria-hidden="true">
            <span className={s.stemFill} />
          </div>
          <div className={s.bar} aria-hidden="true">
            <span data-flow="3600" className={s.streak} />
          </div>
          <div data-stagger="80" className={s.subs}>
            {SUBSIDIARIES.map((c, i) => (
              <Card key={c.name} to={c.href} variant="glass" padding="sm" className={s.sub}>
                <Tile icon={c.icon} size="sm" tone={alternate(i + 1)} solid />
                <span className={s.subName}>{c.short}</span>
                <span className="t-label">{c.country}</span>
              </Card>
            ))}
          </div>
        </Card>
      </Section>

      <Section data-screen-label="Directory" pt="sm" gap="md">
        <div className={s.dirHead}>
          <h2 data-reveal="up" className="t-h1">
            Company directory
          </h2>
          <div data-reveal="fade" className={s.filters} role="group" aria-label="Filter by country">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                className={s.filter}
                onClick={() => setFilter(f)}
              >
                {filterLabel(f)}{' '}
                <span className={s.filterCount}>{COMPANIES.filter((c) => matches(f, c.country)).length}</span>
              </button>
            ))}
          </div>
        </div>

        <Grid min={340} max={3} mode="fill">
          {shown.map((c) => (
            <Card key={c.name} to={c.href} className={c.parent ? `${s.card} ${s.featured}` : s.card}>
              <div className={s.cardTop}>
                <Tile icon={c.icon} size="lg" tone={c.tone} />
                <Chip mono icon="location_on" size="md">
                  {c.country}
                </Chip>
              </div>
              <div className={s.cardBody}>
                <span className="t-label" style={{ color: c.tone.ink }}>
                  {c.sector}
                </span>
                <h3 className="t-h3">{c.name}</h3>
                <p className="t-body">{c.desc}</p>
              </div>
              <span className={s.cta}>
                {c.cta}
                <Icon name="arrow_forward" size={18} />
              </span>
              {c.parent && (
                <div className={s.facts}>
                  {GROUP_FACTS.map((f) => (
                    <Stat
                      key={f.label}
                      variant="plain"
                      size="sm"
                      count={f.count}
                      value={String(f.count)}
                      label={f.label}
                    />
                  ))}
                </div>
              )}
            </Card>
          ))}
        </Grid>
      </Section>
    </>
  );
}
