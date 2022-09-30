import {
  slate,
  blue,
  red,
  green,
  yellow,
  cyan,
  slateDark,
  blueDark,
  redDark,
  greenDark,
  yellowDark,
  cyanDark,
  blackA,
  whiteA,
} from '@radix-ui/colors'
import { createStitches, PropertyValue } from '@stitches/react'

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
      ...red,
      ...green,
      ...cyan,
      ...whiteA,
      ...blackA,

      primary1: blue.blue1,
      primary2: blue.blue2,
      primary3: blue.blue3,
      primary4: blue.blue4,
      primary5: blue.blue5,
      primary6: blue.blue6,
      primary7: blue.blue7,
      primary8: blue.blue8,
      primary9: blue.blue9,
      primary10: blue.blue10,
      primary11: blue.blue11,
      secondary1: yellow.yellow1,
      secondary2: yellow.yellow2,
      secondary3: yellow.yellow3,
      secondary4: yellow.yellow4,
      secondary5: yellow.yellow5,
      secondary6: yellow.yellow6,
      secondary7: yellow.yellow7,
      secondary8: yellow.yellow8,
      secondary9: yellow.yellow9,
      secondary10: yellow.yellow10,
      secondary11: yellow.yellow11,
      neutral1: slate.slate1,
      neutral2: slate.slate2,
      neutral3: slate.slate3,
      neutral4: slate.slate4,
      neutral5: slate.slate5,
      neutral6: slate.slate6,
      neutral7: slate.slate7,
      neutral8: slate.slate8,
      neutral9: slate.slate9,
      neutral10: slate.slate10,
      neutral11: slate.slate11,

      lightTextColor: slate.slate1,
      lightBgHover: blackA.blackA3,
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
      semibold: 600,
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
    xs: '(min-width: 475px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
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
    ...redDark,
    ...greenDark,
    ...yellowDark,
    ...cyanDark,

    primary1: blueDark.blue1,
    primary2: blueDark.blue2,
    primary3: blueDark.blue3,
    primary4: blueDark.blue4,
    primary6: blueDark.blue5,
    primary7: blueDark.blue6,
    primary8: blueDark.blue7,
    primary9: blueDark.blue8,
    primary10: blueDark.blue9,
    primary11: blueDark.blue10,
    primary12: blueDark.blue11,
    secondary1: yellowDark.yellow1,
    secondary2: yellowDark.yellow2,
    secondary3: yellowDark.yellow3,
    secondary4: yellowDark.yellow4,
    secondary5: yellowDark.yellow5,
    secondary6: yellowDark.yellow6,
    secondary7: yellowDark.yellow7,
    secondary8: yellowDark.yellow8,
    secondary9: yellowDark.yellow9,
    secondary10: yellowDark.yellow10,
    secondary11: yellowDark.yellow11,
    neutral1: slateDark.slate1,
    neutral2: slateDark.slate2,
    neutral3: slateDark.slate3,
    neutral4: slateDark.slate4,
    neutral5: slateDark.slate5,
    neutral6: slateDark.slate6,
    neutral7: slateDark.slate7,
    neutral8: slateDark.slate8,
    neutral9: slateDark.slate9,
    neutral10: slateDark.slate10,
    neutral11: slateDark.slate11,

    lightBgHover: whiteA.whiteA3,
  },
})
