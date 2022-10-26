import { TimeEntriesTable } from 'features/timer/containers/TimeEntriesTable';
import { InactiveTimeEntry } from 'features/timer/models/time-entry';
import React from 'react';
import { Box } from 'shared/components/Box';

export type ReportedDay = {
  id: string;
  date: Date;
  reportedDuration: number;
  data: InactiveTimeEntry[];
};

export type ReportedDaysProps = {
  reportedDays: ReportedDay[];
};

export const ReportedDays: React.FC<ReportedDaysProps> = props => {
  return (
    <Box
      css={{
        color: '$neutral9',
      }}
    >
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
    </Box>
  );
};
