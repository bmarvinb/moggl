import { useMachine } from '@xstate/react'
import { Box } from 'components/Box'
import {
  ReportedDay,
  ReportedDays,
} from 'features/timer/components/ReportedDays'
import { WeekDuration } from 'features/timer/components/WeekDuration'
import { Timer } from 'features/timer/containers/Timer'
import { timerMachine, TimerMode } from 'features/timer/machines/timerMachine'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import * as O from 'fp-ts/lib/Option'
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type TimeEntriesContentProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>
  weekDuration: number
  reportedDays: ReportedDay[]
  workspaceId: string
}

export const TimeEntriesContent: FC<TimeEntriesContentProps> = props => {
  const [state, send] = useMachine(timerMachine)
  const [contentTop, setContentTop] = useState<number>(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return
    }
    const { y } = contentRef.current.getBoundingClientRect()
    setContentTop(y)
  }, [contentRef])

  useEffect(() => {
    if (O.isNone(props.activeTimeEntry)) {
      return
    }
    send('CONTINUE', {
      payload: props.activeTimeEntry.value,
    })
  }, [props.activeTimeEntry, send])

  const activeDuration = state.matches({ timer: 'running' })
    ? O.some(state.context.duration)
    : O.none

  const weekDuration = state.context.duration + props.weekDuration

  const timerMode = state.matches({ mode: 'timer' })
    ? TimerMode.Timer
    : TimerMode.Manual

  return (
    <Box
      css={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Timer
        activeTimeEntry={props.activeTimeEntry}
        timeEntryDuration={activeDuration}
        workspaceId={props.workspaceId}
        mode={timerMode}
        onStart={() => send('START')}
        onStop={() => send('STOP')}
        onTimerModeChanged={() => send('MODE.TOGGLE')}
        onAddTimeEntryClicked={() => console.log('Add time entry')}
      />

      <Box
        ref={contentRef}
        css={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          maxHeight: `calc(100vh - ${contentTop + 1}px)`,
        }}
      >
        <Box
          css={{
            padding: '1rem',
            overflow: 'scroll',
            background: '$neutral2',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <WeekDuration weekDuration={weekDuration} />
          <ReportedDays
            activeTimeEntry={props.activeTimeEntry}
            activeTimeEntryDuration={activeDuration}
            reportedDays={props.reportedDays}
          />
        </Box>
      </Box>
    </Box>
  )
}
