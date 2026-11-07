import { AppLink } from '@/components/ui/AppLink';
import { companyHref, GROUP_COMPANIES } from '@/content/companies';
import { CORPORATE_OFFICES, OFFICES } from '@/content/site';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './SiteFooter.module.css';

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

          {OFFICES.map((o) => (
            <address key={o.country} className={s.office}>
              <span className={s.officeName}>
                {o.country}
                {o.badge === 'HQ' && <span className={s.hq}>Registered office</span>}
              </span>
              <span className={s.address}>
                {o.addressLines[0]}
                <br />
                {o.addressLines[1]}
              </span>
              <a href={o.phone.href} className={s.phone}>
                {o.phone.label}
              </a>
            </address>
          ))}
        </div>

        <section className={s.corporate} aria-labelledby="footer-corporate">
          <h2 id="footer-corporate" className={s.title}>
            Corporate offices
          </h2>
          <div className={s.corporateList}>
            {CORPORATE_OFFICES.map((o) => (
              <address key={o.company} className={s.office}>
                <span className={s.officeName}>{o.company}</span>
                <span className={s.address}>
                  {o.addressLines[0]}
                  <br />
                  {o.addressLines[1]}
                </span>
              </address>
            ))}
          </div>
        </section>

        <p className={s.bottom}>© 2026 Wallet Edge Global FZC LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
