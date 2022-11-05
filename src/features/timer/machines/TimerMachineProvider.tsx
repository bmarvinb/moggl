import { useQueryClient } from '@tanstack/react-query';
import { useInterpret } from '@xstate/react';
import { useAddTimeEntry } from 'features/timer/hooks/useCreateTimeEntry';
import { useDeleteTimeEntry } from 'features/timer/hooks/useDeleteTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/useStopTimeEntry';
import { useUpdateTimeEntry } from 'features/timer/hooks/useUpdateTimeEntry';
import {
  timerMachine,
  TimerPayload,
} from 'features/timer/machines/TimerMachine';
import { ActiveTimeEntry } from 'features/timer/models/time-entry';
import React from 'react';
import { invariant } from 'shared/utils/invariant';
import { InterpreterFrom } from 'xstate';

type TimerContextData = InterpreterFrom<typeof timerMachine>;

const TimerContext = React.createContext<TimerContextData>(
  {} as TimerContextData,
);

export type TimerMachineProviderProps = {
  children: React.ReactNode;
  active: ActiveTimeEntry | undefined;
};

function getTimerPayload(timeEntry: ActiveTimeEntry): TimerPayload {
  return {
    id: timeEntry.id,
    start: timeEntry.start,
    timeEntry: {
      projectId: timeEntry.project?.id,
      description: timeEntry.description,
      billable: timeEntry.billable,
    },
  };
}

export function TimerMachineProvider(props: TimerMachineProviderProps) {
  const queryClient = useQueryClient();
  const addTimeEntry = useAddTimeEntry();
  const stopTimeEntry = useStopTimeEntry();
  const updateTimeEntry = useUpdateTimeEntry();
  const deleteTimeEntry = useDeleteTimeEntry();

  const service = useInterpret(timerMachine, {
    services: {
      addTimeEntry: context => () => {
        invariant(context.start, 'Start date should be provided');
        return addTimeEntry
          .mutateAsync({
            start: context.start.toISOString(),
            projectId: context.timeEntry.projectId,
            description: context.timeEntry.description,
            billable: context.timeEntry.billable,
          })
          .then(({ id }) => id);
      },
      stopTimeEntry: context => () => {
        invariant(context.start, 'Start must be provided');
        return stopTimeEntry.mutateAsync({
          start: context.start,
          description: context.timeEntry.description,
          billable: context.timeEntry.billable,
        });
      },
      discard: context => () => {
        invariant(context.id, 'Id must be provided');
        return deleteTimeEntry.mutateAsync(context.id);
      },
    },
    actions: {
      refetchTimeEntries: _ => {
        return queryClient.invalidateQueries(['timeEntries']);
      },
      updateTimeEntry: context => {
        invariant(context.id, 'Id must be provided');
        invariant(context.start, 'Start must be provided');
        return updateTimeEntry.mutateAsync(
          {
            id: context.id,
            data: {
              start: context.start.toISOString(),
              billable: context.timeEntry.billable,
              projectId: context.timeEntry.projectId || undefined,
              description: context.timeEntry.description,
            },
          },
          // TODO: popup notifications
          {
            onSuccess: () => console.log('Time entry updated'),
            onError: () => console.error('Time entry update failed'),
          },
        );
      },
    },
  });

  React.useEffect(() => {
    if (props.active) {
      const data = getTimerPayload(props.active);
      service.send({
        type: 'CONTINUE',
        data,
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
