import { formatDurationToInlineTime } from 'features/timer/utils/time-entries-utils'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  weekTotalDuration: number
}

const Title = styled.div`
  font-weight: 700;
  color: var(--neutral9);
  font-size: var(--fontSizeXl);
  line-height: var(--lineHeightXl);
`

const TotalTime = styled.span`
  font-weight: 400;
  font-size: var(--fontSizeLg);
  line-height: var(--lineHeightLg);
  color: var(--neutral7);
  margin-left: 0.5rem;
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
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
          <TotalTime>
            {formatDurationToInlineTime(props.weekTotalDuration)}
          </TotalTime>
        </Title>
      </div>
    </>
  )
}
