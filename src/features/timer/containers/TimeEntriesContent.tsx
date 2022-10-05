import { useMachine } from '@xstate/react';
import { Box } from 'common/components/Box';
import { useWindowSize } from 'core/hooks/useWindowSize';
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { Timer } from 'features/timer/containers/Timer';
import { timerMachine, TimerMode } from 'features/timer/machines/timerMachine';
import { ActiveTimeEntry } from 'features/timer/services/time-entries';
import * as O from 'fp-ts/lib/Option';
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type TimeEntriesContentProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>;
  weekDuration: number;
  reportedDays: ReportedDay[];
};

export const TimeEntriesContent: FC<TimeEntriesContentProps> = props => {
  const [timerState, send] = useMachine(timerMachine);
  const [contentTop, setContentTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }
    const { y } = contentRef.current.getBoundingClientRect();
    setContentTop(y);
  }, [contentRef, size.width]);

  useEffect(() => {
    if (O.isNone(props.activeTimeEntry)) {
      return;
    }
    send('CONTINUE', {
      payload: props.activeTimeEntry.value,
    });
  }, [props.activeTimeEntry, send]);

  const activeDuration = timerState.matches({ timer: 'running' })
    ? O.some(timerState.context.duration)
    : O.none;

  const weekDuration = timerState.context.duration + props.weekDuration;

  const timerMode = timerState.matches({ mode: 'timer' })
    ? TimerMode.Timer
    : TimerMode.Manual;

  return (
    <Box
      css={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Timer
        activeTimeEntry={props.activeTimeEntry}
        timeEntryDuration={activeDuration}
        mode={timerMode}
        onStart={() => send('START')}
        onStop={() => send('STOP')}
        onTimerModeChanged={() => send('MODE.TOGGLE')}
        onAddTimeEntryClicked={() => console.log('Add time entry')}
      />

      <Box
        ref={contentRef}
        css={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          maxHeight: `calc(100vh - ${contentTop + 1}px)`,
        }}
      >
        <Box
          css={{
            padding: '1rem',
            overflow: 'scroll',
            background: '$neutral2',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <WeekDuration weekDuration={weekDuration} />
          <ReportedDays
            activeTimeEntry={props.activeTimeEntry}
            activeTimeEntryDuration={activeDuration}
            reportedDays={props.reportedDays}
          />
        </Box>
      </Box>
    </Box>
  );
};
