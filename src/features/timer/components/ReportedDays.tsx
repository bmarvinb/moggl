import { useReportedDays } from '../hooks/useReportedDays';
import { useWeekDuration } from '../hooks/useWeekDuration';
import { CompletedTimeEntry } from '../models/time-entry';
import { ReportedDaysContainer } from './ReportedDaysContainer';
import { TimeEntriesTable } from './TimeEntriesTable';
import { WeekDuration } from './WeekDuration';

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
