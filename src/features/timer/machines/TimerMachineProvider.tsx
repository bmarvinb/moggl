import { useTimerMachine } from 'features/timer/hooks/useTimer';
import { timerMachine } from 'features/timer/machines/TimerMachine';
import React from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export type TimerMachineProviderProps = {
  children: React.ReactNode;
};

export function TimerMachineProvider(props: TimerMachineProviderProps) {
  const timerMachineService = useTimerMachine();

  return (
    <TimerContext.Provider value={timerMachineService}>
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
