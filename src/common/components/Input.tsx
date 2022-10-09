import { styled } from 'core/theme/config';

export const Input = styled('input', {
  width: '100%',
  padding: '$$padding',
  fontSize: '$$fontSize',
  lineHeight: '$$lineHeight',
  borderRadius: '$md',
  background: '$neutral1',
  border: '1px solid $neutral4',
  color: '$neutral10',
  fontFamily: 'ProximaNova',
  fontWeight: '$normal',
  '&:hover': {
    borderColor: '$primary5',
  },
  '&:focus-visible': {
    outlineStyle: 'solid',
    outlineOffset: 0,
    outlineWidth: '$space$1',
    outlineColor: '$primary4',
  },
  '&:focus': {
    outlineStyle: 'solid',
    outlineOffset: 0,
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
        $$padding: '$4 0',
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
    size: {
      sm: {
        $$padding: '$space$2 $space$3',
        $$fontSize: '$fontSizes$sm',
        $$lineHeight: '$lineHeights$sm',
      },
      md: {
        $$padding: '$space$3 $space$4',
        $$fontSize: '$fontSizes$base',
        $$lineHeight: '$lineHeights$base',
      },
      lg: {
        $$padding: '$space$4 $space$5',
        $$fontSize: '$fontSizes$lg',
        $$lineHeight: '$lineHeights$lg',
      },
      xl: {
        $$padding: '$space$5 $space$6',
        $$fontSize: '$fontSizes$xl',
        $$lineHeight: '$lineHeights$xl',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
