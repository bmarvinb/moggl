import { useActor } from '@xstate/react';
import { Box } from 'common/components/Box';
import { useTimer } from 'features/timer/providers/timer-context';
import { formatDuration } from 'features/timer/utils/time-entries-utils';

export type DayDurationProps = {
  isToday: boolean;
  reportedTime: number;
};

export const DayDuration = (props: DayDurationProps) => {
  const timerService = useTimer();
  const [timerState] = useActor(timerService);
  const totalTime = timerState.matches({ timer: 'running' })
    ? props.reportedTime + timerState.context.duration
    : props.reportedTime;
  return (
    <Box
      css={{
        fontWeight: 400,
        color: '$neutral9',
        minWidth: '4rem',
      }}
    >
      {props.isToday
        ? formatDuration(totalTime)
        : formatDuration(props.reportedTime)}
    </Box>
  );
};
