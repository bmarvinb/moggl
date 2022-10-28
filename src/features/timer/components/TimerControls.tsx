import { TimerMode } from 'features/timer/machines/TimerMachine';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import React from 'react';
import {
  BiBriefcase,
  BiDollar,
  BiDotsVertical,
  BiPlay,
  BiPlus,
  BiPurchaseTag,
  BiStop,
} from 'react-icons/bi';

export type TimerControlsProps = {
  duration: number;
  running: boolean;
  updating: boolean;
  billable: boolean;
  creating: boolean;
  mode: TimerMode;
  onDiscard: () => void;
  onStartClicked: () => void;
  onAddTimeEntryClicked: () => void;
  onStopClicked: () => void;
  onBillableStatusChanged: () => void;
  onTimerModeChanged: (mode: TimerMode) => void;
};

export const TimerControls: React.FC<TimerControlsProps> = props => {
  const isTimerMode = props.mode === 'Timer';
  return (
    <div>
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex gap-2">
          <button aria-label="Select project">
            <BiBriefcase title="Select project" />
          </button>
          <button aria-label="Select tags">
            <BiPurchaseTag title="Select tags" />
          </button>
          <button
            aria-label="Change billable status"
            onClick={props.onBillableStatusChanged}
          >
            <BiDollar title="Change billable status" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {isTimerMode ? (
            <div className="min-w-[4rem] text-right text-lg font-semibold text-neutral-800 dark:text-neutralDark-900">
              {formatDuration(props.duration)}
            </div>
          ) : (
            <div></div>
          )}

          {isTimerMode ? (
            <div>
              {props.running || props.creating ? (
                <button
                  className="rounded-full bg-red-400 p-2 text-xl text-neutral-50 hover:bg-red-300 dark:bg-redDark-400 dark:hover:bg-redDark-500"
                  aria-label="Stop timer"
                  title="Stop timer"
                  onClick={props.onStopClicked}
                  disabled={props.updating}
                >
                  <BiStop />
                </button>
              ) : (
                <button
                  className="rounded-full bg-primary-400 p-2 text-xl text-neutral-50 hover:bg-primary-300 dark:bg-primaryDark-400 dark:hover:bg-primaryDark-500"
                  aria-label="Start timer"
                  title="Start timer"
                  onClick={props.onStartClicked}
                >
                  <BiPlay className="relative -right-0.5" />
                </button>
              )}
            </div>
          ) : (
            <div>
              <button
                aria-label="Add time entry"
                title="Add time entry"
                onClick={props.onAddTimeEntryClicked}
              >
                <BiPlus />
              </button>
            </div>
          )}

          {props.running ? (
            <div>
              <button
                disabled={props.creating || props.updating}
                onClick={props.onDiscard}
              >
                <BiDotsVertical></BiDotsVertical>
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center rounded p-0">
              <button
                title="Timer mode"
                onClick={() => props.onTimerModeChanged('Timer')}
              >
                <BiPlay />
              </button>
              <button
                title="Manual mode"
                onClick={() => props.onTimerModeChanged('Manual')}
              >
                <BiPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
