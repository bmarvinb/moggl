import { globalCss } from '@stitches/react';

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },
  'html, body': {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    fontFamily: 'ProximaNova',
    color: '$colors$neutral9',
  },
  '#root': {
    height: '100%',
  },
  ul: {
    padding: 0,
    margin: 0,
  },
  svg: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  '@font-face': [
    {
      fontFamily: 'ProximaNova',
      fontWeight: 300,
      src: `local("ProximaNova"), url("fonts/ProximaNova-Light.woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 400,
      src: `local("ProximaNova"), url("fonts/ProximaNova-Regular.woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 500,
      src: `local("ProximaNova"), url("fonts/ProximaNova-Semibold.woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 700,
      src: `local("ProximaNova"), url("fonts/ProximaNova-Bold.woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 800,
      src: `local("ProximaNova"), url("fonts/ProximaNova-Extrabold.woff")`,
    },
  ],
});
