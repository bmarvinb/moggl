import { useActiveDuration } from '../hooks/useActiveDuration';
import { formatTimeEntryDuration } from '../utils/time-entries-utils';

type DayDurationProps = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration = ({ reportedTime, isToday }: DayDurationProps) => {
  const duration = useActiveDuration(reportedTime);
  return (
    <div className="font-normal text-neutral-800 dark:text-neutral-100">
      {formatTimeEntryDuration(isToday ? duration : reportedTime)}
    </div>
  );
};
