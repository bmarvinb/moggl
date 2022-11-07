import React from 'react';

type ColorScheme = 'Light' | 'Dark';

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('Light');
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'Dark' : 'Light');
    const onChange = (event: MediaQueryListEvent) =>
      setColorScheme(event.matches ? 'Dark' : 'Light');
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  return colorScheme;
}

export function applyColorScheme(scheme: ColorScheme): void {
  const enableDarkMode = scheme === 'Dark';
  enableDarkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}
