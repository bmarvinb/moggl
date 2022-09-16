import { useAuth } from 'auth/context/auth-context'
import { Spinner } from 'components'
import { format } from 'date-fns'
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
import { invariant } from 'utils/invariant'
import {
  ReportedDay,
  ReportedDays,
  TimeEntryViewModel,
} from '../components/ReportedDays'
import { TimeEntriesHeader } from '../components/TimeEntriesHeader'

function createViewTimeEntry(timeEntry: InactiveTimeEntry): TimeEntryViewModel {
  return {
    id: timeEntry.id,
    description: timeEntry.description,
    billable: timeEntry.billable,
    project: {
      name: timeEntry.project.name,
      color: timeEntry.project.color,
      clientName: timeEntry.project.clientName || undefined,
    },
    task: timeEntry.task?.name || undefined,
    start: new Date(timeEntry.timeInterval.start),
    end: new Date(timeEntry.timeInterval.end),
    duration: pipe(timeEntry, timeEntryDuration),
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
        ),
        data: pipe(
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
      const weekTotalDuration = pipe(
        weekTimeEnties,
        calculateTimeEntriesTotalDuration,
      )
      const reportedDays = getReportedDays(inactiveTimeEntries)
      return (
        <div
          css={`
            min-height: 100%;
            background: var(--neutral1);
          `}
        >
          <TimeEntriesHeader weekTotalDuration={weekTotalDuration} />
          <ReportedDays reportedDays={reportedDays} />
        </div>
      )
  }
}
