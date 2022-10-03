import { styled } from 'core/theme/config';

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
  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
    outlineWidth: '$space$1',
    outlineColor: '$primary4',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineOffset: '$space$1',
    outlineWidth: '$space$1',
    outlineColor: '$primary4',
  },
  '&[aria-invalid="true"]': {
    borderColor: '$red5',
    outlineColor: '$red4',
  },
  '&::placeholder': {
    color: '$neutral6',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    borderColor: '$neutral6',
  },
  variants: {
    variant: {
      inline: {
        padding: '$4 0',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&:focus-visible': {
          outline: 'none',
        },
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
});
