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
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
    outlineWidth: '$space$1',
  },
  variants: {
    variant: {
      icon: {},
    },
    color: {
      light: {
        borderColor: '$neutral9',
        background: 'transparent',
        color: '$neutral11',
        '&:hover': {
          background: '$lightBgHover',
        },
        '&:focus': {
          outlineColor: '$primary8',
        },
        '&:focus-visible': {
          outlineColor: '$primary8',
        },
      },
      primary: {
        backgroundColor: '$primary9',
        color: '$lightTextColor',
        '&:hover': {
          backgroundColor: '$primary10',
        },
        '&:focus': {
          outlineColor: '$primary8',
        },
        '&:focus-visible': {
          outlineColor: '$primary8',
        },
      },
      danger: {
        backgroundColor: '$red9',
        color: '$lightTextColor',
        '&:hover': {
          backgroundColor: '$red10',
        },
        '&:focus': {
          outlineColor: '$red8',
        },
        '&:focus-visible': {
          outlineColor: '$red8',
        },
      },
    },
    shape: {
      rounded: {},
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
        borderColor: '$neutral9',
        color: '$neutral9',
        '&:hover': {
          color: '$lightTextColor',
          background: '$neutral9',
        },
      },
    },
    {
      color: 'primary',
      fill: 'outline',
      css: {
        background: 'transparent',
        borderColor: '$primary9',
        color: '$primary9',
        '&:hover': {
          color: '$lightTextColor',
          background: '$primary9',
        },
      },
    },
    {
      color: 'danger',
      fill: 'outline',
      css: {
        background: 'transparent',
        borderColor: '$red9',
        color: '$red9',
        '&:hover': {
          color: '$lightTextColor',
          background: '$red9',
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
    color: 'light',
    fill: 'solid',
  },
})
