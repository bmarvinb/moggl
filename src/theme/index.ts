const fonts = {
  xs: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  base: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  lg: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  xl: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },
}

const screens = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

const common = {
  fonts,
  screens,
}

const lightColors = {
  blue0: '#dceefb',
  blue1: '#b6e0fe',
  blue2: '#84c5f4',
  blue3: '#64b1e8',
  blue4: '#4098d7',
  blue5: '#2680c2',
  blue6: '#186faf',
  blue7: '#0f609b',
  blue8: '#0a558c',
  blue9: '#003e6b',
  yellow0: '#fffbea',
  yellow1: '#fff3c4',
  yellow2: '#fce588',
  yellow3: '#fadb5f',
  yellow4: '#f7c948',
  yellow5: '#fob429',
  yellow6: '#de911d',
  yellow7: '#cb6e17',
  yellow8: '#b44d12',
  yellow9: '#8d2b0b',
  blueGrey0: '#f0f4f8',
  blueGrey1: '#d9e2ec',
  blueGrey2: '#bcccdc',
  blueGrey3: '#9fb3c8',
  blueGrey4: '#829ab1',
  blueGrey5: '#627d98',
  blueGrey6: '#486581',
  blueGrey7: '#334e68',
  blueGrey8: '#243b53',
  blueGrey9: '#102a43',
  cyan0: '#e0fcff',
  cyan1: '#bef8fd',
  cyan2: '#87eaf2',
  cyan3: '#54d1db',
  cyan4: '#38bec9',
  cyan5: '#2cb1bc',
  cyan6: '#14919b',
  cyan7: '#0e7c86',
  cyan8: '#0a6b74',
  cyan9: '#044e54',
  red0: '#ffeeee',
  red1: '#facdcd',
  red2: '#f29b9b',
  red3: '#e66a6a',
  red4: '#d64545',
  red5: '#ba2525',
  red6: '#a61b1b',
  red7: '#911111',
  red8: '#78oaoa',
  red9: '#610404',
}

const lightShadows = {
  shadowXs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  shadowSm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  shadowLg:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  shadowXl:
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  shadow2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  shadowInner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  shadowNone: '0 0 #0000',
}

const darkColors = {
  blue0: '#dceefb',
  blue1: '#b6e0fe',
  blue2: '#84c5f4',
  blue3: '#64b1e8',
  blue4: '#4098d7',
  blue5: '#2680c2',
  blue6: '#186faf',
  blue7: '#0f609b',
  blue8: '#0a558c',
  blue9: '#003e6b',
  yellow0: '#fffbea',
  yellow1: '#fff3c4',
  yellow2: '#fce588',
  yellow3: '#fadb5f',
  yellow4: '#f7c948',
  yellow5: '#fob429',
  yellow6: '#de911d',
  yellow7: '#cb6e17',
  yellow8: '#b44d12',
  yellow9: '#8d2b0b',
  blueGrey0: '#f0f4f8',
  blueGrey1: '#d9e2ec',
  blueGrey2: '#bcccdc',
  blueGrey3: '#9fb3c8',
  blueGrey4: '#829ab1',
  blueGrey5: '#627d98',
  blueGrey6: '#486581',
  blueGrey7: '#334e68',
  blueGrey8: '#243b53',
  blueGrey9: '#102a43',
  cyan0: '#e0fcff',
  cyan1: '#bef8fd',
  cyan2: '#87eaf2',
  cyan3: '#54d1db',
  cyan4: '#38bec9',
  cyan5: '#2cb1bc',
  cyan6: '#14919b',
  cyan7: '#0e7c86',
  cyan8: '#0a6b74',
  cyan9: '#044e54',
  red0: '#ffeeee',
  red1: '#facdcd',
  red2: '#f29b9b',
  red3: '#e66a6a',
  red4: '#d64545',
  red5: '#ba2525',
  red6: '#a61b1b',
  red7: '#911111',
  red8: '#78oaoa',
  red9: '#610404',
}

const darkShadows = {
  shadowXs: 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
  shadowSm:
    'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  shadowMd:
    'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  shadowLg:
    'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  shadowXl:
    'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  shadow2xl: 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)',
  shadowInner: 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  shadowNone: 'box-shadow: 0 0 #0000',
}

export const lightTheme = {
  ...common,
  colors: lightColors,
  shadows: lightShadows,
}

export const darkTheme = {
  ...common,
  colors: darkColors,
  shadows: darkShadows,
}
