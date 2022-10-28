import { useActor } from '@xstate/react';
import { TimerControls } from 'features/timer/components/TimerControls';
import { TimerState } from 'features/timer/machines/TimerMachine';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';

export const Timer = () => {
  const service = useTimerMachine();
  const [state, send] = useActor(service);
  const isRunning = state.matches(TimerState.Running);
  const isCreating = state.matches(TimerState.Creating);
  const isUpdating =
    state.matches(TimerState.Saving) || state.matches(TimerState.Discarding);

  return (
    <div className="relative flex w-full flex-col gap-2 bg-neutral-50 py-3 px-4 shadow-md dark:bg-neutralDark-50 md:flex-row md:items-center">
      <div className="flex-1">
        <input
          className="w-full bg-transparent p-3 placeholder-neutral-600 focus:outline-none"
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
      <div>
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
      </div>
    </div>
  );
};
