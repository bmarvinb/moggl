import { zodResolver } from '@hookform/resolvers/zod';
import { useActor } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Input } from 'common/components/Input';
import {
  TimerControls,
  TimerControlsData,
} from 'features/timer/components/TimerControls';
import { useCreateTimeEntry } from 'features/timer/hooks/useCreateTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/useStopTimeEntry';
import { TimerMode } from 'features/timer/machines/timerMachine';
import {
  ActiveTimeEntry,
  NewTimeEntry,
} from 'features/timer/models/time-entries';
import { useTimer } from 'features/timer/providers/timer-context';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type TimerProps = {
  timeEntry: O.Option<ActiveTimeEntry>;
};

const schema = z.object({
  billable: z.boolean(),
  description: z.string(),
  projectId: z.string(),
});

type FormValues = z.infer<typeof schema>;

function getDefaultValues(timeEntry: O.Option<ActiveTimeEntry>) {
  return pipe(
    timeEntry,
    O.map(timeEntry => ({
      billable: timeEntry.billable,
      description: timeEntry.description,
      projectId: timeEntry?.projectId ?? '',
    })),
    O.getOrElse(() => ({
      billable: false,
      description: '',
      projectId: '634abcee0e2fc14c8e495332', // TODO: mock
    })),
  );
}

export const Timer = (props: TimerProps) => {
  const timerService = useTimer();
  const [timerState, send] = useActor(timerService);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(props.timeEntry),
  });

  const isTimerMode = timerState.matches({ mode: 'timer' });
  const isRunning = timerState.matches({ timer: 'running' });

  const timerControlsPayload: TimerControlsData = isTimerMode
    ? {
        mode: TimerMode.Timer,
        running: isRunning,
        duration: timerState.context.duration,
      }
    : {
        mode: TimerMode.Manual,
      };

  const onStartClicked = () => {
    const start = new Date();
    const newTimeEntry: NewTimeEntry = {
      start: start.toISOString(),
      billable: form.getValues('billable'),
      description: form.getValues('description'),
      projectId: form.getValues('projectId'),
      tagIds: [],
    };
    send({
      type: 'START',
      payload: newTimeEntry,
    });
  };

  const onStopClicked = () => {
    send('STOP');
  };

  return (
    <Box
      css={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '0.75rem 1rem',
        boxShadow: '$md',
        background: '$timerBg',
        position: 'relative',
        zIndex: 1,

        '@md': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <Box
        css={{
          flex: 1,
        }}
      >
        <Input
          variant={'inline'}
          css={{
            width: '100%',
          }}
          placeholder={
            isTimerMode ? 'What are you working on?' : 'What have you done?'
          }
          {...form.register('description')}
        />
      </Box>
      <Box>
        <TimerControls
          data={timerControlsPayload}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
          onTimerModeChanged={() => {
            send('MODE.TOGGLE');
          }}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </Box>
    </Box>
  );
};
