import { useQuery } from '@tanstack/react-query'
import { User } from 'auth/services/user'
import { Workspace } from 'auth/services/workspace'
import { Spinner } from 'components'
import { format, isSameWeek } from 'date-fns'
import { isSameDay } from 'date-fns/fp'
import {
  createTimeEntryViewModel,
  ReportedDay,
} from 'features/timer/components/ReportedDays'
import { TimeEntriesView } from 'features/timer/components/TimeEntriesView'
import { getTimeEntries } from 'features/timer/services/time-entries-api'
import { InactiveTimeEntry } from 'features/timer/services/time-entries'
import {
  isActiveTimeEntry,
  isInactiveTimeEntry,
  timeEntryDuration,
} from 'features/timer/utils/time-entries-utils'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import * as M from 'fp-ts/lib/Monoid'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import { nanoid } from 'nanoid'
import { FC } from 'react'

export type TimeEntriesProps = {
  user: User
  workspace: Workspace
}

function getTotalDuration(timeEntries: InactiveTimeEntry[]): number {
  return pipe(timeEntries, A.map(timeEntryDuration), M.concatAll(N.MonoidSum))
}

function getStartDates(timeEntry: InactiveTimeEntry[]): string[] {
  return pipe(
    timeEntry,
    A.map(({ timeInterval }) => format(new Date(timeInterval.start), 'PP')),
  )
}

function groupByDate(timeEntries: InactiveTimeEntry[]) {
  return (dates: string[]): ReportedDay[] =>
    pipe(
      dates,
      A.map(date => {
        const dayTimeEntries = timeEntries.filter(({ timeInterval }) =>
          isSameDay(new Date(timeInterval.start), new Date(date)),
        )
        return {
          id: nanoid(),
          date: new Date(date),
          reportedDuration: pipe(dayTimeEntries, getTotalDuration),
          data: pipe(dayTimeEntries, A.map(createTimeEntryViewModel)),
        }
      }),
    )
}

function getReportedDays(timeEntries: InactiveTimeEntry[]): ReportedDay[] {
  return pipe(
    timeEntries,
    getStartDates,
    A.uniq(S.Eq),
    groupByDate(timeEntries),
  )
}

export const TimeEntries: FC<TimeEntriesProps> = props => {
  const { status, data: timeEntries } = useQuery(['timeEntries'], () =>
    getTimeEntries(props.workspace.id, props.user.id, {
      'page-size': 25,
      page: 1,
    }),
  )

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
      const activeTimeEntry = pipe(
        timeEntries,
        A.filter(isActiveTimeEntry),
        A.lookup(0),
      )
      const weekTimeEntries = pipe(
        inactiveTimeEntries,
        A.filter(({ timeInterval }) =>
          isSameWeek(new Date(timeInterval.start), new Date(), {
            weekStartsOn: 1,
          }),
        ),
      )
      const weekDuration = getTotalDuration(weekTimeEntries)
      const reportedDays = getReportedDays(inactiveTimeEntries)
      return (
        <TimeEntriesView
          activeTimeEntry={activeTimeEntry}
          weekDuration={weekDuration}
          reportedDays={reportedDays}
          workspaceId={props.workspace.id}
        />
      )
  }
}
