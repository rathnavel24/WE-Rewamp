import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { CONTACT_EMAIL, NAV_LINKS, OFFICES } from '@/data/site';
import { ROUTES } from '@/data/routes';
import { VENTURE_LIST } from '@/data/ventures';
import logo from '@/assets/walletedge-logo.png';
import s from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.grid}>
          <div className={s.brandCol}>
            <img src={logo} alt="WalletEdge" className={s.logo} />
            <p className={s.blurb}>
              The parent group behind businesses in IT &amp; BPO, financial services, consulting and healthcare across the UAE and India.
            </p>
          </div>

          <div className={s.col}>
            <span className={s.heading}>Group</span>
            {NAV_LINKS.map((l) => (
              <AppLink key={l.id} to={l.href} className={s.link}>
                {l.label}
              </AppLink>
            ))}
          </div>

          <div className={s.col}>
            <span className={s.heading}>Ventures</span>
            {VENTURE_LIST.map((v) => (
              <AppLink key={v.id} to={ROUTES.venture(v.id)} className={s.link}>
                {v.footerName ?? v.name}
              </AppLink>
            ))}
          </div>

          {OFFICES.map((o) => (
            <div key={o.country} className={s.col}>
              <span className={s.heading}>{o.short}</span>
              <span className={s.address}>
                {o.addressLines[0]}
                <br />
                {o.addressLines[1]}
              </span>
              <a href={o.phone.href} className={s.link}>
                {o.phone.label}
              </a>
            </div>
          ))}
        </div>

        <div className={s.bottom}>
          <span>© 2026 Wallet Edge Global FZC LLC. All rights reserved.</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className={s.mail}>
            <Icon name="mail" size={18} color="#03643B" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
