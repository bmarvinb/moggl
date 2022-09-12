import { FC } from 'react'
import styled from 'styled-components/macro'
import 'styled-components/macro'

export type TimeEntriesHeaderProps = {
  weekTotal: string
  todayTotal: string
}

const Title = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.blueGrey9};
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
`

const Label = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.blueGrey6};
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
`

const WeekInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`

const Time = styled.span`
  font-size: ${props => props.theme.fonts.sm.fontSize};
  line-height: ${props => props.theme.fonts.sm.lineHeight};
  font-weight: 500;
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  return (
    <>
      <WeekInfo>
        <Title>This week</Title>
        <div
          css={`
            display: flex;
          `}
        >
          <div
            css={`
              margin-right: 1rem;
            `}
          >
            <Label>Today:</Label> <Time>{props.todayTotal}</Time>
          </div>
          <div>
            <Label>Week total:</Label> <Time>{props.weekTotal}</Time>
          </div>
        </div>
      </WeekInfo>
    </>
  )
}
