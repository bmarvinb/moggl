import { globalCss } from '@stitches/react'
import ProximaNovaBold from './fonts/ProximaNova-Bold.woff'
import ProximaNovaExtrabold from './fonts/ProximaNova-Extrabold.woff'
import ProximaNovaLight from './fonts/ProximaNova-Light.woff'
import ProximaNovaRegular from './fonts/ProximaNova-Regular.woff'
import ProximaNovaSemibold from './fonts/ProximaNova-Semibold.woff'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    fontFamily: 'ProximaNova',
  },
  'html, body': {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    overscrollBehavior: 'none',
    background: 'red',
  },
  '#root': {
    height: '100%',
  },
  svg: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  '@font-face': [
    {
      fontFamily: 'ProximaNova',
      fontWeight: 300,
      src: `local("ProximaNova"), url(${ProximaNovaLight}) format("woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 400,
      src: `local("ProximaNova"), url(${ProximaNovaRegular}) format("woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 500,
      src: `local("ProximaNova"), url(${ProximaNovaSemibold}) format("woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 700,
      src: `local("ProximaNova"), url(${ProximaNovaBold}) format("woff")`,
    },
    {
      fontFamily: 'ProximaNova',
      fontWeight: 800,
      src: `local("ProximaNova"), url(${ProximaNovaExtrabold}) format("woff")`,
    },
  ],
})
