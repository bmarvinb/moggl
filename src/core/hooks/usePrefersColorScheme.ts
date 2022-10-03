import { useState, useEffect } from 'react';

export type ColorScheme = 'light' | 'dark';

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  useEffect(() => {
    if (!window.matchMedia) {
      setColorScheme('light');
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    const onChange = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', onChange);
    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);
  return colorScheme;
}
