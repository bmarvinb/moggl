import { hourlyRateSchema } from 'api/dtos/hourly-rate-dto';
import { statusSchema } from 'api/dtos/status-dto';
import { z } from 'zod';

export const taskSchema = z.object({
  assigneeIds: z.array(z.string()),
  estimate: z.string(),
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  billable: z.boolean(),
  hourlyRate: hourlyRateSchema,
  costRate: hourlyRateSchema,
  status: statusSchema,
});

export type Task = z.infer<typeof taskSchema>;

export const tasksSchema = z.array(taskSchema);

export type Tasks = z.infer<typeof tasksSchema>;
