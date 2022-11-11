import { useActiveDuration } from '../hooks/useActiveDuration';
import { formatTimeEntryDuration } from '../utils';

export type WeekDurationProps = {
  weekDuration: number;
};

export const WeekDuration = (props: WeekDurationProps) => {
  const duration = useActiveDuration(props.weekDuration);
  console.log('Duration', duration);

  return (
    <div className="mb-4 flex place-content-between">
      <div className="flex">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-dark-900">
          This week
        </h1>
        <div className="ml-2 inline-flex text-xl font-normal text-neutral-900 dark:text-neutral-50">
          {formatTimeEntryDuration(duration)}
        </div>
      </div>
    </div>
  );
};
