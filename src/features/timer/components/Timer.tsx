import { useSelector } from '@xstate/react';
import { TimerControls } from 'features/timer/components/TimerControls';
import {
  selectIsTimerRunning,
  selectIsTimerPending,
  selectTimerContext,
  TimerMode,
  UpdateTimeEntryData,
} from 'features/timer/machines/TimerMachine';
import { useTimerService } from 'features/timer/machines/TimerMachineProvider';

export const Timer = () => {
  const service = useTimerService();
  const { duration, mode, timeEntry } = useSelector(
    service,
    selectTimerContext,
  );
  const isRunning = useSelector(service, selectIsTimerRunning);

  const isPending = useSelector(service, selectIsTimerPending);

  const start = () => service.send({ type: 'START', start: new Date() });

  const stop = () => service.send({ type: 'STOP' });

  const discard = () => service.send({ type: 'DISCARD' });

  const updateTimeEntry = (data: UpdateTimeEntryData) =>
    service.send({ type: 'UPDATE_TIME_ENTRY', data });

  const saveTimeEntry = () => service.send({ type: 'SAVE_TIME_ENTRY' });

  const updateMode = (mode: TimerMode) =>
    service.send({ type: 'UPDATE_MODE', mode });

  const updateBillableStatus = () => {
    service.send([
      { type: 'UPDATE_TIME_ENTRY', data: { billable: !timeEntry.billable } },
      {
        type: 'SAVE_TIME_ENTRY',
      },
    ]);
  };

  const addTimeEntry = () => console.log('time entry clicked');

  return (
    <div className="relative flex w-full flex-col  bg-neutral-50 py-3 px-4 shadow-md dark:bg-neutral-dark-50 md:flex-row md:items-center">
      <div className="flex-1">
        <input
          className="w-full bg-transparent py-3 placeholder-neutral-600 focus:outline-none dark:placeholder-neutral-dark-600"
          placeholder={
            mode === 'Timer'
              ? 'What are you working on?'
              : 'What have you done?'
          }
          value={timeEntry.description}
          onChange={event =>
            updateTimeEntry({ description: event.target.value })
          }
          onBlur={saveTimeEntry}
        />
      </div>

      <div>
        <TimerControls
          isRunning={isRunning}
          isPending={isPending}
          duration={duration}
          mode={mode}
          isBillable={timeEntry.billable}
          onDiscard={discard}
          onStart={start}
          onStop={stop}
          onBillableStatusChange={updateBillableStatus}
          onModeChange={updateMode}
          onAddTimeEntry={addTimeEntry}
        />
      </div>
    </div>
  );
};
