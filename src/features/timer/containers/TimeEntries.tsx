import { useAuth } from 'auth/context/auth-context'
import { Spinner } from 'components'
import {
  format,
  hoursToSeconds,
  minutesToSeconds,
  secondsToHours,
  secondsToMinutes,
} from 'date-fns'
import { isSameDay, isSameWeek } from 'date-fns/fp'
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries'
import {
  InactiveTimeEntry,
  TimeEntryProject,
} from 'features/timer/services/time-entries'
import {
  isInactiveTimeEntry,
  timeEntryDuration,
} from 'features/timer/utils/time-entries-utils'
import * as A from 'fp-ts/lib/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import * as M from 'fp-ts/lib/Monoid'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'
import { invariant } from 'utils/invariant'
import { calculatePercentage, numberPad } from 'utils/number'
import {
  ProjectsChart,
  TimeEntriesHeader,
} from '../components/TimeEntriesHeader'
import {
  GroupedTimeEntries,
  TimeEntriesList,
  ViewTimeEntry,
} from '../components/TimeEntriesList'

type ProjectTimeEntries = {
  project: TimeEntryProject
  timeEntries: InactiveTimeEntry[]
}

function createViewTimeEntry(timeEntry: InactiveTimeEntry): ViewTimeEntry {
  return {
    id: timeEntry.id,
    description: timeEntry.description,
    project: {
      name: timeEntry.project.name,
      clientName: timeEntry.project.clientName,
    },
    start: new Date(timeEntry.timeInterval.start),
    end: new Date(timeEntry.timeInterval.end),
    duration: pipe(timeEntry, timeEntryDuration, formatDurationToInlineTime),
  }
}

function filterTimeEntriesByDate(date: Date) {
  return (timeEntries: InactiveTimeEntry[]): InactiveTimeEntry[] =>
    pipe(
      timeEntries,
      A.filter(({ timeInterval }) =>
        isSameDay(new Date(timeInterval.start), date),
      ),
    )
}

function getTimeEntriesByDate(predicate: (date: Date) => boolean) {
  return (timeEntries: InactiveTimeEntry[]) =>
    pipe(
      timeEntries,
      A.filter(
        flow(({ timeInterval }) => new Date(timeInterval.start), predicate),
      ),
    )
}

function formatDurationToInlineTime(duration: number): string {
  const hours = secondsToHours(duration)
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours))
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes)
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`
}

function groupTimeEntriesByDate(timeEntries: InactiveTimeEntry[]) {
  return (dates: string[]): GroupedTimeEntries[] =>
    pipe(
      dates,
      A.map(date => ({
        id: nanoid(),
        date: new Date(date),
        totalTime: pipe(
          timeEntries,
          filterTimeEntriesByDate(new Date(date)),
          calculateTimeEntriesTotalDuration,
          formatDurationToInlineTime,
        ),
        timeEntries: pipe(
          timeEntries,
          filterTimeEntriesByDate(new Date(date)),
          A.map(createViewTimeEntry),
        ),
      })),
    )
}

const calculateTimeEntriesTotalDuration = (
  timeEntries: InactiveTimeEntry[],
): number =>
  pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum))

const groupTimeEntriesByProject = (
  timeEntries: InactiveTimeEntry[],
): ProjectTimeEntries[] =>
  pipe(
    timeEntries,
    A.reduce({} as Record<string, ProjectTimeEntries>, (acc, timeEntry) => ({
      ...acc,
      [timeEntry.project.id]: {
        project: timeEntry.project,
        timeEntries: acc[timeEntry.project.id]
          ? [...acc[timeEntry.project.id].timeEntries, timeEntry]
          : [timeEntry],
      },
    })),
    Object.values,
  )

const getStartDate = (timeEntry: InactiveTimeEntry[]): string[] =>
  pipe(
    timeEntry,
    A.map(({ timeInterval }) => format(new Date(timeInterval.start), 'PP')),
  )

function getGroupedTimeEntries(
  timeEntries: InactiveTimeEntry[],
): GroupedTimeEntries[] {
  return pipe(
    timeEntries,
    getStartDate,
    A.uniq(S.Eq),
    groupTimeEntriesByDate(timeEntries),
  )
}

function getProjectCharts(total: number) {
  return (projectTimeEntries: ProjectTimeEntries[]): ProjectsChart[] =>
    pipe(
      projectTimeEntries,
      A.map(({ project, timeEntries }) => ({
        id: project.id,
        name: project.name,
        color: project.color,
        duration: pipe(
          timeEntries,
          calculateTimeEntriesTotalDuration,
          formatDurationToInlineTime,
        ),
        percent: calculatePercentage(
          total,
          pipe(timeEntries, calculateTimeEntriesTotalDuration),
        ),
      })),
    )
}

function getInlineTime(timeEntries: InactiveTimeEntry[]) {
  return pipe(
    timeEntries,
    calculateTimeEntriesTotalDuration,
    formatDurationToInlineTime,
  )
}

function getProjectsChart(timeEntries: InactiveTimeEntry[]): ProjectsChart[] {
  return pipe(
    timeEntries,
    groupTimeEntriesByProject,
    getProjectCharts(pipe(timeEntries, calculateTimeEntriesTotalDuration)),
  )
}

const Container = styled.div`
  min-height: 100%;
  background: ${props => props.theme.colors.blueGrey0};
`

export const TimeEntries: React.FC = () => {
  const { user, workspace } = useAuth()
  invariant(user, 'User must be provided')
  invariant(workspace, 'Workspace must be provided')

  const { status, data: timeEntries } = useTimeEntries(workspace.id, user.id)
  switch (status) {
    case 'loading':
      return <Spinner />
    case 'error':
      return <div>Error</div>
    case 'success':
      const inactiveTimeEntries = pipe(
        timeEntries,
        A.filter(isInactiveTimeEntry),
      )
      const weekTimeEnties = pipe(
        inactiveTimeEntries,
        getTimeEntriesByDate(isSameWeek(new Date())),
      )
      const dayTimeEnties = pipe(
        inactiveTimeEntries,
        getTimeEntriesByDate(isSameDay(new Date())),
      )
      const projectChart = getProjectsChart(weekTimeEnties)
      const todayTotalTime = getInlineTime(dayTimeEnties)
      const weekTotalTime = getInlineTime(weekTimeEnties)
      const groupedTimeEntries = getGroupedTimeEntries(inactiveTimeEntries)
      return (
        <Container>
          <TimeEntriesHeader
            projectsChart={projectChart}
            todayTotal={todayTotalTime}
            weekTotal={weekTotalTime}
          />
          <TimeEntriesList groupedTimeEntries={groupedTimeEntries} />
        </Container>
      )
  }
}
