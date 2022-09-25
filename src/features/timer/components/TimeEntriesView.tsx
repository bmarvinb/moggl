import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays'
import { WeekDuration } from 'features/timer/components/WeekDuration'
import { Timer } from 'features/timer/containers/Timer'
import { useActiveTimeEntryDuration as useTimeEntryDuration } from 'features/timer/hooks/useActiveTimeEntryDuration'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import 'styled-components/macro'

export type TimeEntriesViewProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>
  weekDuration: number
  reportedDays: ReportedDay[]
  workspaceId: string
}

export const TimeEntriesView: FC<TimeEntriesViewProps> = props => {
  const timeEntryDuration = useTimeEntryDuration(props.activeTimeEntry)
  const weekDuration = pipe(
    timeEntryDuration,
    O.map(duration => duration + props.weekDuration),
    O.getOrElse(() => props.weekDuration),
  )
  return (
    <div
      css={`
        background: var(--neutral1);
      `}
    >
      <Timer
        activeTimeEntry={props.activeTimeEntry}
        timeEntryDuration={timeEntryDuration}
        workspaceId={props.workspaceId}
      />
      <div
        css={`
          min-height: 100%;
          padding: 7.5rem 1rem 1rem;
        `}
      >
        <WeekDuration weekDuration={weekDuration} />
        <ReportedDays
          activeTimeEntry={props.activeTimeEntry}
          activeTimeEntryDuration={timeEntryDuration}
          reportedDays={props.reportedDays}
        />
      </div>
    </div>
  )
}
