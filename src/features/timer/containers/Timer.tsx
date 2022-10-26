import { useActor } from '@xstate/react';
import { Box } from 'shared/components/Box';
import { Input } from 'shared/components/Input';
import { TimerControls } from 'features/timer/components/TimerControls';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import * as O from 'fp-ts/lib/Option';
import { ActiveTimeEntry } from 'features/timer/models/time-entry';

export type TimerProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>;
};

export const Timer = (props: TimerProps) => {
  const service = useTimerMachine();
  const [state, send] = useActor(service);
  const isCreating = state.matches('creating');
  const isLoading = state.matches('saving') || state.matches('discarding');
  const isRunning = state.matches('running') || state.matches('creating');

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
            state.context.mode === 'Timer'
              ? 'What are you working on?'
              : 'What have you done?'
          }
          value={state.context.timeEntry.description}
          onChange={e =>
            send({
              type: 'UPDATE_TIME_ENTRY',
              data: { description: e.target.value },
            })
          }
          onBlur={e =>
            send({
              type: 'SAVE_TIME_ENTRY',
            })
          }
        />
      </Box>
      <Box>
        <TimerControls
          duration={state.context.duration}
          creating={isCreating}
          loading={isLoading}
          running={isRunning}
          mode={state.context.mode}
          billable={state.context.timeEntry.billable}
          onBillableStatusChanged={() => {
            send({
              type: 'UPDATE_TIME_ENTRY',
              data: { billable: !state.context.timeEntry.billable },
            });
            send({
              type: 'SAVE_TIME_ENTRY',
            });
          }}
          onDiscard={() => send('DISCARD')}
          onStartClicked={() =>
            send({ type: 'START', start: new Date().toISOString() })
          }
          onStopClicked={() => send('STOP')}
          onTimerModeChanged={mode => send({ type: 'UPDATE_MODE', mode })}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </Box>
    </Box>
  );
};
