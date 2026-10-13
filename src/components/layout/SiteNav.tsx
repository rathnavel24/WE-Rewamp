import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppLink } from '@/components/ui/AppLink';
import { Icon } from '@/components/ui/Icon';
import { Tile } from '@/components/ui/Tile';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useViewportWidth } from '@/hooks/useViewport';
import { LOGO_ALT, NAV_LINKS } from '@/data/site';
import { ROUTES } from '@/data/routes';
import { VENTURE_LIST } from '@/data/ventures';
import logo from '@/assets/walletedge-logo.png';
import s from './SiteNav.module.css';

const DESKTOP_MIN = 980;

/** Which top-level nav item a pathname belongs to. */
const activeId = (pathname: string) => {
  if (pathname.startsWith('/ventures')) return 'companies';
  const seg = pathname.split('/')[1];
  return seg || 'home';
};

export function SiteNav() {
  const { pathname } = useLocation();
  const { y, progress } = useScrollProgress();
  const desktop = useViewportWidth() > DESKTOP_MIN;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // The nav persists across routes, so close any open menus on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

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

                {l.menu && openMenu === l.id && (
                  <div className={s.menuWrap}>
                    <div className={s.menu}>
                      {VENTURE_LIST.map((v) => (
                        <AppLink key={v.id} to={ROUTES.venture(v.id)} className={s.menuItem}>
                          <Tile icon={v.icon} size="sm" tone={v.tone} />
                          <span className={s.menuText}>
                            <span className={s.menuName}>{v.name}</span>
                            <span className={s.menuLine}>{v.menuLine}</span>
                          </span>
                        </AppLink>
                      ))}
                      <AppLink to={ROUTES.companies} className={s.menuAll}>
                        View the full group
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
            Partner with us
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
            <AppLink key={l.id} to={l.href} className={s.sheetLink}>
              {l.label}
              <Icon name="arrow_forward" size={20} color="var(--color-primary)" />
            </AppLink>
          ))}
        </div>
      )}
    </header>
  );
}
