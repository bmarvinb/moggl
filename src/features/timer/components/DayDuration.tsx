import { useActiveDuration } from 'features/timer/hooks/activeDuration';
import { formatDuration } from 'features/timer/utils/time-entries-utils';

type DayDurationProps = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration = ({ reportedTime, isToday }: DayDurationProps) => {
  const duration = useActiveDuration(reportedTime);
  return (
    <div className="font-normal text-neutral-800 dark:text-neutral-100">
      {formatDuration(isToday ? duration : reportedTime)}
    </div>
  );
};
