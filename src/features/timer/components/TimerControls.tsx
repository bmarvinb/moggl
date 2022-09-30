import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { TimerMode } from 'features/timer/machines/timerMachine'
import { formatDuration } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import {
  BiBriefcase,
  BiDollar,
  BiDotsHorizontal,
  BiPlay,
  BiPlus,
  BiPurchaseTag,
  BiStop,
} from 'react-icons/bi'
import { styled } from 'theme/config'

export type TimerControlsProps = {
  duration: O.Option<number>
  mode: TimerMode
  onStartClicked: () => void
  onAddTimeEntryClicked: () => void
  onStopClicked: () => void
  onTimerModeChanged: () => void
}

const ToggleMode = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
  justifyContent: 'center',
  padding: 0,
  boxShadow: '$xs',
  border: '1px solid $neutral2',
})

export const TimerControls: FC<TimerControlsProps> = props => {
  const inlineTime = pipe(
    props.duration,
    O.map(formatDuration),
    O.getOrElse(() => formatDuration(0)),
  )
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
            fill="outline"
            color="transparent"
            size={'lg'}
            aria-label="Select project"
          >
            <BiBriefcase title="Select project" />
          </Button>
          <Button
            variant="icon"
            fill="outline"
            color="transparent"
            size={'lg'}
            aria-label="Select tags"
          >
            <BiPurchaseTag title="Select tags" />
          </Button>
          <Button
            variant="icon"
            fill="outline"
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
          }}
        >
          {props.mode === TimerMode.Timer ? (
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
              {inlineTime}
            </Box>
          ) : (
            <div></div>
          )}

          {props.mode === TimerMode.Timer ? (
            <div>
              {O.isNone(props.duration) ? (
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
                  onClick={() => props.onStartClicked()}
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
                  onClick={() => props.onStopClicked()}
                >
                  <BiStop />
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button
                color="transparent"
                fill="outline"
                size={'xl'}
                aria-label="Add time entry"
                title="Add time entry"
                onClick={() => props.onAddTimeEntryClicked()}
              >
                <BiPlus />
              </Button>
            </div>
          )}

          {O.isNone(props.duration) ? (
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
                onClick={() =>
                  props.mode !== TimerMode.Timer && props.onTimerModeChanged()
                }
              >
                <BiPlay />
              </Button>
              <Button
                variant={'icon'}
                color="transparent"
                size={'sm'}
                title="Manual mode"
                onClick={() =>
                  props.mode !== TimerMode.Manual && props.onTimerModeChanged()
                }
              >
                <BiPlus />
              </Button>
            </ToggleMode>
          ) : (
            <Box>
              <Button variant={'icon'} color="transparent" size={'lg'}>
                <BiDotsHorizontal></BiDotsHorizontal>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}
