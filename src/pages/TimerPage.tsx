import { ReportedDays } from 'features/timer/components/ReportedDays';
import { Timer } from 'features/timer/components/Timer';
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries';
import {
  TimerContext,
  TimerMachineProvider,
} from 'features/timer/machines/TimerMachineProvider';
import React from 'react';
import { PageSpinner } from 'components/PageSpinner';

export const TimerPage = () => {
  const { status, data } = useTimeEntries();

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      const { active, completed } = data;
      return (
        <TimerMachineProvider>
          <Timer active={active} />
          <ReportedDays timeEntries={completed} />
        </TimerMachineProvider>
      );
  }
};
