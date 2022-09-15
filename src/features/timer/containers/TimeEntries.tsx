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
import { InactiveTimeEntry } from 'features/timer/services/time-entries'
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
import { FC } from 'react'
import styled from 'styled-components'
import { invariant } from 'utils/invariant'
import { numberPad } from 'utils/number'
import {
  ReportedDays,
  ReportedDay,
  TimeEntryRowData,
} from '../components/ReportedDays'
import { TimeEntriesHeader } from '../components/TimeEntriesHeader'

function createViewTimeEntry(timeEntry: InactiveTimeEntry): TimeEntryRowData {
  return {
    id: timeEntry.id,
    description: timeEntry.description,
    project: {
      name: timeEntry.project.name,
      color: timeEntry.project.color,
      clientName: timeEntry.project.clientName || undefined,
    },
    task: timeEntry.task?.name || undefined,
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
  return (dates: string[]): ReportedDay[] =>
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

function calculateTimeEntriesTotalDuration(
  timeEntries: InactiveTimeEntry[],
): number {
  return pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum))
}

function getStartDate(timeEntry: InactiveTimeEntry[]): string[] {
  return pipe(
    timeEntry,
    A.map(({ timeInterval }) => format(new Date(timeInterval.start), 'PP')),
  )
}

function getReportedDays(timeEntries: InactiveTimeEntry[]): ReportedDay[] {
  return pipe(
    timeEntries,
    getStartDate,
    A.uniq(S.Eq),
    groupTimeEntriesByDate(timeEntries),
  )
}

function getInlineTime(timeEntries: InactiveTimeEntry[]) {
  return pipe(
    timeEntries,
    calculateTimeEntriesTotalDuration,
    formatDurationToInlineTime,
  )
}

const Container = styled.div`
  min-height: 100%;
  background: var(--neutral1);
`

export const TimeEntries: FC = () => {
  const { user, workspace } = useAuth()
  invariant(user, 'User must be provided')
  invariant(workspace, 'Workspace must be provided')
  console.log('container render')

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
      const todayTotalTime = getInlineTime(dayTimeEnties)
      const weekTotalTime = getInlineTime(weekTimeEnties)
      const reportedDays = getReportedDays(inactiveTimeEntries)
      return (
        <Container>
          <TimeEntriesHeader
            todayTotal={todayTotalTime}
            weekTotal={weekTotalTime}
          />
          <ReportedDays reportedDays={reportedDays} />
        </Container>
      )
  }
}
