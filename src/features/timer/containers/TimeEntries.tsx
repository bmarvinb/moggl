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

const filterTimeEntriesByDate = (
  date: string,
  timeEntries: TimeEntry[],
): TimeEntry[] =>
  pipe(
    timeEntries,
    filter(timeEntry => pipe(timeEntry, timeEntryStartDate) === date),
  )

const groupTimeEntriesByDate =
  (timeEntries: TimeEntry[]) =>
  (dates: string[]): GroupedTimeEntries[] =>
    pipe(
      dates,
      map(date => ({
        date: new Date(date),
        timeEntries: filterTimeEntriesByDate(date, timeEntries),
      })),
    )

const filterIntervalsByWeek =
  (date: Date) => (intervals: TimeEntryInterval[]) =>
    pipe(intervals, filter(flow(({ start }) => start, isSameWeek(date))))

const filterIntervalsByDay = (date: Date) => (intervals: TimeEntryInterval[]) =>
  pipe(intervals, filter(flow(({ start }) => start, isSameDay(date))))

const calculateIntervalsTotalDuration = (
  intervals: TimeEntryInterval[],
): number =>
  pipe(
    intervals,
    reduce(0, (duration, { start, end }) =>
      end ? duration + differenceInMilliseconds(end, start) : duration,
    ),
  )

const formatDurationToInlineTime = (msDuration: number): string => {
  const hours = millisecondsToHours(msDuration)
  const minutes = millisecondsToMinutes(msDuration - hoursToMilliseconds(hours))
  const seconds = millisecondsToSeconds(
    msDuration - hoursToMilliseconds(hours) - minutesToMilliseconds(minutes),
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
          getIntervals,
          calculateIntervalsTotalDuration,
          formatDurationToInlineTime,
        ),
        percent: calculatePercentage(
          total,
          pipe(timeEntries, getIntervals, calculateIntervalsTotalDuration),
        ),
      })),
    )

const getInlineTime =
  (filterFn: (xs: TimeEntryInterval[]) => TimeEntryInterval[]) =>
  (timeEntriesIntervals: TimeEntryInterval[]) =>
    pipe(
      timeEntriesIntervals,
      filterFn,
      calculateIntervalsTotalDuration,
      formatDurationToInlineTime,
    )

const getTotalByWeek =
  (date: Date) => (timeEntriesIntervals: TimeEntryInterval[]) =>
    pipe(timeEntriesIntervals, getInlineTime(filterIntervalsByWeek(date)))

const getTotalByDay =
  (date: Date) => (timeEntriesIntervals: TimeEntryInterval[]) =>
    pipe(timeEntriesIntervals, getInlineTime(filterIntervalsByDay(date)))

const calculateTotal = (timeEntries: TimeEntry[]) =>
  pipe(timeEntries, getIntervals, calculateIntervalsTotalDuration)

const getProjectsChart = (timeEntries: TimeEntry[]): ProjectsChart[] =>
  pipe(
    timeEntries,
    groupTimeEntriesByProject,
    getProjectCharts(pipe(timeEntries, calculateTotal)),
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
        filter(flow(getInterval, ({ start }) => start, isSameWeek(new Date()))),
      )
      const projectsChart = getProjectsChart(weekTimeEnties)
      const timeEntriesIntervals = pipe(weekTimeEnties, getIntervals)
      const todayTotal = pipe(timeEntriesIntervals, getTotalByDay(new Date()))
      const weekTotal = pipe(timeEntriesIntervals, getTotalByWeek(new Date()))
      const groupedTimeEntries = getGroupedTimeEntries(timeEntries)
      return (
        <>
          <TimeEntriesHeader
            projectsChart={projectsChart}
            todayTotal={todayTotal}
            weekTotal={weekTotal}
          />
          <TimeEntriesList timeEntries={groupedTimeEntries} />
        </>
      )
  }
}
