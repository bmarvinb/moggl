import { styled } from 'theme/config'

export const Button = styled('button', {
  position: 'relative',
  fontSize: '$sm',
  lineHeight: '$sm',
  borderRadius: '$md',
  color: '$neutral7',
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
  '&:hover': {
    color: '$neutral8',
  },
  '&:active': {
    color: '$neutral9',
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
        color: '$neutral0',
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
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    color: {
      primary: {
        backgroundColor: '$primary4',
        boxShadow: '$sm',
        color: '$neutral0',
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
        color: '$neutral0',
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
      },
      lg: {
        lineHeight: '$lg',
        fontSize: '$lg',
      },
      xl: {
        lineHeight: '$xl',
        fontSize: '$xl',
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
      use: 'icon',
      size: 'xs',
      css: {
        padding: '$0',
      },
    },
    {
      use: 'icon',
      size: 'lg',
      css: {
        padding: '$1',
      },
    },
    {
      use: 'icon',
      size: 'xl',
      css: {
        padding: '$2',
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
