import { clientLogo } from '@/content/assets';
import { CLIENTS } from '@/content/clients';
import s from './TrustedBy.module.css';

/** One marquee row; the list is doubled so the -50% loop is seamless. */
const ITEMS = CLIENTS.map((name) => ({ name, logo: clientLogo(name) }));
const ROW = [...ITEMS, ...ITEMS];

export function TrustedBy() {
  return (
    <section data-screen-label="Trusted by" className={s.section}>
      <p data-reveal="fade" className={`t-label ${s.label}`}>
        Trusted by leading insurers &amp; enterprises in the region
      </p>
      <div className={s.mask}>
        <div className={s.row} data-marquee="left" data-speed="55">
          {ROW.map((c, i) => (
            <div key={i} className={s.client} aria-hidden={i >= ITEMS.length || undefined}>
              {c.logo ? (
                <img src={c.logo} alt={c.name} className={s.logo} loading="lazy" />
              ) : (
                <span className={s.wordmark}>{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
