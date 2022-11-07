import {
  BiBriefcase,
  BiDollar,
  BiDotsVertical,
  BiPlay,
  BiPlus,
  BiPurchaseTag,
  BiStop,
} from 'react-icons/bi';
import { ButtonIcon } from 'common/components/Elements/ButtonIcon';
import { TimerMode } from '../machines/TimerMachine';
import { formatTimeEntryDuration } from '../utils';

export type TimerControlsProps = {
  isRunning: boolean;
  isPending: boolean;
  duration: number;
  isBillable: boolean;
  mode: TimerMode;
  onDiscard: () => void;
  onStart: () => void;
  onAddTimeEntry: () => void;
  onStop: () => void;
  onToggleBillableStatus: () => void;
  onModeChange: (mode: TimerMode) => void;
};

export const TimerControls = (props: TimerControlsProps) => {
  const isTimerMode = props.mode === 'Timer';
  const setTimerMode = () => props.onModeChange('Timer');
  const setManualMode = () => props.onModeChange('Manual');
  return (
    <div>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex gap-2">
          <ButtonIcon icon={<BiBriefcase title="Select project" />} />
          <ButtonIcon icon={<BiPurchaseTag title="Select tags" />} />
          <ButtonIcon
            onClick={props.onToggleBillableStatus}
            icon={<BiDollar title="Change billable status" />}
            className={
              props.isBillable
                ? 'text-primary-400 dark:text-primary-dark-400'
                : ''
            }
          />
        </div>

        <div className="flex items-center">
          {isTimerMode ? (
            <div className="mr-3 min-w-[5rem] text-right text-lg font-semibold text-neutral-800 dark:text-neutral-dark-900">
              {formatTimeEntryDuration(props.duration)}
            </div>
          ) : (
            <div></div>
          )}

          <div className="mr-3">
            {isTimerMode ? (
              <div>
                {props.isRunning ? (
                  <button
                    className="rounded-full bg-red-400 p-2 text-xl text-neutral-50 hover:bg-red-300 disabled:bg-red-300 dark:bg-red-dark-400 dark:hover:bg-red-dark-500 dark:disabled:bg-red-dark-300"
                    aria-label="Stop timer"
                    title="Stop timer"
                    onClick={props.onStop}
                    disabled={props.isPending}
                  >
                    <BiStop />
                  </button>
                ) : (
                  <button
                    className="rounded-full bg-primary-400 p-2 text-xl text-neutral-50 hover:bg-primary-300 disabled:bg-primary-300 dark:bg-primary-dark-400 dark:hover:bg-primary-dark-500 dark:disabled:bg-primary-dark-300"
                    aria-label="Start timer"
                    title="Start timer"
                    onClick={props.onStart}
                  >
                    <BiPlay className="relative -right-0.5" />
                  </button>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="rounded-full bg-primary-400 p-2 text-xl text-neutral-50 hover:bg-primary-300 dark:bg-primary-dark-400 dark:hover:bg-primary-dark-500"
                  aria-label="Add time entry"
                  title="Add time entry"
                  onClick={props.onAddTimeEntry}
                >
                  <BiPlus />
                </button>
              </div>
            )}
          </div>

          <div className="flex min-w-[1.5rem] items-center justify-center">
            {props.isRunning ? (
              <button
                disabled={props.isPending}
                onClick={props.onDiscard}
                title="Discard"
              >
                <BiDotsVertical></BiDotsVertical>
              </button>
            ) : (
              <div className="flex flex-col justify-center rounded p-0">
                <button title="Timer mode" onClick={setTimerMode}>
                  <BiPlay />
                </button>
                <button title="Manual mode" onClick={setManualMode}>
                  <BiPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
