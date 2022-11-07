import React from 'react';

export type ColorScheme = 'light' | 'dark';

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    const onChange = (event: MediaQueryListEvent) =>
      setColorScheme(event.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  return colorScheme;
}

export function applyColorScheme(scheme: ColorScheme): void {
  const enableDarkMode = scheme === 'dark';
  enableDarkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}
