import React from 'react';

export enum ColorScheme {
  Light = 'Light',
  Dark = 'Dark',
}

export function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
    ColorScheme.Light,
  );
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? ColorScheme.Dark : ColorScheme.Light);
    const onChange = (event: MediaQueryListEvent) =>
      setColorScheme(event.matches ? ColorScheme.Dark : ColorScheme.Light);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  return colorScheme;
}

export function applyColorScheme(scheme: ColorScheme): void {
  const enableDarkMode = scheme === ColorScheme.Dark;
  enableDarkMode
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');
}
