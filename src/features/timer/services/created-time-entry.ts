import { activeTimeEntryIntervalSchema } from 'features/timer/services/time-entries';
import { z } from 'zod';

export const createdTimeEntrySchema = z.object({
  billable: z.boolean(),
  description: z.string(),
  id: z.string(),
  isLocked: z.boolean(),
  projectId: z.string().nullable(),
  tagIds: z.array(z.string()).nullable(),
  taskId: z.string().nullable(),
  timeInterval: activeTimeEntryIntervalSchema,
  userId: z.string(),
  workspaceId: z.string(),
  customFieldValues: z
    .array(
      z.object({
        customFieldId: z.string(),
        timeEntryId: z.string(),
        value: z.string(),
        name: z.string(),
        type: z.string(),
      }),
    )
    .nullable(),
});

export type CreatedTimeEntry = z.infer<typeof createdTimeEntrySchema>;

export type CreateTimeEntryPayload = {
  start: string;
  billable: boolean;
  description: string;
  projectId: string | undefined;
  taskId: string | undefined;
  end: string | undefined;
  tagIds: string[] | undefined;
  customFields: { customFieldId: string; value: string }[];
};
