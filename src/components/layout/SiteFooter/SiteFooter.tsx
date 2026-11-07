import { AppLink } from '@/components/ui/AppLink';
import { companyHref, GROUP_COMPANIES } from '@/content/companies';
import { CORPORATE_OFFICES, INDIA_CORPORATE_OFFICE } from '@/content/site';
import type { CorporateOffice } from '@/types';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './SiteFooter.module.css';

const [GROUP_OFFICE, ...OTHER_OFFICES] = CORPORATE_OFFICES;

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div className={s.brand}>
            <img src={logo} alt="WalletEdge" className={s.logo} />
            <p className={s.blurb}>
              The holding company for all services — IT&nbsp;&amp;&nbsp;BPO, financial services, consulting and
              healthcare across the UAE and India.
            </p>
          </div>

          <nav className={s.companies} aria-labelledby="footer-companies">
            <h2 id="footer-companies" className={s.title}>
              Our companies
            </h2>
            <div className={s.links}>
              {GROUP_COMPANIES.map((c) => (
                <AppLink key={c.name} to={companyHref(c)} className={s.link}>
                  {c.name}
                </AppLink>
              ))}
            </div>
          </nav>

          <h2 className={`${s.title} ${s.officesTitle}`}>Corporate offices</h2>
          <Office office={GROUP_OFFICE} />
          <Office office={INDIA_CORPORATE_OFFICE} />
          <hr className={s.rule} />
          {OTHER_OFFICES.map((o) => (
            <Office key={o.companies[0]} office={o} />
          ))}
        </div>

        <p className={s.bottom}>© 2026 Wallet Edge Global FZC LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Office({ office: o }: { office: CorporateOffice }) {
  return (
    <address className={s.office}>
      <span className={s.names}>
        {o.companies.map((name) => (
          <span key={name} className={s.title}>
            {name}
          </span>
        ))}
      </span>
      <span className={s.address}>
        {o.addressLines[0]}
        <br />
        {o.addressLines[1]}
      </span>
    </address>
  );
}
