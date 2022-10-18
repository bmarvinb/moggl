import { invariant } from 'common/utils/invariant';
import { useCreateTimeEntry } from 'features/timer/hooks/useCreateTimeEntry';
import { useStopTimeEntry } from 'features/timer/hooks/useStopTimeEntry';
import { NewTimeEntryModel } from 'features/timer/models/time-entries';
import { TimerStatus } from 'features/timer/models/timer-status';
import { calculateDuration } from 'features/timer/utils/time-entries-utils';
import * as O from 'fp-ts/lib/Option';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

export type TimerState =
  | { status: TimerStatus.Idle }
  | {
      status: TimerStatus.Running;
      duration: number;
      newTimeEntry: NewTimeEntryModel;
    };

export type TimerAPI = {
  start: (newTimeEntry: NewTimeEntryModel) => void;
  resume: (newTimeEntry: NewTimeEntryModel) => void;
  stop: () => void;
};

export type TimerEvent =
  | {
      type: 'start';
      data: NewTimeEntryModel;
    }
  | {
      type: 'resume';
      data: NewTimeEntryModel;
    }
  | {
      type: 'stop';
    }
  | {
      type: 'tick';
    };

function timerReducer(state: TimerState, event: TimerEvent): TimerState {
  switch (state.status) {
    case TimerStatus.Idle:
      switch (event.type) {
        case 'start':
          return {
            ...state,
            status: TimerStatus.Running,
            duration: 0,
            newTimeEntry: event.data,
          };
        case 'resume':
          return {
            ...state,
            status: TimerStatus.Running,
            duration: calculateDuration(event.data),
            newTimeEntry: event.data,
          };
        default:
          return state;
      }
    case TimerStatus.Running: {
      switch (event.type) {
        case 'stop':
          return {
            status: TimerStatus.Idle,
          };
        case 'tick':
          return {
            ...state,
            duration: calculateDuration(state.newTimeEntry),
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
}

const initialState: TimerState = { status: TimerStatus.Idle };

const TimerContext = createContext<TimerState>(initialState);

const TimerAPIContext = createContext<TimerAPI>({} as TimerAPI);

export const TimerProvider = ({
  children,
  newTimeEntry,
}: {
  newTimeEntry: O.Option<NewTimeEntryModel>;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const { mutate: createTimeEntry } = useCreateTimeEntry();
  const { mutate: stopTimeEntry } = useStopTimeEntry();

  useEffect(() => {
    if (O.isSome(newTimeEntry)) {
      resume(newTimeEntry.value);
    }
  }, [newTimeEntry]);

  useEffect(() => {
    if (state.status === TimerStatus.Running) {
      const interval = setInterval(() => dispatch({ type: 'tick' }), 1000);
      return () => clearInterval(interval);
    }
  }, [state.status]);

  const start = (newTimeEntry: NewTimeEntryModel) => {
    dispatch({ type: 'start', data: newTimeEntry });
    createTimeEntry(newTimeEntry, {
      onError: () => {
        stop();
      },
    });
  };

  const resume = (newTimeEntry: NewTimeEntryModel) => {
    dispatch({ type: 'resume', data: newTimeEntry });
  };

  const stop = () => {
    invariant(state.status === TimerStatus.Running);
    const prev = state.newTimeEntry;
    dispatch({ type: 'stop' });
    stopTimeEntry(undefined, {
      onError: () => {
        dispatch({ type: 'start', data: prev });
      },
    });
  };

  const api = {
    start,
    stop,
    resume,
  };

  return (
    <TimerAPIContext.Provider value={api}>
      <TimerContext.Provider value={state}>{children}</TimerContext.Provider>
    </TimerAPIContext.Provider>
  );
};

export const useTimerState = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error(`useTimerState must be used within a TimerProvider`);
  }
  return context;
};

export const useTimerAPI = () => {
  const context = useContext(TimerAPIContext);
  if (context === undefined) {
    throw new Error(`useTimerAPI must be used within a TimerProvider`);
  }
  return context;
};
