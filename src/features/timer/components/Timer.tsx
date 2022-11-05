import { useActor } from '@xstate/react';
import { TimerControls } from 'features/timer/components/TimerControls';
import {
  TimerMode,
  TimerPayload,
  TimerState,
  UpdateTimeEntryData,
} from 'features/timer/machines/TimerMachine';
import { useTimerService } from 'features/timer/machines/TimerMachineProvider';

export const Timer = () => {
  const service = useTimerService();
  const [state, send] = useActor(service);

  const { mode, duration, timeEntry } = state.context;
  const running = !state.matches(TimerState.Idle);
  const pending =
    state.matches(TimerState.Creating) ||
    state.matches(TimerState.Discarding) ||
    state.matches(TimerState.Saving);

  const start = (start: Date) => send({ type: 'START', start });

  const stop = () => send({ type: 'STOP' });

  const discard = () => send({ type: 'DISCARD' });

  const updateTimeEntry = (data: UpdateTimeEntryData) =>
    send({ type: 'UPDATE_TIME_ENTRY', data });

  const saveTimeEntry = () => send({ type: 'SAVE_TIME_ENTRY' });

  const updateMode = (mode: TimerMode) => send({ type: 'UPDATE_MODE', mode });

  return (
    <div className="relative flex w-full flex-col  bg-neutral-50 py-3 px-4 shadow-md dark:bg-neutral-dark-50 md:flex-row md:items-center">
      <div className="flex-1">
        <input
          className="w-full bg-transparent py-3 placeholder-neutral-600 focus:outline-none dark:placeholder-neutral-dark-600"
          placeholder={
            state.context.mode === 'Timer'
              ? 'What are you working on?'
              : 'What have you done?'
          }
          value={state.context.timeEntry.description}
          onChange={e => updateTimeEntry({ description: e.target.value })}
          onBlur={e => saveTimeEntry}
        />
      </div>

      <div>
        <TimerControls
          running={running}
          pending={pending}
          duration={duration}
          mode={mode}
          billable={timeEntry.billable}
          onBillableStatusChanged={() => {
            updateTimeEntry({ billable: !timeEntry.billable });
            saveTimeEntry();
          }}
          onDiscard={discard}
          onStartClicked={() => start(new Date())}
          onStopClicked={stop}
          onTimerModeChanged={updateMode}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </div>
    </div>
  );
};
