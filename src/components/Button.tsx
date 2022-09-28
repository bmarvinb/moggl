import { styled } from 'theme/config'

export const Button = styled('button', {
  position: 'relative',
  fontWeight: 'bold',
  fontSize: '$sm',
  lineHeight: '$sm',
  borderRadius: '$md',
  color: '$neutral0',
  padding: '$2 $5',
  transition: 'all 150ms ease',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineWidth: '2px',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  variants: {
    use: {
      basic: {
        boxShadow: 'none',
      },
      raised: {
        boxShadow: '$sm',
      },
      icon: {
        display: 'inline-flex',
        width: 'max-content',
        height: 'max-content',
        padding: '$1',
        boxShadow: 'none',
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          color: '$neutral1',
        },
        '&:active': {
          color: '$neutral2',
        },
      },
      FAB: {
        boxShadow: '$sm',
        borderRadius: '100%',
        display: 'inline-flex',
        padding: '0.5rem',
        width: 'fit-content',
        border: '1px solid $neutral2',
      },
    },
    color: {
      primary: {
        backgroundColor: '$primary4',
        boxShadow: '$sm',
        '&:hover': {
          backgroundColor: '$primary5',
          color: '$neutral1',
        },
        '&:active': {
          backgroundColor: '$primary6',
          color: '$neutral1',
        },
      },
      danger: {
        background: '$red4',
        boxShadow: '$sm',
        '&:hover': {
          backgroundColor: '$red5',
          color: '$neutral1',
        },
        '&:active': {
          backgroundColor: '$red6',
          color: '$neutral1',
        },
      },
    },
    shape: {
      rounded: {
        borderRadius: '100%',
      },
    },
    size: {
      xs: {
        lineHeight: '$xs',
        fontSize: '$xs',
        padding: '$0',
      },
      lg: {
        lineHeight: '$lg',
        fontSize: '$lg',
        padding: '$1',
      },
      xl: {
        lineHeight: '$xl',
        fontSize: '$xl',
        padding: '$2',
      },
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      use: 'icon',
      css: {
        background: 'transparent',
        boxShadow: 'none',
        color: '$neutral6',
        '&:hover': {
          background: 'transparent',
          color: '$primary4',
        },
        '&:active': {
          background: 'transparent',
          color: '$primary5',
        },
      },
    },
    {
      color: 'primary',
      use: 'FAB',
      css: {
        borderColor: '$primary2',
      },
    },
    {
      color: 'danger',
      use: 'FAB',
      css: {
        borderColor: '$red2',
      },
    },
  ],
})
