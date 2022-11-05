import { ReportedDays } from 'features/timer/components/ReportedDays';
import { Timer } from 'features/timer/components/Timer';
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries';
import { TimerMachineProvider } from 'features/timer/machines/TimerMachineProvider';
import { PageSpinner } from 'shared/components/PageSpinner';

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
        <TimerMachineProvider active={active}>
          <Timer />
          <ReportedDays timeEntries={completed} />
        </TimerMachineProvider>
      );
  }
};
