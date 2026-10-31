import { Icon } from '../Icon';

interface ArrowTextProps {
  text: string;
  icon?: string;
  size?: number;
  /** Class for the icon (colour and hover motion stay with the caller). */
  iconClassName?: string;
}

/** Link text ending in an arrow that wraps together with the last word, so the arrow never sits alone on a line. */
export function ArrowText({ text, icon = 'arrow_outward', size = 18, iconClassName }: ArrowTextProps) {
  const cut = text.lastIndexOf(' ');
  const head = cut === -1 ? '' : text.slice(0, cut + 1);
  const last = cut === -1 ? text : text.slice(cut + 1);
  return (
    <>
      {head}
      <span style={{ whiteSpace: 'nowrap' }}>
        {last}
        <Icon name={icon} size={size} className={iconClassName} />
      </span>
    </>
  );
}
