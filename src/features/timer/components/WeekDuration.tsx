import { formatDuration } from 'features/timer/utils/time-entries-utils'
import { FC } from 'react'
import styled from 'styled-components/macro'

export type WeekDurationProps = {
  weekDuration: number
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

export const WeekDuration: FC<WeekDurationProps> = props => {
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
          <TotalTime>{formatDuration(props.weekDuration)}</TotalTime>
        </Title>
      </div>
    </>
  )
}
