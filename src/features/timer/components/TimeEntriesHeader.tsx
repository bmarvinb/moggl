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
`

const InlineTime = styled.span`
  font-weight: 500;
`

export const TimeEntriesHeader: FC<TimeEntriesHeaderProps> = props => {
  return (
    <div>
      <WeekInfo>
        <div
          css={`
            font-weight: 500;
          `}
        >
          This week
        </div>
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
            Today: <InlineTime>{props.todayTotal}</InlineTime>
          </div>
          <div>
            Total: <InlineTime>{props.weekTotal}</InlineTime>
          </div>
        </div>
      </WeekInfo>
      <div
        css={`
          display: flex;
          padding: 1.5rem 1rem;
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
    </div>
  )
}
