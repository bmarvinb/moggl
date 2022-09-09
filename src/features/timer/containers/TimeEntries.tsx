import { useAuth } from 'auth/context/auth-context'
import { Spinner } from 'components'
import { nanoid } from 'nanoid'
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
  TimeEntry,
  TimeEntryProject,
} from 'features/timer/services/time-entries'
import { calculatePercentage } from 'features/timer/utils/time-entries-utils'
import { filter, map, reduce } from 'fp-ts/lib/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import React from 'react'
import { invariant, numberPad, uniq } from 'utils'
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
  timeEntries: TimeEntry[]
}

const timeEntryStartDate = (timeEntry: TimeEntry) =>
  pipe(
    timeEntry,
    ({ timeInterval }) => timeInterval.start,
    time => time.slice(0, time.indexOf('T')),
  )

const getInterval = (timeEntry: TimeEntry): TimeEntryInterval =>
  pipe(timeEntry, ({ timeInterval }) => ({
    start: new Date(timeInterval.start),
    end: timeInterval.end ? new Date(timeInterval.end) : undefined,
  }))

const getIntervals = (timeEntries: TimeEntry[]): TimeEntryInterval[] =>
  pipe(timeEntries, map(getInterval))

const filterTimeEntriesByDate =
  (date: string) =>
  (timeEntries: TimeEntry[]): TimeEntry[] =>
    pipe(
      timeEntries,
      filter(timeEntry => pipe(timeEntry, timeEntryStartDate) === date),
    )

const getTimeEntriesByDate =
  (predicate: (date: Date) => boolean) => (timeEntries: TimeEntry[]) =>
    pipe(
      timeEntries,
      filter(flow(getInterval, ({ start }) => start, predicate)),
    )

const createViewTimeEntry = (timeEntry: TimeEntry): ViewTimeEntry => ({
  id: timeEntry.id,
  description: timeEntry.description,
  project: {
    name: timeEntry.project.name,
    clientName: timeEntry.project.clientName,
  },
  start: new Date(timeEntry.timeInterval.start),
  end: new Date(timeEntry.timeInterval.end!),
  duration: formatDurationToInlineTime(
    differenceInMilliseconds(
      new Date(timeEntry.timeInterval.end!),
      new Date(timeEntry.timeInterval.start),
    ),
  ),
})

const groupTimeEntriesByDate =
  (timeEntries: TimeEntry[]) =>
  (dates: string[]): GroupedTimeEntries[] =>
    pipe(
      dates,
      map(date => ({
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
          map(createViewTimeEntry),
        ),
      })),
    )

const calculateTimeEntriesTotalDuration = (timeEntries: TimeEntry[]): number =>
  pipe(
    timeEntries,
    getIntervals,
    reduce(0, (duration, { start, end }) =>
      end ? duration + differenceInMilliseconds(end, start) : duration,
    ),
  )

const formatDurationToInlineTime = (ms: number): string => {
  const hours = millisecondsToHours(ms)
  const minutes = millisecondsToMinutes(ms - hoursToMilliseconds(hours))
  const seconds = millisecondsToSeconds(
    ms - hoursToMilliseconds(hours) - minutesToMilliseconds(minutes),
  )
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`
}

const groupTimeEntriesByProject = (
  timeEntries: TimeEntry[],
): ProjectTimeEntries[] =>
  pipe(
    timeEntries,
    reduce(
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

const getGroupedTimeEntries = (timeEntries: TimeEntry[]) =>
  pipe(
    timeEntries,
    map(timeEntryStartDate),
    uniq,
    groupTimeEntriesByDate(timeEntries),
  )

const getProjectCharts =
  (total: number) =>
  (projectTimeEntries: ProjectTimeEntries[]): ProjectsChart[] =>
    pipe(
      projectTimeEntries,
      map(({ project, timeEntries }) => ({
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

const getInlineTime = (timeEntries: TimeEntry[]) =>
  pipe(
    timeEntries,
    calculateTimeEntriesTotalDuration,
    formatDurationToInlineTime,
  )

const getProjectsChart = (timeEntries: TimeEntry[]): ProjectsChart[] =>
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
      const weekTimeEnties = pipe(
        timeEntries,
        getTimeEntriesByDate(isSameWeek(new Date())),
      )
      const dayTimeEnties = pipe(
        timeEntries,
        getTimeEntriesByDate(isSameDay(new Date())),
      )
      const projectChart = getProjectsChart(weekTimeEnties)
      const todayTotalTime = pipe(dayTimeEnties, getInlineTime)
      const weekTotalTime = pipe(weekTimeEnties, getInlineTime)
      const groupedTimeEntries = getGroupedTimeEntries(timeEntries)
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
