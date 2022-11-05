import { ReportedDaysContainer } from 'features/timer/components/ReportedDaysContainer';
import { TimeEntriesTable } from 'features/timer/components/TimeEntriesTable';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { useReportedDays } from 'features/timer/hooks/useReportedDays';
import { useWeekDuration } from 'features/timer/hooks/useWeekDuration';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';

type ReportedDaysProps = {
  timeEntries: CompletedTimeEntry[];
};

export const ReportedDays = ({ timeEntries }: ReportedDaysProps) => {
  const weekDuration = useWeekDuration(timeEntries);
  const reportedDays = useReportedDays(timeEntries);
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
