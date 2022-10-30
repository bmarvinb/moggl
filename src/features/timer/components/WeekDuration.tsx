import { useActiveDuration } from 'features/timer/hooks/activeDuration';
import { formatDuration } from 'features/timer/utils/time-entries-utils';

export type WeekDurationProps = {
  weekDuration: number;
};

export const WeekDuration = ({ weekDuration }: WeekDurationProps) => {
  const duration = useActiveDuration(weekDuration);
  return (
    <div className="mb-4 flex place-content-between">
      <div className="flex">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutralDark-900">
          This week
        </h1>
        <div className="ml-2 inline-flex text-xl font-normal text-neutral-900 dark:text-neutral-50">
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
