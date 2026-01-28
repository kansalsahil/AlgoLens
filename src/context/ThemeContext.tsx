import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Theme, themes } from '../config/themes';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (themeId: string) => void;
  currentThemeId: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    // Load from localStorage or default to light
    return localStorage.getItem('algolens-theme') || 'light';
  });

  const theme = useMemo(() => themes[currentThemeId] || themes.light, [currentThemeId]);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    const { colors } = theme;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-info', colors.info);
    root.style.setProperty('--color-code-bg', colors.codeBackground);
    root.style.setProperty('--color-code-highlight', colors.codeHighlight);

    // Set body background
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
  }, [theme]);

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('algolens-theme', themeId);
  };

  const value: ThemeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      currentThemeId,
    }),
    [theme, currentThemeId]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
