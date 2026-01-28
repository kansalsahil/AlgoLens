import { ANIMATION_CONFIG } from '../config';

export function getHighlightColor(
  type: 'active' | 'compared' | 'selected' | 'completed' | 'error'
): string {
  return ANIMATION_CONFIG.colors.highlight[type];
}

export function getPointerColor(index: number): string {
  const colors = [
    ANIMATION_CONFIG.colors.pointer.primary,
    ANIMATION_CONFIG.colors.pointer.secondary,
    ANIMATION_CONFIG.colors.pointer.tertiary,
  ];
  return colors[index % colors.length];
}
