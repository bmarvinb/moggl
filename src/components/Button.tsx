import { styled } from 'theme/config'

export const Button = styled('button', {
  $$outlineOffset: '2px',
  $$borderColor: 'transparent',
  $$borderRadius: '$radii$md',

  position: 'relative',
  cursor: 'pointer',
  boxShadow: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid',
  borderColor: '$borderColor',
  borderRadius: '$$borderRadius',
  fontSize: '$$fontSize',
  lineHeight: '$$lineHeight',
  outlineColor: '$$outlineColor',
  padding: '$$py $$px',

  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineOffset: '$$outlineOffset',
    outlineWidth: '$space$1',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineOffset: '$$outlineOffset',
    outlineWidth: '$space$1',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  variants: {
    variant: {
      icon: {
        padding: '$$py',
      },
    },
    color: {
      primary: {
        $$bgColor: '$colors$primary5',
        $$hoverBgColor: '$colors$primary6',
        $$color: '$colors$lightTextColor',
        $$hoverColor: '$colors$lightTextColor',
        $$outlineColor: '$colors$primary4',
      },
      danger: {
        $$bgColor: '$colors$red5',
        $$hoverBgColor: '$colors$red6',
        $$color: '$colors$lightTextColor',
        $$hoverColor: '$colors$lightTextColor',
        $$outlineColor: '$colors$red4',
      },
      transparent: {
        $$color: '$colors$neutral8',
        $$hoverColor: '$colors$primary5',
        $$background: 'transparent',
        $$outlineColor: '$colors$primary4',
        $$outlineOffset: 0,
      },
    },
    shape: {
      rounded: {
        $$borderRadius: '$radii$full',
      },
    },
    fill: {
      solid: {
        background: '$$bgColor',
        color: '$$color',
        borderColor: '$$borderColor',
        '&:hover': {
          background: '$$hoverBgColor',
          color: '$$hoverColor',
        },
      },
      outline: {
        background: 'transparent',
        color: '$$bgColor',
        borderColor: '$$bgColor',
        '&:hover': {
          background: '$$bgColor',
          color: '$$color',
        },
      },
    },
    size: {
      sm: {
        $$fontSize: '$fontSizes$sm',
        $$lineHeight: '$lineHeights$sm',
        $$py: '$space$2',
        $$px: '$space$4',
      },
      md: {
        $$fontSize: '$fontSizes$base',
        $$lineHeight: '$lineHeights$base',
        $$py: '$space$3',
        $$px: '$space$5',
      },
      lg: {
        $$fontSize: '$fontSizes$lg',
        $$lineHeight: '$lineHeights$lg',
        $$py: '$space$4',
        $$px: '$space$6',
      },
      xl: {
        $$fontSize: '$fontSizes$xl',
        $$lineHeight: '$lineHeights$xl',
        $$py: '$space$5',
        $$px: '$space$7',
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md',
    color: 'transparent',
    fill: 'solid',
  },
})
