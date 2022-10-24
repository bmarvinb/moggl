import { Box } from 'common/components/Box';
import { useActiveDuration } from 'features/timer/hooks/useActiveDuration';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import React from 'react';

type DayDurationProps = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration: React.FC<DayDurationProps> = ({
  reportedTime,
  isToday,
}) => {
  const duration = useActiveDuration(reportedTime);
  return (
    <Box
      css={{
        fontWeight: 400,
        color: '$neutral9',
        minWidth: '4rem',
      }}
    >
      {formatDuration(isToday ? duration : reportedTime)}
    </Box>
  );
};
