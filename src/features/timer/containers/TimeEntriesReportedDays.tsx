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
      <div className="flex w-full flex-1 flex-col">
        <ReportedDaysContainer>
          {props.reportedDays.length > 0 && (
            <WeekDuration weekDuration={props.weekDuration} />
          )}
          <ReportedDays reportedDays={props.reportedDays} />
        </ReportedDaysContainer>
      </div>
    );
  };
