export const ANIMATION_CONFIG = {
  durations: {
    default: 800,
    fast: 400,
    slow: 1200,
    instant: 0,
  },

  speeds: {
    '0.25x': 0.25,
    '0.5x': 0.5,
    '1x': 1,
    '2x': 2,
    '4x': 4,
  },

  easing: {
    default: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  colors: {
    highlight: {
      active: '#3b82f6', // blue-500
      compared: '#8b5cf6', // violet-500
      selected: '#10b981', // emerald-500
      completed: '#6b7280', // gray-500
      error: '#ef4444', // red-500
    },
    pointer: {
      primary: '#3b82f6', // blue-500
      secondary: '#8b5cf6', // violet-500
      tertiary: '#10b981', // emerald-500
    },
    // Data structure specific colors
    dataStructures: {
      array: {
        primary: '#2563eb', // blue-600
        secondary: '#3b82f6', // blue-500
        background: '#dbeafe', // blue-100
        border: '#93c5fd', // blue-300
      },
      linkedList: {
        primary: '#059669', // emerald-600
        secondary: '#10b981', // emerald-500
        background: '#d1fae5', // emerald-100
        border: '#6ee7b7', // emerald-300
      },
      tree: {
        primary: '#7c3aed', // violet-600
        secondary: '#8b5cf6', // violet-500
        background: '#ede9fe', // violet-100
        border: '#c4b5fd', // violet-300
      },
    },
  },
};
