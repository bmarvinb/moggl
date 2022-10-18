import { Box } from 'common/components/Box';
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays';
import { ReportedDaysContainer } from 'features/timer/components/ReportedDaysContainer';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { ActiveTimeEntryModel } from 'features/timer/models/time-entries';
import * as O from 'fp-ts/lib/Option';

type Props = {
  activeTimeEntry: O.Option<ActiveTimeEntryModel>;
  weekDuration: number;
  reportedDays: ReportedDay[];
};

export const TimeEntriesReportedDays = (props: Props) => {
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
        <ReportedDays
          activeTimeEntry={props.activeTimeEntry}
          reportedDays={props.reportedDays}
        />
      </ReportedDaysContainer>
    </Box>
  );
};
