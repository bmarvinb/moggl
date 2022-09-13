import { FC } from 'react'
import styled from 'styled-components/macro'
import 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  weekTotal: string
  todayTotal: string
}

const Title = styled.div`
  font-weight: 700;
  color: ${props => props.theme.colors.blueGrey9};
  font-size: ${({ theme }) => theme.fonts.xl.fontSize};
  line-height: ${({ theme }) => theme.fonts.xl.lineHeight};
`

const Time = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fonts.lg.fontSize};
  line-height: ${({ theme }) => theme.fonts.lg.lineHeight};
  color: ${props => props.theme.colors.blueGrey6};
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
