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

export function HashMapIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill={color} fillOpacity="0.1" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill={color} fillOpacity="0.1" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill={color} fillOpacity="0.1" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill={color} fillOpacity="0.1" />
    </svg>
  );
}

export function StackIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="4" width="14" height="3.5" rx="1" fill={color} fillOpacity="0.1" />
      <rect x="5" y="10" width="14" height="3.5" rx="1" fill={color} fillOpacity="0.1" />
      <rect x="5" y="16" width="14" height="3.5" rx="1" fill={color} fillOpacity="0.1" />
    </svg>
  );
}

export function QueueIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="9" width="4" height="6" rx="1" fill={color} fillOpacity="0.1" />
      <rect x="10" y="9" width="4" height="6" rx="1" fill={color} fillOpacity="0.1" />
      <rect x="17" y="9" width="4" height="6" rx="1" fill={color} fillOpacity="0.1" />
      <path d="M2 8 L22 8 M2 16 L22 16" strokeWidth="1" />
    </svg>
  );
}

export function TwoPointersIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 12 L3 12 M3 12 L5.5 9.5 M3 12 L5.5 14.5" />
      <path d="M16 12 L21 12 M21 12 L18.5 9.5 M21 12 L18.5 14.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

export function BinarySearchIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8 L12 16 M8 12 L16 12" />
    </svg>
  );
}

export function RecursiveIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3 L12 10 M12 10 L9.5 7.5 M12 10 L14.5 7.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <path d="M12 14 L12 21 M12 14 L9.5 16.5 M12 14 L14.5 16.5" />
    </svg>
  );
}

export function IterativeIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M 12 3 A 9 9 0 1 1 12 21 A 9 9 0 0 1 12 3" />
      <path d="M 15 9 L 12 12 L 15 15" />
    </svg>
  );
}

export function StringIcon({ className = '', size = 24, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 7 L6 17 M18 7 L18 17" />
      <path d="M9 12 L15 12" />
      <path d="M7 7 L17 7 M7 17 L17 17" />
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
    case 'Hash Map':
      return HashMapIcon;
    case 'Stack':
      return StackIcon;
    case 'Queue':
      return QueueIcon;
    case 'Two Pointers':
      return TwoPointersIcon;
    case 'Binary Search':
      return BinarySearchIcon;
    case 'Recursive':
      return RecursiveIcon;
    case 'Iterative':
      return IterativeIcon;
    case 'String':
      return StringIcon;
    default:
      return null;
  }
}
