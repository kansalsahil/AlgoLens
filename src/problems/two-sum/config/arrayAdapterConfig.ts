import { ArrayAdapterConfig } from '../../../core/adapters';

/**
 * Example configuration for customizing ArrayAdapter in two-sum problem
 *
 * This shows how problems can customize adapter behavior without modifying
 * the adapter or primitive components.
 */
export const twoSumArrayConfig: ArrayAdapterConfig = {
  // Custom element styling
  getElementStyle: (_value, _index, isHighlighted, theme) => {
    if (isHighlighted) {
      return {
        boxShadow: `0 0 20px ${theme.colors.array.highlightBorder}`,
        transform: 'scale(1.1)',
      };
    }
    return {};
  },

  // Layout customization
  layout: {
    direction: 'horizontal',
    elementSize: { width: 64, height: 64 },
    gap: 4,
  },

  // Event handlers
  onElementClick: (value, index) => {
    console.log(`Clicked element at index ${index} with value ${value}`);
  },

  // Custom animations
  animations: {
    element: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    },
  },
};
