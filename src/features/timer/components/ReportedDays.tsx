import { ReportedDaysContainer } from 'features/timer/components/ReportedDaysContainer';
import { TimeEntriesTable } from 'features/timer/components/TimeEntriesTable';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { useReportedDays } from 'features/timer/hooks/reportedDays';
import { useWeekDuration } from 'features/timer/hooks/weekDuration';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';

type ReportedDaysProps = {
  timeEntries: CompletedTimeEntry[];
};

export const ReportedDays = (props: ReportedDaysProps) => {
  const weekDuration = useWeekDuration(props.timeEntries);
  const reportedDays = useReportedDays(props.timeEntries);
  return (
    <div className="flex w-full flex-1 flex-col">
      <ReportedDaysContainer>
        <WeekDuration weekDuration={weekDuration} />
        {reportedDays.map(day => (
          <TimeEntriesTable key={day.id} day={day} />
        ))}
      </ReportedDaysContainer>
    </div>
  );
};
