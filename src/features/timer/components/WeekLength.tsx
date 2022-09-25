import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { formatDuration } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type WeekLengthProps = {
  timeEntryDuration: O.Option<number>
  weekDuration: number
  activeTimeEntry: O.Option<ActiveTimeEntry>
}

const Title = styled.div`
  font-weight: 700;
  font-size: var(--fontSizeXl);
  line-height: var(--lineHeightXl);
`

const TotalTime = styled.div`
  display: inline-flex;
  font-weight: 400;
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
  color: var(--neutral8);
  margin-left: 0.5rem;
  min-width: 5rem;
`

export const WeekLength: FC<WeekLengthProps> = props => {
  const totalTime = pipe(
    props.timeEntryDuration,
    O.map(duration => formatDuration(duration + props.weekDuration)),
    O.getOrElse(() => formatDuration(props.weekDuration)),
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
          <TotalTime>{totalTime}</TotalTime>
        </Title>
      </div>
    </>
  )
}
