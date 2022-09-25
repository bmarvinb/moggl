import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InlineInput } from 'components/Input'
import { TimerControls } from 'features/timer/components/TimerControls'
import { createTimeEntry } from 'features/timer/services/time-entries-api'
import { CreateTimeEntryPayload } from 'features/timer/services/created-time-entry'
import { ActiveTimeEntry, TimeEntries } from 'features/timer/services/time-entries'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import 'styled-components/macro'
import { z } from 'zod'

export type TimerProps = {
  activeTimeEntry: O.Option<ActiveTimeEntry>
  timeEntryDuration: O.Option<number>
  workspaceId: string
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
  const queryClient = useQueryClient()
  const create = useMutation(
    (payload: CreateTimeEntryPayload) => {
      return createTimeEntry(props.workspaceId, payload)
    },
    {
      onMutate: async timeEntry => {
        const activeTimeEntry: Partial<ActiveTimeEntry> = {
          description: timeEntry.description,
          timeInterval: {
            start: timeEntry.start,
            end: null,
            duration: null,
          },
        }
        await queryClient.cancelQueries(['timeEntries'])
        const previousTimeEntries = queryClient.getQueryData(['timeEntries'])
        queryClient.setQueryData(['timeEntries'], timeEntries => [
          ...(timeEntries as TimeEntries),
          activeTimeEntry,
        ])
        return { previousTimeEntries }
      },
      onError: (_, __, context) => {
        queryClient.setQueryData(['timeEntries'], context!.previousTimeEntries)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['timeEntries'])
      },
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
    console.log('Stop')
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
    <div
      css={`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem;
        box-shadow: var(--shadowMd);
        background: var(--neutral0);
        z-index: 1;
      `}
    >
      <div>
        <InlineInput
          css={`
            width: 100%;
          `}
          placeholder="What are you working on?"
          {...register('description')}
        />
      </div>
      <div>
        <TimerControls
          duration={props.timeEntryDuration}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
        />
      </div>
    </div>
  )
}
