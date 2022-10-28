import { Button } from 'shared/components/Button';
import { styled } from 'theme/config';
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

const ToggleMode = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
  justifyContent: 'center',
  padding: 0,
  minWidth: '1.5rem',
});

export const TimerControls: React.FC<TimerControlsProps> = props => {
  const isTimerMode = props.mode === 'Timer';
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="relative grid grid-cols-3">
          <Button
            variant="icon"
            color="transparent"
            size={'lg'}
            aria-label="Select project"
          >
            <BiBriefcase title="Select project" />
          </Button>
          <Button
            variant="icon"
            color="transparent"
            size={'lg'}
            aria-label="Select tags"
          >
            <BiPurchaseTag title="Select tags" />
          </Button>
          <Button
            variant="icon"
            color="transparent"
            size={'lg'}
            aria-label="Change billable status"
            css={{
              color: props.billable ? '$primary5' : '$neutral8',
            }}
            onClick={props.onBillableStatusChanged}
          >
            <BiDollar title="Change billable status" />
          </Button>
        </div>

        <div className="grid columns-3 items-center gap-6 ">
          {isTimerMode ? (
            <div className="text-right text-lg font-semibold text-slate-900 dark:text-slate-50">
              {formatDuration(props.duration)}
            </div>
          ) : (
            <div></div>
          )}

          {isTimerMode ? (
            <div>
              {props.running || props.creating ? (
                <Button
                  color={'danger'}
                  variant="icon"
                  shape="rounded"
                  size={'xl'}
                  aria-label="Stop timer"
                  title="Stop timer"
                  onClick={props.onStopClicked}
                  disabled={props.updating}
                >
                  <BiStop />
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="icon"
                  shape="rounded"
                  aria-label="Start timer"
                  size={'xl'}
                  title="Start timer"
                  css={{
                    svg: {
                      position: 'relative',
                      right: '-1px',
                    },
                  }}
                  onClick={props.onStartClicked}
                >
                  <BiPlay />
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button
                color="transparent"
                size={'xl'}
                aria-label="Add time entry"
                title="Add time entry"
                onClick={props.onAddTimeEntryClicked}
              >
                <BiPlus />
              </Button>
            </div>
          )}

          {props.running ? (
            <div>
              <Button
                css={{
                  padding: '$4 $1',
                  minWidth: '1.5rem',
                }}
                variant={'icon'}
                color="transparent"
                size={'lg'}
                disabled={props.creating || props.updating}
                onClick={props.onDiscard}
              >
                <BiDotsVertical></BiDotsVertical>
              </Button>
            </div>
          ) : (
            <ToggleMode>
              <Button
                variant={'icon'}
                color="transparent"
                size={'sm'}
                title="Timer mode"
                css={{
                  svg: {
                    position: 'relative',
                    right: '-1px',
                  },
                }}
                onClick={() => props.onTimerModeChanged('Timer')}
              >
                <BiPlay />
              </Button>
              <Button
                variant={'icon'}
                color="transparent"
                size={'sm'}
                title="Manual mode"
                onClick={() => props.onTimerModeChanged('Manual')}
              >
                <BiPlus />
              </Button>
            </ToggleMode>
          )}
        </div>
      </div>
    </div>
  );
};
