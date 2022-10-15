import { Card } from 'common/components/Card';
import { styled } from 'core/theme/config';

export const List = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
});

export const ListItem = styled('div', {
  padding: '$6 $8',
  '&:not(:last-child)': {
    borderBottom: '1px solid $neutral2',
  },
});
