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
  onTimerToggled: () => void
}

const ToggleMode = styled('div', {
  width: '1.5rem',
  background: '$neutral1',
  borderRadius: '$md',
  justifyContent: 'center',
  height: '100%',
  display: 'grid',
  gridRowGap: '$0',
  padding: '$0',
})

const ToggleModeButton = styled(Button, {
  variants: {
    selected: {
      true: {
        cursor: 'default',
        background: '$neutral8',
      },
      false: {
        background: '$neutral3',
        '&:hover': {
          background: '$neutral6',
        },
      },
    },
  },
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
            columnGap: '0.75rem',
            position: 'relative',
            left: '-0.3rem',
          }}
        >
          <Button
            use="icon"
            color="primary"
            size={'xl'}
            aria-label="Select project"
          >
            <BiBriefcase title="Select project" />
          </Button>
          <Button
            use="icon"
            color="primary"
            size={'xl'}
            aria-label="Select tags"
          >
            <BiPurchaseTag title="Select tags" />
          </Button>
          <Button
            use="icon"
            color="primary"
            size={'xl'}
            aria-label="Change billable status"
          >
            <BiDollar title="Change billable status" />
          </Button>
        </Box>

        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            columnGap: '0.75rem',
            alignItems: 'center',
          }}
        >
          {props.mode === TimerMode.Timer ? (
            <Box
              css={{
                fontWeight: 500,
                fontSize: '$lg',
                lineHeight: '$lg',
                minWidth: '4rem',
                textAlign: 'right',
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
                  use="FAB"
                  color={'primary'}
                  aria-label="Start timer"
                  size={'xl'}
                  title="Start timer"
                  onClick={() => props.onStartClicked()}
                >
                  <BiPlay />
                </Button>
              ) : (
                <Button
                  use="FAB"
                  color={'danger'}
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
                use="FAB"
                color={'primary'}
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
              <ToggleModeButton
                use={'icon'}
                size={'xs'}
                selected={props.mode === TimerMode.Timer}
                title="Timer mode"
              >
                <BiPlay />
              </ToggleModeButton>
              <ToggleModeButton
                use={'icon'}
                size={'xs'}
                selected={props.mode === TimerMode.Manual}
                title="Manual mode"
              >
                <BiPlus />
              </ToggleModeButton>
            </ToggleMode>
          ) : (
            <Box
              css={{
                width: '1.5rem',
              }}
            >
              <Button use={'icon'} color="primary" size={'lg'}>
                <BiDotsHorizontal></BiDotsHorizontal>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}
