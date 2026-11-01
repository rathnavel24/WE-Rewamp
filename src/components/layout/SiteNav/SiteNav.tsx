import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useViewportWidth } from '@/hooks/useViewport';
import { LOGO_ALT, NAV_LINKS } from '@/content/site';
import { ROUTES } from '@/config/routes';
import { SERVICES, serviceHref } from '@/content/services';
import { COUNTRY_LABELS, GROUP_COMPANIES, companyHref } from '@/content/companies';
import { companyLogo } from '@/content/assets';
import logo from '@/assets/brand/walletedge-logo.png';
import s from './SiteNav.module.css';

const DESKTOP_MIN = 980;

/** Which top-level nav item a pathname belongs to. */
const activeId = (pathname: string) => {
  if (pathname.startsWith('/ventures')) return 'services';
  const seg = pathname.split('/')[1];
  return seg || 'home';
};

export function SiteNav() {
  const { pathname } = useLocation();
  const { y, progress } = useScrollProgress();
  const desktop = useViewportWidth() > DESKTOP_MIN;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // The nav persists across routes, so close any open menus on navigation
  // (adjusted during render rather than in an effect, to avoid an extra paint).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Escape closes whichever menu is open.
  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, openMenu]);

  const active = activeId(pathname);
  const scrolled = y > 24;

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <nav className={s.nav} aria-label="Main">
        <AppLink to={ROUTES.home} aria-label="WalletEdge Global home" className={s.brand}>
          <img src={logo} alt={LOGO_ALT} className={s.logo} />
        </AppLink>

        {desktop && (
          <div className={s.links}>
            {NAV_LINKS.map((l) => (
              <div
                key={l.id}
                className={s.item}
                onMouseEnter={() => l.menu && setOpenMenu(l.id)}
                onMouseLeave={() => setOpenMenu(null)}
                // Keyboard: tabbing onto the link opens its menu; tabbing out of the item closes it.
                onFocus={() => l.menu && setOpenMenu(l.id)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
                }}
              >
                <AppLink
                  to={l.href}
                  className={`${s.link} ${active === l.id ? s.active : ''}`}
                  aria-current={active === l.id ? 'page' : undefined}
                  aria-haspopup={l.menu ? 'true' : undefined}
                  aria-expanded={l.menu ? openMenu === l.id : undefined}
                >
                  {l.label}
                  {l.menu && <Icon name="expand_more" size={18} />}
                </AppLink>

                {l.menu === 'companies' && openMenu === l.id && (
                  <div className={s.menuWrap}>
                    <div className={s.menu}>
                      {GROUP_COMPANIES.map((c) => (
                        <AppLink key={c.name} to={companyHref(c)} className={s.menuItem}>
                          <span className={s.menuLogo}>{companyLogo(c) && <img src={companyLogo(c)} alt="" />}</span>
                          <span className={s.menuText}>
                            <span className={s.menuName}>{c.name}</span>
                            <span className={s.menuLine}>
                              {c.parent ? 'Parent company' : SERVICES.find((x) => x.id === c.service)?.title} ·{' '}
                              {COUNTRY_LABELS[c.country]}
                            </span>
                          </span>
                        </AppLink>
                      ))}
                      <AppLink to={l.href} className={s.menuAll}>
                        View all companies
                        <Icon name="arrow_outward" size={18} />
                      </AppLink>
                    </div>
                  </div>
                )}
                {l.menu === 'services' && openMenu === l.id && (
                  <div className={s.menuWrap}>
                    <div className={s.menu}>
                      {SERVICES.map((v) => (
                        <AppLink key={v.id} to={serviceHref(v.id)} className={s.menuItem}>
                          <Tile icon={v.icon} size="sm" tone={v.tone} />
                          <span className={s.menuText}>
                            <span className={s.menuName}>{v.title}</span>
                            <span className={s.menuLine}>{v.tags.join(' · ')}</span>
                          </span>
                        </AppLink>
                      ))}
                      <AppLink to={ROUTES.services} className={s.menuAll}>
                        View all services
                        <Icon name="arrow_outward" size={18} />
                      </AppLink>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={s.actions}>
          <AppLink to={ROUTES.contact} className={s.cta}>
            Connect with us
            <Icon name="arrow_outward" size={18} />
          </AppLink>
          {!desktop && (
            <button
              type="button"
              className={s.burger}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? 'close' : 'menu'}
            </button>
          )}
        </div>

        <div className={s.progressTrack} aria-hidden="true">
          <div className={s.progressBar} style={{ width: `${(progress * 100).toFixed(2)}%` }} />
        </div>
      </nav>

      {!desktop && mobileOpen && <div className={s.scrim} aria-hidden="true" onClick={() => setMobileOpen(false)} />}
      {!desktop && mobileOpen && (
        <div className={s.sheet}>
          {NAV_LINKS.map((l) => (
            <div key={l.id}>
              <AppLink
                to={l.href}
                className={`${s.sheetLink} ${active === l.id ? s.sheetActive : ''}`}
                aria-current={active === l.id ? 'page' : undefined}
              >
                {l.label}
                <Icon name="arrow_forward" size={20} color="var(--color-primary)" />
              </AppLink>
              {/* Phones get the services menu inline, so every service is one tap from anywhere. */}
              {l.menu === 'companies' && (
                <div className={`${s.sheetSub} ${s.sheetSubList}`}>
                  {GROUP_COMPANIES.map((c) => (
                    <AppLink key={c.name} to={companyHref(c)} className={s.sheetSubLink}>
                      {c.name}
                    </AppLink>
                  ))}
                </div>
              )}
              {l.menu === 'services' && (
                <div className={s.sheetSub}>
                  {SERVICES.map((v) => (
                    <AppLink key={v.id} to={serviceHref(v.id)} className={s.sheetSubLink}>
                      <Tile icon={v.icon} size="xs" tone={v.tone} />
                      {v.title}
                    </AppLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
