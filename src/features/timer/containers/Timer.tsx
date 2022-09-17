import { zodResolver } from '@hookform/resolvers/zod'
import { InlineInput } from 'components/Input'
import { TimerControls } from 'features/timer/components/TimerControls'
import { useActiveDuration } from 'features/timer/hooks/useActiveDuration'
import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'styled-components/macro'
import { z } from 'zod'

export type TimerProps = {
  activeTimeEntry: ActiveTimeEntry | undefined
}

const schema = z.object({
  start: z.string(),
  billable: z.boolean(),
  description: z.string(),
  projectId: z.string().min(1),
  taskId: z.string(),
  end: z.string().nullable(),
  tagIds: z.array(z.string()).nullable(),
  customFields: z
    .array(z.object({ customFieldId: z.string(), value: z.string() }))
    .nullable(),
})

type FormValues = z.infer<typeof schema>

export const Timer: FC<TimerProps> = props => {
  const duration = useActiveDuration(props.activeTimeEntry)

  const onStartClicked = () => {
    console.log('start')
  }

  const onStopClicked = () => {
    console.log('end')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      start: '',
      billable: false,
      description: props.activeTimeEntry
        ? props.activeTimeEntry.description
        : '',
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
        padding: 1rem 1rem;
        box-shadow: var(--shadowMd);
        background: var(--neutral0);
        z-index: 1;
      `}
    >
      <div
        css={`
          flex: 1;
          margin-right: 1rem;
        `}
      >
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
          duration={duration}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
        />
      </div>
    </div>
  )
}
