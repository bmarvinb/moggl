import { useSelector } from '@xstate/react';
import React from 'react';
import {
  TimerData,
  selectTimerContext,
  selectIsTimerRunning,
  selectIsTimerPending,
  TimerMode,
} from '../machines/TimerMachine';
import { TimerContext } from '../machines/TimerMachineProvider';
import { ActiveTimeEntry } from '../models/time-entry';
import { TimerControls } from './TimerControls';

function getTimerData(timeEntry: ActiveTimeEntry): TimerData {
  return {
    id: timeEntry.id,
    start: timeEntry.start,
    timeEntry: {
      billable: timeEntry.billable,
      description: timeEntry.description,
      projectId: timeEntry.project?.id,
    },
  };
}

export const Timer = (props: { active: ActiveTimeEntry | undefined }) => {
  const service = React.useContext(TimerContext);

  const { duration, mode, timeEntry } = useSelector(
    service,
    selectTimerContext,
  );

  React.useEffect(() => {
    if (props.active) {
      service.send({
        type: 'CONTINUE',
        data: getTimerData(props.active),
      });
    }
  }, [props.active, service]);

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
