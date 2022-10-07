import { styled } from 'core/theme/config';

export const Title = styled('div', {
  fontWeight: 'bold',
  margin: 0,
  padding: 0,
  variants: {
    size: {
      xl: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});
