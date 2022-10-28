import { useActiveDuration } from 'features/timer/hooks/activeDuration';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import React from 'react';

export type WeekDurationProps = {
  weekDuration: number;
};

export const WeekDuration: React.FC<WeekDurationProps> = ({ weekDuration }) => {
  const duration = useActiveDuration(weekDuration);
  return (
    <div className="mb-8 flex place-content-between">
      <div className="flex">
        <h1 className="text-xl font-bold">This week</h1>
        <div className="ml-2 inline-flex text-xl font-normal text-slate-900 dark:text-slate-50">
          {formatDuration(duration)}
        </div>
      </div>
    </div>
  );
};
