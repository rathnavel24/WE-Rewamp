import type { CSSProperties } from 'react';

interface IconProps {
  /** Material Symbols Rounded ligature name, e.g. "arrow_forward". */
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size, color, className, style }: IconProps) {
  return (
    <span aria-hidden="true" className={className ? `icon ${className}` : 'icon'} style={{ fontSize: size, color, ...style }}>
      {name}
    </span>
  );
}
