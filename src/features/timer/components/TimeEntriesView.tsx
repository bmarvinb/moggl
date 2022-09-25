import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays'
import { WeekLength } from 'features/timer/components/WeekLength'
import { Timer } from 'features/timer/containers/Timer'
import { useActiveTimeEntryDuration as useTimeEntryDuration } from 'features/timer/hooks/useActiveTimeEntryDuration'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
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
        <WeekLength
          activeTimeEntry={props.activeTimeEntry}
          timeEntryDuration={timeEntryDuration}
          weekDuration={props.weekDuration}
        />
        <ReportedDays
          activeTimeEntry={props.activeTimeEntry}
          activeTimeEntryDuration={timeEntryDuration}
          reportedDays={props.reportedDays}
        />
      </div>
    </div>
  )
}
