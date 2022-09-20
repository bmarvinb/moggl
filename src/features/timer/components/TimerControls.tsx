import { Button, DangerButton } from 'components/Button'
import { IconButton } from 'components/IconButton'
import { formatDurationToInlineTime } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import {
  BiBriefcase,
  BiDollar,
  BiPlay,
  BiPurchaseTag,
  BiStop,
} from 'react-icons/bi'
import 'styled-components/macro'
import styled from 'styled-components/macro'

export type TimerControlsProps = {
  duration: O.Option<number>
  onStartClicked: () => void
  onStopClicked: () => void
}

const StartButton = styled(Button)`
  display: flex;
  padding: 0.5rem;
  border-radius: 100%;
  outline: 2px solid var(--primary1);
`

const StopButton = styled(DangerButton)`
  display: flex;
  padding: 0.5rem;
  border-radius: 100%;
  outline: 2px solid var(--red1);
`

export const TimerControls: FC<TimerControlsProps> = props => {
  const inlineTime = pipe(
    props.duration,
    O.map(formatDurationToInlineTime),
    O.getOrElse(() => formatDurationToInlineTime(0)),
  )
  return (
    <div>
      <div
        css={`
          display: grid;
          grid-template-columns: 2rem 2rem 2rem 4rem 1fr;
          grid-column-gap: 0.5rem;
          align-items: center;
        `}
      >
        <IconButton
          aria-label="Select project"
          css={`
            font-size: var(--fontSizeXl);
          `}
        >
          <BiBriefcase title="Select project" />
        </IconButton>
        <IconButton
          aria-label="Select tags"
          css={`
            font-size: var(--fontSizeXl);
          `}
        >
          <BiPurchaseTag title="Select tags" />
        </IconButton>
        <IconButton
          aria-label="Change billable status"
          css={`
            font-size: var(--fontSizeXl);
          `}
        >
          <BiDollar title="Change billable status" />
        </IconButton>

        <div
          css={`
            font-weight: 500;
            line-height: var(--lineHeightLg);
          `}
        >
          {inlineTime}
        </div>

        {O.isNone(props.duration) ? (
          <StartButton
            aria-label="Start timer"
            title="Start timer"
            onClick={() => props.onStartClicked()}
            css={``}
          >
            <BiPlay
              css={`
                font-size: var(--fontSizeXl);
                line-height: var(--lineHeightXl);
              `}
            />
          </StartButton>
        ) : (
          <StopButton
            aria-label="Stop timer"
            title="Stop timer"
            onClick={() => props.onStopClicked()}
          >
            <BiStop
              css={`
                font-size: var(--fontSizeXl);
                line-height: var(--lineHeightXl);
              `}
            />
          </StopButton>
        )}
      </div>
    </div>
  )
}
