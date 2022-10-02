import { createStitches, PropertyValue } from '@stitches/react'
import {
  blackA,
  cyan,
  cyanDark,
  neutral,
  neutralDark,
  primary,
  primaryDark,
  red,
  redDark,
  secondary,
  secondaryDark,
  whiteA,
} from 'core/theme/colors'

export const media = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...primary,
      ...secondary,
      ...neutral,
      ...red,
      ...cyan,
      ...blackA,
      ...whiteA,
      lightTextColor: neutral.neutral1,
      lightBgHover: blackA.blackA3,
      navBg: primary.primary5,
      timerBg: neutral.neutral1,
    },
    space: {
      1: '0.125rem',
      2: '0.25rem',
      3: '0.375rem',
      4: '0.5rem',
      5: '0.625rem',
      6: '0.75rem',
      7: '0.875rem',
      8: '1rem',
      9: '1.25rem',
      10: '1.5rem',
      11: '1.75rem',
      12: '2rem',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fonts: {},
    fontWeights: {
      light: 300,
      normal: 400,
      semibold: 500,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      xs: '1rem',
      sm: '1.25rem',
      base: '1.5rem',
      lg: '1.75rem',
      xl: '1.75rem',
      '2xl': '2rem',
      '3xl': '2.25rem',
      '4xl': '2.5rem',
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    zIndices: {},
    transitions: {},
  },
  media: {
    xs: `(min-width: ${media.xs}px)`,
    sm: `(min-width: ${media.sm}px)`,
    md: `(min-width: ${media.md}px)`,
    lg: `(min-width: ${media.lg}px)`,
    xl: `(min-width: ${media.xl}px)`,
  },
  utils: {
    p: (value: PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
})

export const darkTheme = createTheme({
  colors: {
    ...primaryDark,
    ...secondaryDark,
    ...neutralDark,
    ...redDark,
    ...cyanDark,
    lightBgHover: whiteA.whiteA3,
    navBg: primaryDark.primary5,
    timerBg: neutralDark.neutral1,
  },
})
