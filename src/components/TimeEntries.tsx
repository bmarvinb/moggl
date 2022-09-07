import { Spinner } from 'components/common'
import { TimeEntriesHeader } from 'components/TimeEntriesHeader'
import { GroupedTimeEntries, TimeEntriesList } from 'components/TimeEntriesList'
import { useAuth } from 'context/auth-context'
import {
  differenceInMilliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  minutesToMilliseconds,
  hoursToMilliseconds,
} from 'date-fns'
import { isSameWeek } from 'date-fns/fp'
import { map, filter, reduce } from 'fp-ts/lib/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { useTimeEntries } from 'hooks/useTimeEntries'
import React from 'react'
import { TimeEntry } from 'services/time-entries'
import { invariant, numberPad, removeDuplicates as uniq } from 'utils'

type Interval = {
  start: Date
  end: Date | undefined
}

const timeEntryStartDate = (timeEntry: TimeEntry) =>
  pipe(
    timeEntry,
    ({ timeInterval }) => timeInterval.start,
    time => time.slice(0, time.indexOf('T')),
  )

const getIntervals = (timeEntries: TimeEntry[]): Interval[] =>
  pipe(
    timeEntries,
    map(({ timeInterval }) => ({
      start: new Date(timeInterval.start),
      end: timeInterval.end ? new Date(timeInterval.end) : undefined,
    })),
  )

const getTimeEntryDates = (timeEntries: TimeEntry[]): string[] =>
  pipe(timeEntries, map(timeEntryStartDate), uniq)

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

const getIntervalsByDate = (date: Date) => (intervals: Interval[]) =>
  pipe(intervals, filter(flow(({ start }) => start, isSameWeek(date))))

const getWeekTotalDuration = (intervals: Interval[]): number =>
  pipe(
    intervals,
    reduce(0, (duration, { start, end }) =>
      end ? duration + differenceInMilliseconds(end, start) : duration,
    ),
  )

const getFormattedWeekTotal = (msDuration: number): string => {
  const hours = millisecondsToHours(msDuration)
  const minutes = millisecondsToMinutes(msDuration - hoursToMilliseconds(hours))
  const seconds = millisecondsToSeconds(
    msDuration - hoursToMilliseconds(hours) - minutesToMilliseconds(minutes),
  )
  return `${hours}:${numberPad(minutes)}:${numberPad(seconds)}`
}

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
      const groupedTimeEntries = pipe(
        timeEntries,
        getTimeEntryDates,
        groupTimeEntriesByDate(timeEntries),
      )
      const weekTotal = pipe(
        timeEntries,
        getIntervals,
        getIntervalsByDate(new Date()),
        getWeekTotalDuration,
        getFormattedWeekTotal,
      )
      return (
        <>
          <TimeEntriesHeader weekTotal={weekTotal} />
          <TimeEntriesList timeEntries={groupedTimeEntries} />
        </>
      )
  }
}
