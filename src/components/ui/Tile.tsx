import type { CSSProperties } from 'react';

interface TileProps {
  icon: string;
  /** Box size in px. */
  size: number;
  radius: number;
  iconSize: number;
  bg: string;
  ink: string;
  style?: CSSProperties;
}

/** Rounded square holding a Material icon — the design's most-repeated element. */
export function Tile({ icon, size, radius, iconSize, bg, ink, style }: TileProps) {
  return (
    <span
      aria-hidden="true"
      className="tile"
      style={{ width: size, height: size, borderRadius: radius, fontSize: iconSize, ['--tile-bg' as string]: bg, ['--tile-ink' as string]: ink, ...style }}
    >
      {icon}
    </span>
  );
}
