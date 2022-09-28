import { styled } from 'theme/config'

export const Input = styled('input', {
  width: '100%',
  padding: '0.5rem',
  fontSize: '$md',
  lineHeight: '$md',
  borderRadius: '$xl',
  background: '$neutral0',
  border: '1px solid $neutral0',
  boxShadow: '$xs',

  '&:hover': {
    borderColor: '$primary3',
  },

  '&:focus': {
    borderColor: '$primary3',
    outline: '2px solid $primary2',
  },

  '&[aria-invalid="true"]': {
    borderColor: '$red4',
    outline: '2px solid $red3',
  },
  variants: {
    use: {
      inline: {
        padding: '0.5rem 0rem',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&::placeholder': {
          color: '$neutral7',
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
})
