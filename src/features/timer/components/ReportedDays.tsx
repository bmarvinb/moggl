import { TimeEntriesTable } from 'features/timer/containers/TimeEntriesTable';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';

export type ReportedDay = {
  id: string;
  date: Date;
  reportedDuration: number;
  data: InactiveTimeEntry[];
};

export type ReportedDaysProps = {
  reportedDays: ReportedDay[];
};

export const ReportedDays = (props: ReportedDaysProps) => {
  return (
    <>
      {props.reportedDays.map(
        ({ id, date, reportedDuration, data: timeEntries }) => (
          <TimeEntriesTable
            key={id}
            date={date}
            data={timeEntries}
            reportedDuration={reportedDuration}
          />
        ),
      )}
    </>
  );
};
