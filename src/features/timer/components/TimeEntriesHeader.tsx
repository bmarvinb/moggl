import { FC } from 'react'
import styled from 'styled-components/macro'
import 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  weekTotal: string
  todayTotal: string
}

const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.color.blueGrey9};
  font-size: ${({ theme }) => theme.font.xl};
  line-height: ${({ theme }) => theme.font.xl};
`

const Time = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.font.lg};
  line-height: ${({ theme }) => theme.font.lg};
  color: ${({ theme }) => theme.color.blueGrey6};
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
          This week <Time>{props.weekTotal}</Time>
        </Title>
      </div>
    </>
  )
}
