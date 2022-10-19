import { Box } from 'common/components/Box';
import { useActiveDuration } from 'features/timer/hooks/useActiveDuration';
import { formatDuration } from 'features/timer/utils/time-entries-utils';

type Props = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration = (props: Props) => {
  const duration = useActiveDuration(props.reportedTime);
  return (
    <Box
      css={{
        fontWeight: 400,
        color: '$neutral9',
        minWidth: '4rem',
      }}
    >
      {formatDuration(props.isToday ? duration : props.reportedTime)}
    </Box>
  );
};
