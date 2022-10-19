import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from 'common/components/Box';
import { Input } from 'common/components/Input';
import {
  TimerControls,
  TimerControlsData,
} from 'features/timer/components/TimerControls';
import { useTimerMode } from 'features/timer/hooks/useTimerMode';
import { NewTimeEntryModel } from 'features/timer/models/time-entries';
import { useTimerAPI, useTimer } from 'features/timer/providers/TimerProvider';
import { constVoid, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type TimerProps = {
  newTimeEntry: O.Option<NewTimeEntryModel>;
};

const schema = z.object({
  billable: z.boolean(),
  description: z.string(),
  projectId: z.string(),
});

type FormValues = z.infer<typeof schema>;

function getDefaultValues(timeEntry: O.Option<NewTimeEntryModel>) {
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
  const state = useTimer();
  const { start, stop } = useTimerAPI();
  const [timerMode, setTimerMode] = useTimerMode();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(props.newTimeEntry),
  });

  const timerControlsData: TimerControlsData =
    timerMode === 'timer'
      ? {
          mode: 'timer',
          state,
        }
      : {
          mode: 'manual',
        };

  const onStartClicked = () => {
    const newTimeEntry: NewTimeEntryModel = {
      start: new Date().toISOString(),
      billable: form.getValues('billable'),
      description: form.getValues('description'),
      projectId: form.getValues('projectId'),
      tagIds: [],
    };
    start(newTimeEntry);
  };

  const onStopClicked = () => {
    stop();
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
            timerMode === 'timer'
              ? 'What are you working on?'
              : 'What have you done?'
          }
          {...form.register('description')}
        />
      </Box>
      <Box>
        <TimerControls
          data={timerControlsData}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
          onTimerModeChanged={() => {
            setTimerMode(timerMode === 'manual' ? 'timer' : 'manual');
          }}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </Box>
    </Box>
  );
};
