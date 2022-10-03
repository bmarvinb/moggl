import { styled } from 'core/theme/config';

export const Row = styled('div', {
  marginBottom: '$8',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '$4',
  '> *': {
    marginRight: '$8',
    '&:last-child': {
      marginRight: 0,
    },
  },
});
