import { Box } from 'shared/components/Box';
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays';
import { ReportedDaysContainer } from 'features/timer/components/ReportedDaysContainer';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import React from 'react';

type TimeEntriesReportedDaysProps = {
  weekDuration: number;
  reportedDays: ReportedDay[];
};

export const TimeEntriesReportedDays: React.FC<TimeEntriesReportedDaysProps> =
  props => {
    return (
      <Box
        css={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <ReportedDaysContainer>
          {props.reportedDays.length > 0 && (
            <WeekDuration weekDuration={props.weekDuration} />
          )}
          <ReportedDays reportedDays={props.reportedDays} />
        </ReportedDaysContainer>
      </Box>
    );
  };
