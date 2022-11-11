export type TimeEntryData = {
  projectId: string | undefined;
  description: string;
  billable: boolean;
};

export type TimerMode = 'Timer' | 'Manual';

export type TimerData = {
  id: string;
  start: Date;
  timeEntry: TimeEntryData;
};

export type Context = {
  id?: string;
  start?: Date;
  timeEntry: TimeEntryData;
  mode: TimerMode;
  duration: number;
};

export type InitialContext = {
  id: undefined;
  start: undefined;
  timeEntry: TimeEntryData;
  mode: TimerMode;
  duration: number;
};

type RunningContext = {
  id: string;
  start: Date;
};

type CreatingContext = {
  id: undefined;
  start: Date;
};

type SavingContext = {
  id: string;
  start: Date;
};

type DiscardingContext = {
  id: string;
  start: Date;
};

export type Events =
  | { type: 'START'; start: Date }
  | {
      type: 'CONTINUE';
      data: TimerData;
    }
  | {
      type: 'RESUME';
      data: TimerData;
    }
  | { type: 'STOP' }
  | { type: 'DISCARD' }
  | {
      type: 'UPDATE_DESCRIPTION';
      description: string;
    }
  | {
      type: 'TOGGLE_BILLABLE_STATUS';
    }
  | { type: 'SAVE_TIME_ENTRY' }
  | { type: 'TICK' }
  | { type: 'UPDATE_MODE'; mode: TimerMode };

export type States =
  | { value: 'idle'; context: Context & InitialContext }
  | { value: 'running'; context: Context & RunningContext }
  | { value: 'creating'; context: Context & CreatingContext }
  | { value: 'saving'; context: Context & SavingContext }
  | { value: 'discarding'; context: Context & DiscardingContext };
