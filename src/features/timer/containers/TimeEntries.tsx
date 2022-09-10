import { useAuth } from 'auth/context/auth-context'
import { Spinner } from 'components'
import {
  format,
  differenceInSeconds,
  secondsToHours,
  hoursToSeconds,
  secondsToMinutes,
  minutesToSeconds,
} from 'date-fns'
import { isSameDay, isSameWeek } from 'date-fns/fp'
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries'
import {
  InactiveTimeEntry,
  TimeEntryProject,
} from 'features/timer/services/time-entries'
import { isInactiveTimeEntry } from 'features/timer/utils/time-entries-utils'
import * as A from 'fp-ts/lib/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import * as S from 'fp-ts/lib/string'
import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'
import { numberPad, calculatePercentage } from 'utils/number'
import { invariant } from 'utils/invariant'
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

const Container = styled.div`
  min-height: 100%;
  background: ${props => props.theme.pallete.blueGrey0};
`

const filterTimeEntriesByDate =
  (date: Date) =>
  (timeEntries: InactiveTimeEntry[]): InactiveTimeEntry[] =>
    pipe(
      timeEntries,
      A.filter(timeEntry =>
        isSameDay(new Date(timeEntry.timeInterval.start), date),
      ),
    )

const getTimeEntriesByDate =
  (predicate: (date: Date) => boolean) => (timeEntries: InactiveTimeEntry[]) =>
    pipe(
      timeEntries,
      A.filter(
        flow(({ timeInterval }) => new Date(timeInterval.start), predicate),
      ),
    )

const formatDurationToInlineTime = (duration: number): string => {
  const hours = secondsToHours(duration)
  const minutes = secondsToMinutes(duration - hoursToSeconds(hours))
  const seconds = duration - hoursToSeconds(hours) - minutesToSeconds(minutes)
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`
}

const createViewTimeEntry = (timeEntry: InactiveTimeEntry): ViewTimeEntry => ({
  id: timeEntry.id,
  description: timeEntry.description,
  project: {
    name: timeEntry.project.name,
    clientName: timeEntry.project.clientName,
  },
  start: new Date(timeEntry.timeInterval.start),
  end: new Date(timeEntry.timeInterval.end!),
  duration: pipe(
    differenceInSeconds(
      new Date(timeEntry.timeInterval.end!),
      new Date(timeEntry.timeInterval.start),
    ),
    formatDurationToInlineTime,
  ),
})

const groupTimeEntriesByDate =
  (timeEntries: InactiveTimeEntry[]) =>
  (dates: string[]): GroupedTimeEntries[] =>
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

const calculateTimeEntriesTotalDuration = (
  timeEntries: InactiveTimeEntry[],
): number =>
  pipe(
    timeEntries,
    A.reduce(0, (duration, timeEntry) => {
      return timeEntry.timeInterval.end
        ? duration +
            differenceInSeconds(
              new Date(timeEntry.timeInterval.end),
              new Date(timeEntry.timeInterval.start),
            )
        : duration
    }),
  )

const groupTimeEntriesByProject = (
  timeEntries: InactiveTimeEntry[],
): ProjectTimeEntries[] =>
  pipe(
    timeEntries,
    A.reduce(
      {} as {
        [key: string]: ProjectTimeEntries
      },
      (acc, timeEntry) => ({
        ...acc,
        [timeEntry.project.id]: {
          project: timeEntry.project,
          timeEntries: acc[timeEntry.project.id]
            ? [...acc[timeEntry.project.id].timeEntries, timeEntry]
            : [timeEntry],
        },
      }), ),
    Object.values,
  )

const getStartDate = (timeEntry: InactiveTimeEntry[]): string[] =>
  pipe(
    timeEntry,
    A.map(timeEntry => format(new Date(timeEntry.timeInterval.start), 'PP')),
  )

const getGroupedTimeEntries = (
  timeEntries: InactiveTimeEntry[],
): GroupedTimeEntries[] =>
  pipe(
    timeEntries,
    getStartDate,
    A.uniq(S.Eq),
    groupTimeEntriesByDate(timeEntries),
  )

const getProjectCharts =
  (total: number) =>
  (projectTimeEntries: ProjectTimeEntries[]): ProjectsChart[] =>
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

const getInlineTime = (timeEntries: InactiveTimeEntry[]) =>
  pipe(
    timeEntries,
    calculateTimeEntriesTotalDuration,
    formatDurationToInlineTime,
  )

const getProjectsChart = (timeEntries: InactiveTimeEntry[]): ProjectsChart[] =>
  pipe(
    timeEntries,
    groupTimeEntriesByProject,
    getProjectCharts(pipe(timeEntries, calculateTimeEntriesTotalDuration)),
  )

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
