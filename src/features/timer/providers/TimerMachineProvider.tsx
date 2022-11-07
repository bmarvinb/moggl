import React from 'react';
import { InterpreterFrom } from 'xstate';
import { useTimer } from '../hooks/useTimer';
import { timerMachine } from '../machines/TimerMachine';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

export const TimerContext = React.createContext<TimerContextData | undefined>(
  undefined,
);

export function TimerMachineProvider(props: { children: React.ReactNode }) {
  const timerMachineService = useTimer();

  return (
    <TimerContext.Provider value={timerMachineService}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimerService() {
  const service = React.useContext(TimerContext);
  if (service === undefined) {
    throw new Error(
      'useTimerService should be used inside TimerMachineProvider',
    );
  }
  return service;
}
