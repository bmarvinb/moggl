import { useActor } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Title } from 'common/components/Title';
import { styled } from 'core/theme/config';
import { useTimer } from 'features/timer/providers/timer-context';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import { FC } from 'react';

export type WeekDurationProps = {
  weekDuration: number;
};

const TotalTime = styled('div', {
  display: 'inline-flex',
  fontSize: '$lg',
  fontWeight: '$normal',
  lineHeight: '$lg',
  color: '$neutral9',
  marginLeft: '$4',
});

export const WeekDuration: FC<WeekDurationProps> = props => {
  const timerService = useTimer();
  const [timerState] = useActor(timerService);
  const weekDuration = timerState.context.duration + props.weekDuration;
  return (
    <>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '$8',
        }}
      >
        <Title as="h1">
          This week
          <TotalTime>{formatDuration(weekDuration)}</TotalTime>
        </Title>
      </Box>
    </>
  );
};
