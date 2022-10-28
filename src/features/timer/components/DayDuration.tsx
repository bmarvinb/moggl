import { useActiveDuration } from 'features/timer/hooks/activeDuration';
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
    <div className="font-normal text-neutral-800 dark:text-neutral-100">
      {formatDuration(isToday ? duration : reportedTime)}
    </div>
  );
};
