import { useInterpret } from '@xstate/react';
import { timerMachine } from 'features/timer/machines/timerMachine';
import React from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerProvider(props: { children: React.ReactNode }) {
  const timerService = useInterpret(timerMachine);

  return (
    <TimerContext.Provider value={timerService}>
      {props.children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error(`useTimer must be used within a TimerProvider`);
  }
  return context;
}
