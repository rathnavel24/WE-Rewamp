import { Icon } from '@/components/ui';
import { CLIENTS } from '@/data/clients';
import s from './TrustedBy.module.css';

const ICONS = ['verified_user', 'apartment', 'shield', 'health_and_safety', 'security'];

/** Build a marquee row; the list is doubled so the -50% loop is seamless. */
const toRow = (names: string[]) => {
  const items = names.map((name, i) => ({
    name,
    icon: name.startsWith('Emaar') ? 'apartment' : ICONS[i % ICONS.length],
    ink: i % 2 ? 'var(--color-accent)' : 'var(--color-primary)'
  }));
  return [...items, ...items];
};

const half = Math.ceil(CLIENTS.length / 2);
const ROWS = [
  { dir: 'left', speed: '55', items: toRow(CLIENTS.slice(0, half)) },
  { dir: 'right', speed: '60', items: toRow(CLIENTS.slice(half)) }
];

export function TrustedBy() {
  return (
    <section data-screen-label="Trusted by" className={s.section}>
      <p data-reveal="fade" className={`t-label ${s.label}`}>
        Trusted by leading insurers &amp; enterprises in the region
      </p>
      <div className={s.mask}>
        {ROWS.map((row) => (
          <div key={row.dir} className={s.row} data-marquee={row.dir} data-speed={row.speed}>
            {row.items.map((c, i) => (
              <div key={i} className={s.client} aria-hidden={i >= row.items.length / 2 || undefined}>
                <Icon name={c.icon} size={19} color={c.ink} />
                {c.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
