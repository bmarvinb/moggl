import { useActor } from '@xstate/react';
import { Box } from 'shared/components/Box';
import { Input } from 'shared/components/Input';
import { TimerControls } from 'features/timer/components/TimerControls';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { TimerState } from 'features/timer/machines/TimerMachine';

export const Timer = () => {
  const service = useTimerMachine();
  const [state, send] = useActor(service);
  const isRunning = state.matches(TimerState.Running);
  const isCreating = state.matches(TimerState.Creating);
  const isUpdating =
    state.matches(TimerState.Saving) || state.matches(TimerState.Discarding);

  return (
    <div className="relative z-10 flex w-full flex-col bg-slate-50 py-3 px-4 shadow-md dark:bg-slate-900">
      <div className="flex-1">
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
      </div>
      <Box>
        <TimerControls
          duration={state.context.duration}
          creating={isCreating}
          updating={isUpdating}
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
          onStartClicked={() => send({ type: 'START', start: new Date() })}
          onStopClicked={() => send('STOP')}
          onTimerModeChanged={mode => send({ type: 'UPDATE_MODE', mode })}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </Box>
    </div>
  );
};
