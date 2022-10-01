import { styled } from 'theme/config'

export const Button = styled('button', {
  position: 'relative',
  borderRadius: '$md',
  color: '$neutral11',
  cursor: 'pointer',
  boxShadow: 'none',
  border: '1px solid transparent',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  outlineColor: '$primary4',
  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
    outlineWidth: '$space$1',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
    outlineWidth: '$space$1',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  variants: {
    variant: {
      icon: {},
    },
    color: {
      light: {
        borderColor: '$neutral6',
        background: 'transparent',
        color: '$neutral9',
        '&:hover': {
          color: '$blue5',
          background: '$lightBgHover',
        },
      },
      primary: {
        backgroundColor: '$primary5',
        color: '$lightTextColor',
        '&:hover': {
          backgroundColor: '$primary6',
        },
      },
      danger: {
        backgroundColor: '$red5',
        color: '$lightTextColor',
        outlineColor: '$red4',
        '&:hover': {
          backgroundColor: '$red6',
        },
      },
      transparent: {
        border: 'none',
        color: '$neutral8',
        background: 'transparent',
        '&:hover': {
          color: '$primary5',
        },
        '&:focus-visible': {
          outlineOffset: 0,
        },
        '&:focus': {
          outlineOffset: 0,
        },
      },
    },
    shape: {
      rounded: {
        borderRadius: '$full',
      },
    },
    fill: {
      solid: {},
      outline: {},
    },
    size: {
      sm: {
        fontSize: '$sm',
        lineHeight: '$sm',
        py: '$2',
        px: '$4',
      },
      md: {
        fontSize: '$base',
        lineHeight: '$base',
        py: '$3',
        px: '$5',
      },
      lg: {
        fontSize: '$lg',
        lineHeight: '$lg',
        py: '$4',
        px: '$6',
      },
      xl: {
        fontSize: '$xl',
        lineHeight: '$xl',
        py: '$5',
        px: '$7',
      },
    },
  },
  compoundVariants: [
    {
      color: 'light',
      fill: 'outline',
      css: {
        background: 'transparent',
        borderColor: '$neutral5',
        color: '$neutral5',
        '&:hover': {
          color: '$lightTextColor',
          background: '$lightBgHover',
        },
      },
    },
    {
      color: 'primary',
      fill: 'outline',
      css: {
        background: 'transparent',
        borderColor: '$primary5',
        color: '$primary5',
        '&:hover': {
          color: '$lightTextColor',
          background: '$primary5',
        },
      },
    },
    {
      color: 'danger',
      fill: 'outline',
      css: {
        background: 'transparent',
        borderColor: '$red5',
        color: '$red5',
        '&:hover': {
          color: '$lightTextColor',
          background: '$red5',
        },
      },
    },
    {
      variant: 'icon',
      size: 'sm',
      css: {
        padding: '$2',
      },
    },
    {
      variant: 'icon',
      size: 'md',
      css: {
        padding: '$3',
      },
    },
    {
      variant: 'icon',
      size: 'lg',
      css: {
        padding: '$4',
      },
    },
    {
      variant: 'icon',
      size: 'xl',
      css: {
        padding: '$5',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    fill: 'solid',
  },
})
