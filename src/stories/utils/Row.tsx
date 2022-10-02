import { styled } from 'theme/config'

export const Row = styled('div', {
  marginBottom: '$8',
  '> *': {
    marginRight: '$8',
    '&:last-child': {
      marginRight: 0,
    },
  },
})
