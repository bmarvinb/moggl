import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays'
import { WeekLength } from 'features/timer/components/WeekLength'
import { Timer } from 'features/timer/containers/Timer'
import { useActiveDuration } from 'features/timer/hooks/useActiveDuration'
import { ActiveTimeEntry } from 'features/timer/types/time-entries'
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
  const duration = useActiveDuration(props.activeTimeEntry)
  return (
    <div
      css={`
        background: var(--neutral1);
      `}
    >
      <Timer
        activeTimeEntry={props.activeTimeEntry}
        duration={duration}
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
          duration={duration}
          weekDuration={props.weekDuration}
        />
        <ReportedDays
          activeTimeEntry={props.activeTimeEntry}
          duration={duration}
          reportedDays={props.reportedDays}
        />
      </div>
    </div>
  )
}
