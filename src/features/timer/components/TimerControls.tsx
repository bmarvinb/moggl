import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { styled } from 'core/theme/config';
import { TimerStatus } from 'features/timer/models/timer-status';
import { TimerState } from 'features/timer/providers/TimerProvider';
import { formatDuration } from 'features/timer/utils/time-entries-utils';
import {
  BiBriefcase,
  BiDollar,
  BiDotsVertical,
  BiPlay,
  BiPlus,
  BiPurchaseTag,
  BiStop,
} from 'react-icons/bi';

export type TimerControlsData =
  | {
      mode: 'timer';
      timerState: TimerState;
    }
  | { mode: 'manual' };

export type Props = {
  data: TimerControlsData;
  onStartClicked: () => void;
  onAddTimeEntryClicked: () => void;
  onStopClicked: () => void;
  onTimerModeChanged: () => void;
};

const ToggleMode = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
  justifyContent: 'center',
  padding: 0,
  minWidth: '1.5rem',
});

export const TimerControls = ({
  data,
  onStartClicked,
  onAddTimeEntryClicked,
  onStopClicked,
  onTimerModeChanged,
}: Props) => {
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
          {data.mode === 'timer' ? (
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
              {formatDuration(
                data.timerState.status === TimerStatus.Running
                  ? data.timerState.duration
                  : 0,
              )}
            </Box>
          ) : (
            <div></div>
          )}

          {data.mode === 'timer' ? (
            <div>
              {data.timerState.status === TimerStatus.Idle ? (
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
                  onClick={() => onStartClicked()}
                >
                  <BiPlay />
                </Button>
              ) : (
                <Button
                  color={'danger'}
                  variant="icon"
                  shape="rounded"
                  size={'xl'}
                  aria-label="Stop timer"
                  title="Stop timer"
                  onClick={() => onStopClicked()}
                >
                  <BiStop />
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
                onClick={() => onAddTimeEntryClicked()}
              >
                <BiPlus />
              </Button>
            </div>
          )}

          {data.mode === 'timer' &&
          data.timerState.status === TimerStatus.Running ? (
            <Box>
              <Button
                css={{
                  padding: '$4 $1',
                  minWidth: '1.5rem',
                }}
                variant={'icon'}
                color="transparent"
                size={'lg'}
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
                onClick={() => data.mode !== 'timer' && onTimerModeChanged()}
              >
                <BiPlay />
              </Button>
              <Button
                variant={'icon'}
                color="transparent"
                size={'sm'}
                title="Manual mode"
                onClick={() => data.mode !== 'manual' && onTimerModeChanged()}
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
