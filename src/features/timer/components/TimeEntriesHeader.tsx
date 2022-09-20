import { useActiveDuration } from 'features/timer/hooks/useActiveDuration'
import { ActiveTimeEntry } from 'features/timer/types/time-entries'
import { formatDurationToInlineTime } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  currentWeekDuration: number
  activeTimeEntry: O.Option<ActiveTimeEntry>
}

const Title = styled.div`
  font-weight: 700;
  font-size: var(--fontSizeXl);
  line-height: var(--lineHeightXl);
`

const TotalTime = styled.span`
  font-weight: 400;
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
  color: var(--neutral8);
  margin-left: 0.5rem;
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  const duration = useActiveDuration(props.activeTimeEntry)
  const inlineTime = pipe(
    duration,
    O.map(duration =>
      formatDurationToInlineTime(duration + props.currentWeekDuration),
    ),
    O.getOrElse(() => formatDurationToInlineTime(props.currentWeekDuration)),
  )

  return (
    <>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
        `}
      >
        <Title>
          This week
          <TotalTime>{inlineTime}</TotalTime>
        </Title>
      </div>
    </>
  )
}
