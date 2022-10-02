import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Box } from 'components/Box'
import { Input } from 'components/Input'
import { TimerControls } from 'features/timer/components/TimerControls'
import { TimerMode } from 'features/timer/machines/timerMachine'
import { CreateTimeEntryPayload } from 'features/timer/services/created-time-entry'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { createTimeEntry } from 'features/timer/services/time-entries-api'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type TimerProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>
  timeEntryDuration: O.Option<number>
  workspaceId: string
  mode: TimerMode
  onStart: () => void
  onStop: () => void
  onTimerModeChanged: () => void
  onAddTimeEntryClicked: () => void
}

const schema = z.object({
  start: z.string(),
  billable: z.boolean(),
  description: z.string(),
  projectId: z.string().min(1),
  taskId: z.string().nullable(),
  end: z.string().nullable(),
  tagIds: z.array(z.string()).nullable(),
  customFields: z.array(
    z.object({ customFieldId: z.string(), value: z.string() }),
  ),
})

type FormValues = z.infer<typeof schema>

export const Timer: FC<TimerProps> = props => {
  const create = useMutation(
    (payload: CreateTimeEntryPayload) => {
      return createTimeEntry(props.workspaceId, payload)
    },
    {
      onMutate: () => {
        props.onStart()
      },
      onError: () => {
        props.onStop()
      },
      onSettled: () => {},
    },
  )

  const onStartClicked = () => {
    create.mutate({
      start: new Date().toISOString(),
      billable: false,
      description: 'Test',
      projectId: undefined,
      taskId: undefined,
      end: undefined,
      tagIds: undefined,
      customFields: [],
    })
  }

  const onStopClicked = () => {
    props.onStop()
  }

  const { register } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      start: '',
      billable: false,
      description: pipe(
        props.activeTimeEntry,
        O.map(({ description }) => description),
        O.getOrElse(() => ''),
      ),
      projectId: '',
    },
  })

  return (
    <Box
      css={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '0.75rem 1rem',
        boxShadow: '$md',
        background: '$timerBg',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div>
        <Input
          variant={'inline'}
          css={{
            width: '100%',
          }}
          placeholder={
            props.mode === TimerMode.Timer
              ? 'What are you working on?'
              : 'What have you done?'
          }
          {...register('description')}
        />
      </div>
      <div>
        <TimerControls
          duration={props.timeEntryDuration}
          mode={props.mode}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
          onTimerModeChanged={props.onTimerModeChanged}
          onAddTimeEntryClicked={props.onAddTimeEntryClicked}
        />
      </div>
    </Box>
  )
}
