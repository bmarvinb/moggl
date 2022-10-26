import { BiLoaderAlt } from 'react-icons/bi';
import { keyframes, styled } from 'theme/config';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Spinner = styled(BiLoaderAlt, {
  color: '$primary5',
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  'aria-label': 'loading',
};
