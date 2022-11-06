import React from 'react';
import { InterpreterFrom } from 'xstate';
import { useTimer } from '../hooks/useTimer';
import { timerMachine } from './TimerMachine';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

export const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerMachineProvider(props: { children: React.ReactNode }) {
  const timerMachineService = useTimer();

  return (
    <TimerContext.Provider value={timerMachineService}>
      {props.children}
    </TimerContext.Provider>
  );
}
