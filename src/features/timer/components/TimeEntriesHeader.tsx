import { FC } from 'react'
import styled from 'styled-components/macro'
import 'styled-components/macro'

export type ProjectsChart = {
  id: string
  name: string
  color: string
  duration: string
  percent: number
}

export type TimeEntriesHeaderProps = {
  weekTotal: string
  todayTotal: string
  projectsChart: ProjectsChart[]
}

const Container = styled.div`
  background: ${props => props.theme.pallete.blueGrey0};
`

const Title = styled.div`
  font-weight: 500;
  color: ${props => props.theme.pallete.blueGrey9};
  font-size: ${({ theme }) => theme.typography.textSm.fontSize};
  line-height: ${({ theme }) => theme.typography.textSm.lineHeight};
`

const Label = styled.span`
  font-weight: 500;
  color: ${props => props.theme.pallete.blueGrey6};
  font-size: ${({ theme }) => theme.typography.textSm.fontSize};
  line-height: ${({ theme }) => theme.typography.textSm.lineHeight};
`

const ProjectChartBlock = styled.div<{ color: string; percent: number }>`
  width: ${({ percent }) => percent}%;

  &:not(:last-child) {
    margin-right: 2px;
  }
`

const ProjectChartLine = styled.div<{ color: string; percent: number }>`
  background: ${({ color }) => color};
  height: 4px;
  width: 100%;
  border-radius: 2px;
`

const ProjectChartLabel = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.typography.textXs.fontSize};
  line-height: ${({ theme }) => theme.typography.textXs.lineHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 500;
`

const WeekInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0.5rem;
`

const Time = styled.span`
  font-size: ${props => props.theme.typography.textSm.fontSize};
  line-height: ${props => props.theme.typography.textSm.lineHeight};
  font-weight: 500;
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  return (
    <Container>
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
      <div
        css={`
          display: flex;
          padding: 1.5rem 1rem 2rem;
        `}
      >
        {props.projectsChart.map(project => (
          <ProjectChartBlock
            key={project.id}
            color={project.color}
            percent={project.percent}
          >
            <ProjectChartLabel color={project.color}>
              {project.name}
            </ProjectChartLabel>
            <ProjectChartLine
              color={project.color}
              percent={project.percent}
            ></ProjectChartLine>
          </ProjectChartBlock>
        ))}
      </div>
    </Container>
  )
}
