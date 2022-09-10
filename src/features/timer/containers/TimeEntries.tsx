import { useAuth } from 'auth/context/auth-context'
import { Spinner } from 'components'
import {
  differenceInMilliseconds,
  hoursToMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  minutesToMilliseconds,
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
import { nanoid } from 'nanoid'
import React from 'react'
import { calculatePercentage, invariant, numberPad, uniq } from 'utils'
import {
  ProjectsChart,
  TimeEntriesHeader,
} from '../components/TimeEntriesHeader'
import {
  GroupedTimeEntries,
  TimeEntriesList,
  ViewTimeEntry,
} from '../components/TimeEntriesList'

type TimeEntryInterval = {
  start: Date
  end: Date | undefined
}

type ProjectTimeEntries = {
  project: TimeEntryProject
  timeEntries: InactiveTimeEntry[]
}

const timeEntryStartDate = (timeEntry: InactiveTimeEntry) =>
  pipe(
    timeEntry,
    ({ timeInterval }) => timeInterval.start,
    time => time.slice(0, time.indexOf('T')),
  )

const getInterval = (timeEntry: InactiveTimeEntry): TimeEntryInterval =>
  pipe(timeEntry, ({ timeInterval }) => ({
    start: new Date(timeInterval.start),
    end: timeInterval.end ? new Date(timeInterval.end) : undefined,
  }))

const getIntervals = (timeEntries: InactiveTimeEntry[]): TimeEntryInterval[] =>
  pipe(timeEntries, A.map(getInterval))

const filterTimeEntriesByDate =
  (date: string) =>
  (timeEntries: InactiveTimeEntry[]): InactiveTimeEntry[] =>
    pipe(
      timeEntries,
      A.filter(timeEntry => pipe(timeEntry, timeEntryStartDate) === date),
    )

const getTimeEntriesByDate =
  (predicate: (date: Date) => boolean) => (timeEntries: InactiveTimeEntry[]) =>
    pipe(
      timeEntries,
      A.filter(flow(getInterval, ({ start }) => start, predicate)),
    )

const formatDurationToInlineTime = (ms: number): string => {
  const hours = millisecondsToHours(ms)
  const minutes = millisecondsToMinutes(ms - hoursToMilliseconds(hours))
  const seconds = millisecondsToSeconds(
    ms - hoursToMilliseconds(hours) - minutesToMilliseconds(minutes),
  )
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
    differenceInMilliseconds(
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
          filterTimeEntriesByDate(date),
          calculateTimeEntriesTotalDuration,
          formatDurationToInlineTime,
        ),
        timeEntries: pipe(
          timeEntries,
          filterTimeEntriesByDate(date),
          A.map(createViewTimeEntry),
        ),
      })),
    )

const calculateTimeEntriesTotalDuration = (
  timeEntries: InactiveTimeEntry[],
): number =>
  pipe(
    timeEntries,
    getIntervals,
    A.reduce(0, (duration, { start, end }) =>
      end ? duration + differenceInMilliseconds(end, start) : duration,
    ),
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
      }),
    ),
    data => Object.values(data),
  )

const getGroupedTimeEntries = (timeEntries: InactiveTimeEntry[]) =>
  pipe(
    timeEntries,
    A.map(timeEntryStartDate),
    uniq,
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
      const inactiveTimeEntries = timeEntries.filter(isInactiveTimeEntry)
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
        <>
          <TimeEntriesHeader
            projectsChart={projectChart}
            todayTotal={todayTotalTime}
            weekTotal={weekTotalTime}
          />
          <TimeEntriesList groupedTimeEntries={groupedTimeEntries} />
        </>
      )
  }
}
