import { useState, useEffect } from 'react';

export enum ColorScheme {
  Light = 'Light',
  Dark = 'Dark',
}

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    ColorScheme.Light,
  );
  useEffect(() => {
    if (!window.matchMedia) {
      setColorScheme(ColorScheme.Light);
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? ColorScheme.Dark : ColorScheme.Light);
    const onChange = (event: MediaQueryListEvent) =>
      setColorScheme(event.matches ? ColorScheme.Dark : ColorScheme.Light);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  return colorScheme;
}
