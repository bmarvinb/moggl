import { FC } from 'react'
import styled from 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  weekTotal: string
  todayTotal: string
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
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  return (
    <>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        `}
      >
        <Title>
          This week <TotalTime>{props.weekTotal}</TotalTime>
        </Title>
      </div>
    </>
  )
}
