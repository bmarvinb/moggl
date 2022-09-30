import { styled } from 'theme/config'

export const Input = styled('input', {
  width: '100%',
  padding: '$5',
  borderRadius: '$md',
  background: '$neutral1',
  border: '1px solid $neutral6',
  fontSize: '$base',
  lineHeight: '$base',
  color: '$neutral10',

  '&:hover': {
    borderColor: '$primary5',
  },

  '&:focus': {
    outline: '3px solid $primary8',
    borderColor: '$primary5',
  },

  '&[aria-invalid="true"]': {
    borderColor: '$red9',
    outline: '3px solid $red8',
  },
  variants: {
    use: {
      inline: {
        padding: '0.5rem 0rem',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&::placeholder': {
          color: '$neutral10',
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
})
