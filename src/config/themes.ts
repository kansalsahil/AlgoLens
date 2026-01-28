export interface Theme {
  id: string;
  name: string;
  colors: {
    // Main UI
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;

    // Status colors
    success: string;
    error: string;
    warning: string;
    info: string;

    // Data structure colors (unified indigo/blue palette)
    array: {
      primary: string;
      secondary: string;
      background: string;
      border: string;
      text: string;
      highlightBg: string;
      highlightBorder: string;
      highlightText: string;
    };
    linkedList: {
      primary: string;
      secondary: string;
      background: string;
      border: string;
      text: string;
      highlightBg: string;
      highlightBorder: string;
      highlightText: string;
    };
    tree: {
      primary: string;
      secondary: string;
      background: string;
      border: string;
      text: string;
      highlightBg: string;
      highlightBorder: string;
      highlightText: string;
    };

    // Code highlighting
    codeBackground: string;
    codeHighlight: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      // Main palette
      primary: '#1e40af',       // Deep blue
      secondary: '#3b82f6',     // Blue
      accent: '#6366f1',        // Indigo
      background: '#f8fafc',    // Soft slate background
      surface: '#ffffff',       // Pure white
      text: '#0f172a',          // Slate 900
      textSecondary: '#64748b', // Slate 500
      border: '#e2e8f0',        // Slate 200

      // Status colors
      success: '#16a34a',       // Green 600
      error: '#dc2626',         // Red 600
      warning: '#d97706',       // Amber 600
      info: '#2563eb',          // Blue 600

      // Unified Indigo/Blue palette for all data structures
      array: {
        primary: '#4f46e5',        // Indigo 600
        secondary: '#818cf8',      // Indigo 400
        background: '#f5f5f5',     // Neutral gray
        border: '#d1d5db',         // Gray 300
        text: '#1e1b4b',           // Indigo 950
        highlightBg: '#e0e7ff',    // Indigo 100 - soft fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#312e81',  // Indigo 900
      },
      linkedList: {
        primary: '#4f46e5',        // Indigo 600
        secondary: '#818cf8',      // Indigo 400
        background: '#f5f5f5',     // Neutral gray
        border: '#d1d5db',         // Gray 300
        text: '#1e1b4b',           // Indigo 950
        highlightBg: '#e0e7ff',    // Indigo 100 - soft fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#312e81',  // Indigo 900
      },
      tree: {
        primary: '#4f46e5',        // Indigo 600
        secondary: '#818cf8',      // Indigo 400
        background: '#f5f5f5',     // Neutral gray
        border: '#d1d5db',         // Gray 300
        text: '#1e1b4b',           // Indigo 950
        highlightBg: '#e0e7ff',    // Indigo 100 - soft fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#312e81',  // Indigo 900
      },
      codeBackground: '#1e293b',
      codeHighlight: 'rgba(59, 130, 246, 0.15)',
    },
  },

  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      // Main palette
      primary: '#60a5fa',       // Blue 400
      secondary: '#38bdf8',     // Sky 400
      accent: '#a78bfa',        // Violet 400
      background: '#0f172a',    // Slate 900
      surface: '#1e293b',       // Slate 800
      text: '#f1f5f9',          // Slate 100
      textSecondary: '#94a3b8', // Slate 400
      border: '#334155',        // Slate 700

      // Status colors
      success: '#4ade80',       // Green 400
      error: '#f87171',         // Red 400
      warning: '#fbbf24',       // Amber 400
      info: '#60a5fa',          // Blue 400

      // Unified Indigo/Blue palette for all data structures
      array: {
        primary: '#818cf8',        // Indigo 400
        secondary: '#a5b4fc',      // Indigo 300
        background: '#1e293b',     // Slate 800
        border: '#475569',         // Slate 600
        text: '#e0e7ff',           // Indigo 100
        highlightBg: '#3730a3',    // Indigo 800 - darker fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#e0e7ff',  // Indigo 100
      },
      linkedList: {
        primary: '#818cf8',        // Indigo 400
        secondary: '#a5b4fc',      // Indigo 300
        background: '#1e293b',     // Slate 800
        border: '#475569',         // Slate 600
        text: '#e0e7ff',           // Indigo 100
        highlightBg: '#3730a3',    // Indigo 800 - darker fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#e0e7ff',  // Indigo 100
      },
      tree: {
        primary: '#818cf8',        // Indigo 400
        secondary: '#a5b4fc',      // Indigo 300
        background: '#1e293b',     // Slate 800
        border: '#475569',         // Slate 600
        text: '#e0e7ff',           // Indigo 100
        highlightBg: '#3730a3',    // Indigo 800 - darker fill
        highlightBorder: '#6366f1', // Indigo 500
        highlightText: '#e0e7ff',  // Indigo 100
      },
      codeBackground: '#0f172a',
      codeHighlight: 'rgba(56, 189, 248, 0.15)',
    },
  },
};

export const themeList = Object.values(themes);
