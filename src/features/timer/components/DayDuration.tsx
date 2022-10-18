import { Box } from 'common/components/Box';
import { formatDuration } from 'features/timer/utils/time-entries-utils';

type Props = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration = (props: Props) => {
  return (
    <Box
      css={{
        fontWeight: 400,
        color: '$neutral9',
        minWidth: '4rem',
      }}
    >
      {formatDuration(props.reportedTime)}
    </Box>
  );
};
