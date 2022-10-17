import { useQueryClient } from '@tanstack/react-query';
import { useInterpret } from '@xstate/react';
import { useCurrentUser } from 'features/auth/hooks/useCurrentUser';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { timerMachine } from 'features/timer/machines/timerMachine';
import React from 'react';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export function TimerProvider(props: { children: React.ReactNode }) {
  const workspace = useWorkspace();
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const timerService = useInterpret(timerMachine, {
    context: {
      workspaceId: workspace.id,
      userId: user.id,
      queryClient: queryClient,
    },
  });

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
