import { Box } from 'shared/components/Box';
import { Spinner } from 'shared/components/Spinner';

export const PageSpinner = () => (
  <Box
    css={{
      fontSize: '$4xl',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      background: '$neutral2',
    }}
  >
    <Spinner />
  </Box>
);
