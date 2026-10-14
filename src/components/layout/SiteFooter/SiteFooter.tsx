import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { CONTACT_EMAIL, NAV_LINKS, OFFICES } from '@/content/site';
import { ROUTES } from '@/config/routes';
import { VENTURE_LIST } from '@/content/ventures';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div className={s.brandCol}>
            <img src={logo} alt="WalletEdge" className={s.logo} />
            <p className={s.blurb}>
              The parent group behind businesses in IT &amp; BPO, financial services, consulting and healthcare across
              the UAE and India.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={s.mail}>
              <Icon name="mail" size={18} color="var(--color-primary)" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav className={s.col} aria-label="Company">
            <span className={s.heading}>Company</span>
            {NAV_LINKS.map((l) => (
              <AppLink key={l.id} to={l.href} className={s.link}>
                {l.label}
              </AppLink>
            ))}
          </nav>

          <nav className={s.col} aria-label="Ventures">
            <span className={s.heading}>Ventures</span>
            {VENTURE_LIST.map((v) => (
              <AppLink key={v.id} to={ROUTES.venture(v.id)} className={s.link}>
                {v.footerName ?? v.name}
              </AppLink>
            ))}
          </nav>

          <div className={`${s.col} ${s.officesCol}`}>
            <span className={s.heading}>Offices</span>
            <div className={s.offices}>
              {OFFICES.map((o) => (
                <address key={o.country} className={s.office}>
                  <span className={s.officeName}>
                    {o.country}
                    {o.badge === 'HQ' && <span className={s.hq}>HQ</span>}
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
          </div>
        </div>

        <div className={s.bottom}>
          <span>© 2026 Wallet Edge Global FZC LLC. All rights reserved.</span>
          <span>Sharjah, UAE · Coimbatore, India</span>
        </div>
      </div>
    </footer>
  );
}
