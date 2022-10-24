import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { styled } from 'core/theme/config';
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
  billable: boolean;
  creating: boolean;
  loading: boolean;
  running: boolean;
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
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: '2.5rem',
        }}
      >
        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            columnGap: '$4',
            position: 'relative',
          }}
        >
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
        </Box>

        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            columnGap: '$6',
            alignItems: 'center',
            minHeight: '3rem',
          }}
        >
          {isTimerMode ? (
            <Box
              css={{
                fontWeight: 500,
                fontSize: '$lg',
                lineHeight: '$lg',
                minWidth: '5rem',
                textAlign: 'right',
                color: '$neutral10',
              }}
            >
              {formatDuration(props.duration)}
            </Box>
          ) : (
            <div></div>
          )}

          {isTimerMode ? (
            <div>
              {props.running ? (
                <Button
                  color={'danger'}
                  variant="icon"
                  shape="rounded"
                  size={'xl'}
                  aria-label="Stop timer"
                  title="Stop timer"
                  onClick={props.onStopClicked}
                  disabled={props.loading}
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
                  disabled={props.loading}
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
            <Box>
              <Button
                css={{
                  padding: '$4 $1',
                  minWidth: '1.5rem',
                }}
                variant={'icon'}
                color="transparent"
                size={'lg'}
                disabled={props.loading || props.creating}
                onClick={props.onDiscard}
              >
                <BiDotsVertical></BiDotsVertical>
              </Button>
            </Box>
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
        </Box>
      </Box>
    </div>
  );
};
