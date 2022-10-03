import { Box } from 'common/components/Box';
import { Spinner } from 'common/components/Spinner';

export const TimeEntriesLoading = () => (
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
