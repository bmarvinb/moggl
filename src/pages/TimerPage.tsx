import { PageSpinner } from 'common/components/PageSpinner';
import {
  useTimeEntries,
  TimerMachineProvider,
  Timer,
  ReportedDays,
} from 'features/timer';

export const TimerPage = () => {
  const timeEntries = useTimeEntries();

  switch (timeEntries.status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      const { active, completed } = timeEntries.data;
      return (
        <TimerMachineProvider>
          <Timer active={active} />
          <ReportedDays timeEntries={completed} />
        </TimerMachineProvider>
      );
  }
};
