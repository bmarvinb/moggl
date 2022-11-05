import { useTimerMachine } from 'features/timer/hooks/useTimer';
import { timerMachine, TimerData } from 'features/timer/machines/TimerMachine';
import { ActiveTimeEntry } from 'features/timer/models/time-entry';
import React from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export type TimerMachineProviderProps = {
  children: React.ReactNode;
  active: ActiveTimeEntry | undefined;
};

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

export function TimerMachineProvider(props: TimerMachineProviderProps) {
  const service = useTimerMachine();

  React.useEffect(() => {
    if (props.active) {
      service.send({
        type: 'CONTINUE',
        data: getTimerData(props.active),
      });
    }
  }, [props.active, service]);

  return (
    <TimerContext.Provider value={service}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimerService() {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error(
      `useTimerService must be used within a TimerMachineProvider`,
    );
  }
  return context;
}
