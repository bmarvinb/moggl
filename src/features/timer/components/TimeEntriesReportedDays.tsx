import { ReportedDaysContainer } from 'features/timer/components/ReportedDaysContainer';
import { TimeEntriesTable } from 'features/timer/components/TimeEntriesTable';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { useReportedDays } from 'features/timer/hooks/reportedDays';
import { useWeekDuration } from 'features/timer/hooks/weekDuration';
import { CompletedTimeEntry } from 'features/timer/models/time-entry';

type TimeEntriesReportedDaysProps = {
  entries: CompletedTimeEntry[];
};

export const TimeEntriesReportedDays = (
  props: TimeEntriesReportedDaysProps,
) => {
  const weekDuration = useWeekDuration(props.entries);
  const reportedDays = useReportedDays(props.entries);
  return (
    <div className="flex w-full flex-1 flex-col">
      <ReportedDaysContainer>
        {reportedDays.length > 0 && (
          <WeekDuration weekDuration={weekDuration} />
        )}
        {reportedDays.map(day => (
          <TimeEntriesTable
            key={day.id}
            date={day.date}
            data={day.data}
            reportedDuration={day.reportedDuration}
          />
        ))}
      </ReportedDaysContainer>
    </div>
  );
};
