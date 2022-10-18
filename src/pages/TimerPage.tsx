import { PageSpinner } from 'common/components/PageSpinner';
import { TimeEntries } from 'features/timer/containers/TimeEntries';
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries';

export const TimerPage = () => {
  const { status, data } = useTimeEntries();
  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return <TimeEntries timeEntries={data} />;
  }
};
