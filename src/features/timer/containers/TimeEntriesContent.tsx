import { useActor } from '@xstate/react';
import { Box } from 'common/components/Box';
import { useWindowSize } from 'core/hooks/useWindowSize';
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays';
import { WeekDuration } from 'features/timer/components/WeekDuration';
import { Timer } from 'features/timer/containers/Timer';
import { ActiveTimeEntry } from 'features/timer/models/time-entries';
import { useTimer } from 'features/timer/providers/timer-context';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type TimeEntriesContentProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>;
  weekDuration: number;
  reportedDays: ReportedDay[];
};

export const TimeEntriesContent: FC<TimeEntriesContentProps> = props => {
  const timerService = useTimer();
  const [_, send] = useActor(timerService);
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
    pipe(
      props.activeTimeEntry,
      O.map(activeTimeEntry =>
        send({
          type: 'CONTINUE',
          payload: new Date(activeTimeEntry.timeInterval.start),
        }),
      ),
    );
  }, [props.activeTimeEntry, send]);

  const memoizedReportedDays = useMemo(() => {
    return (
      <ReportedDays
        activeTimeEntry={props.activeTimeEntry}
        reportedDays={props.reportedDays}
      />
    );
  }, [props.activeTimeEntry, props.reportedDays]);

  return (
    <Box
      css={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Timer timeEntry={props.activeTimeEntry} />

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
          <WeekDuration weekDuration={props.weekDuration} />
          {memoizedReportedDays}
        </Box>
      </Box>
    </Box>
  );
};
