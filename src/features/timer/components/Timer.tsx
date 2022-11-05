import { useSelector } from '@xstate/react';
import { TimerControls } from 'features/timer/components/TimerControls';
import {
  selectIsTimerPending,
  selectIsTimerRunning,
  selectTimerContext,
  TimerMode,
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

  const updateDescription = (description: string) =>
    service.send({ type: 'UPDATE_DESCRIPTION', description });

  const saveTimeEntry = () => service.send({ type: 'SAVE_TIME_ENTRY' });

  const updateMode = (mode: TimerMode) =>
    service.send({ type: 'UPDATE_MODE', mode });

  const toggleBillableStatus = () => {
    service.send({ type: 'TOGGLE_BILLABLE_STATUS' });
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
          onChange={event => updateDescription(event.target.value)}
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
          onToggleBillableStatus={toggleBillableStatus}
          onModeChange={updateMode}
          onAddTimeEntry={addTimeEntry}
        />
      </div>
    </div>
  );
};
