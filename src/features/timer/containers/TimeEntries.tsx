import { format, isSameWeek } from 'date-fns'
import { isSameDay } from 'date-fns/fp'
import {
  createTimeEntryViewModel,
  ReportedDay,
} from 'features/timer/components/ReportedDays'
import { TimeEntriesLoading } from 'features/timer/components/TimeEntriesLoading'
import { TimeEntriesContent } from 'features/timer/containers/TimeEntriesContent'
import { useTimeEntries } from 'features/timer/hooks/useTimeEntries'
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
import { FC } from 'react'

export type TimeEntriesProps = {}

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
          id: date,
          date: new Date(date),
          reportedDuration: pipe(dayTimeEntries, getTotalDuration),
          data: pipe(dayTimeEntries, A.map(createTimeEntryViewModel)),
        }
      }),
    )
}

export const TimeEntries: FC<TimeEntriesProps> = props => {
  const { status, data: timeEntries } = useTimeEntries()

  switch (status) {
    case 'loading':
      return <TimeEntriesLoading />
    case 'error':
      return <div>Error</div>
    case 'success':
      const inactiveTimeEntries = pipe(
        timeEntries,
        A.filter(isInactiveTimeEntry),
      )
      const activeTimeEntry = pipe(timeEntries, A.findFirst(isActiveTimeEntry))
      const weekDuration = pipe(
        inactiveTimeEntries,
        A.filter(({ timeInterval }) =>
          isSameWeek(new Date(timeInterval.start), new Date(), {
            weekStartsOn: 1,
          }),
        ),
        getTotalDuration,
      )
      const reportedDays = pipe(
        inactiveTimeEntries,
        getStartDates,
        A.uniq(S.Eq),
        groupByDate(inactiveTimeEntries),
      )
      return (
        <TimeEntriesContent
          activeTimeEntry={activeTimeEntry}
          weekDuration={weekDuration}
          reportedDays={reportedDays}
        />
      )
  }
}
