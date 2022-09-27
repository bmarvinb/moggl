import { Button, DangerButton } from 'components/Button'
import { IconButton } from 'components/IconButton'
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
import 'styled-components/macro'
import styled from 'styled-components/macro'

export type TimerControlsProps = {
  duration: O.Option<number>
  mode: TimerMode
  onStartClicked: () => void
  onAddTimeEntryClicked: () => void
  onStopClicked: () => void
  onTimerToggled: () => void
}

const StartButton = styled(Button)`
  display: inline-flex;
  padding: 0.5rem;
  border-radius: 100%;
  border: 2px solid var(--primary1);
  width: fit-content;
`

const StopButton = styled(DangerButton)`
  display: inline-flex;
  padding: 0.5rem;
  border-radius: 100%;
  border: 2px solid var(--red1);
  width: fit-content;
`

const ToggleMode = styled.div`
  width: 1.5rem;
  background: var(--neutral1);
  border-radius: var(--roundedMd);
  justify-content: center;
  height: 100%;
  display: grid;
  grid-row-gap: 0.25rem;
  padding: 0.25rem;
`

const ToggleModeButton = styled(IconButton)<{ selected$: boolean }>`
  background: ${props =>
    props.selected$ ? 'var(--neutral8)' : 'var(--neutral3)'};
  width: 0.875rem;
  height: 0.875rem;
  padding: 0;
  border-radius: 100%;
  color: var(--neutral0);
  &:hover {
    color: var(--neutral0);
    cursor: ${props => (props.selected$ ? 'default' : 'pointer')};
    background: ${props =>
      props.selected$ ? 'var(--neutral8)' : 'var(--neutral4)'};
  }
`

const OptionsButton = styled(IconButton)``

export const TimerControls: FC<TimerControlsProps> = props => {
  const inlineTime = pipe(
    props.duration,
    O.map(formatDuration),
    O.getOrElse(() => formatDuration(0)),
  )
  return (
    <div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 0.75rem;
            position: relative;
            left: -0.3rem;
          `}
        >
          <IconButton
            aria-label="Select project"
            css={`
              font-size: var(--fontSizeXl);
              position: relative;
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
        </div>

        <div
          css={`
            display: grid;
            grid-template-columns: 1fr auto auto;
            column-gap: 0.75rem;
            align-items: center;
          `}
        >
          {props.mode === TimerMode.Timer ? (
            <div
              css={`
                font-weight: 500;
                line-height: var(--lineHeightLg);
                min-width: 4rem;
                text-align: right;
              `}
            >
              {inlineTime}
            </div>
          ) : (
            <div></div>
          )}

          {props.mode === TimerMode.Timer ? (
            <div>
              {O.isNone(props.duration) ? (
                <StartButton
                  aria-label="Start timer"
                  title="Start timer"
                  onClick={() => props.onStartClicked()}
                >
                  <BiPlay
                    css={`
                      font-size: var(--fontSizeXl);
                      line-height: var(--lineHeightXl);
                      position: relative;
                      right: -0.05rem;
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
          ) : (
            <div>
              <StartButton
                aria-label="Add time entry"
                title="Add time entry"
                onClick={() => props.onAddTimeEntryClicked()}
              >
                <BiPlus
                  css={`
                    font-size: var(--fontSizeXl);
                    line-height: var(--lineHeightXl);
                    position: relative;
                    right: -0.05rem;
                  `}
                />
              </StartButton>
            </div>
          )}

          {O.isNone(props.duration) ? (
            <ToggleMode>
              <ToggleModeButton
                selected$={props.mode === TimerMode.Timer}
                title="Timer mode"
                onClick={props.onTimerToggled}
              >
                <BiPlay
                  css={`
                    font-size: var(--fontSizeXs);
                    line-height: var(--lineHeightXs);
                    position: relative;
                    right: -0.05rem;
                  `}
                />
              </ToggleModeButton>
              <ToggleModeButton
                selected$={props.mode === TimerMode.Manual}
                title="Manual mode"
                onClick={props.onTimerToggled}
              >
                <BiPlus
                  css={`
                    font-size: var(--fontSizeXs);
                    line-height: var(--lineHeightXs);
                  `}
                />
              </ToggleModeButton>
            </ToggleMode>
          ) : (
            <div
              css={`
                width: 1.5rem;
              `}
            >
              <OptionsButton>
                <BiDotsHorizontal
                  css={`
                    font-size: var(--fontSizeLg);
                    line-height: var(--lineHeightLg);
                  `}
                ></BiDotsHorizontal>
              </OptionsButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
