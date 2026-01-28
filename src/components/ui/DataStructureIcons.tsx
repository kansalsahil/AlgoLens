import { ProblemTag } from '../../core/types';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function ArrayIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" fill={color} fillOpacity="0.1" />
      <line x1="7" y1="5" x2="7" y2="19" />
      <line x1="11" y1="5" x2="11" y2="19" />
      <line x1="15" y1="5" x2="15" y2="19" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

export function LinkedListIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="12" r="3" fill={color} fillOpacity="0.2" />
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.2" />
      <circle cx="18" cy="12" r="3" fill={color} fillOpacity="0.2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="12" x2="3" y2="12" />
    </svg>
  );
}

export function TreeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="4" r="2.5" fill={color} fillOpacity="0.2" />
      <line x1="12" y1="6.5" x2="12" y2="9" />
      <circle cx="8" cy="12" r="2" fill={color} fillOpacity="0.2" />
      <circle cx="16" cy="12" r="2" fill={color} fillOpacity="0.2" />
      <line x1="8" y1="14" x2="8" y2="17" />
      <line x1="16" y1="14" x2="16" y2="17" />
      <circle cx="6" cy="20" r="1.5" fill={color} fillOpacity="0.2" />
      <circle cx="10" cy="20" r="1.5" fill={color} fillOpacity="0.2" />
      <circle cx="14" cy="20" r="1.5" fill={color} fillOpacity="0.2" />
      <circle cx="18" cy="20" r="1.5" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function getIconForTag(tag: ProblemTag) {
  switch (tag) {
    case 'Array':
      return ArrayIcon;
    case 'Linked List':
      return LinkedListIcon;
    case 'Tree':
      return TreeIcon;
    default:
      return null;
  }
}
