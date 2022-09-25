import { useMachine } from '@xstate/react'
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays'
import { WeekDuration } from 'features/timer/components/WeekDuration'
import { Timer } from 'features/timer/containers/Timer'
import { timerMachine } from 'features/timer/machines/timerMachine'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import * as O from 'fp-ts/lib/Option'
import { FC, useEffect } from 'react'
import 'styled-components/macro'

export type TimeEntriesViewProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>
  weekDuration: number
  reportedDays: ReportedDay[]
  workspaceId: string
}

export const TimeEntriesView: FC<TimeEntriesViewProps> = props => {
  const [state, send] = useMachine(timerMachine)
  useEffect(() => {
    O.isSome(props.activeTimeEntry) &&
      send('CONTINUE', {
        activeTimeEntry: props.activeTimeEntry.value,
      })
  }, [props.activeTimeEntry, send])

  const activeDuration = state.matches('running')
    ? O.some(state.context.duration)
    : O.none
  const weekDuration = state.context.duration + props.weekDuration
  return (
    <div
      css={`
        background: var(--neutral1);
      `}
    >
      <Timer
        activeTimeEntry={props.activeTimeEntry}
        timeEntryDuration={activeDuration}
        workspaceId={props.workspaceId}
        onStart={() => send('START')}
        onStop={() => send('STOP')}
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
          activeTimeEntryDuration={activeDuration}
          reportedDays={props.reportedDays}
        />
      </div>
    </div>
  )
}
