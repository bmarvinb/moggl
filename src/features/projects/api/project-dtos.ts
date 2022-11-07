import { estimateSchema } from 'common/dtos/estimate-dto';
import { hourlyRateSchema } from 'common/dtos/hourly-rate-dto';
import { membershipSchema } from 'common/dtos/membership-dto';
import { timeEstimateSchema } from 'common/dtos/time-estimate-dto';
import { z } from 'zod';

export type ProjectRequestOptions = {
  hydrated?: boolean;
};

export type AddProjectRequestData = {
  name: string;
  clientId: string;
  color: string;
  isPublic: boolean;
};

export const projectSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    hourlyRate: hourlyRateSchema,
    clientId: z.string(),
    clientName: z.string(),
    workspaceId: z.string(),
    billable: z.boolean(),
    memberships: z.array(membershipSchema),
    color: z.string(),
    estimate: estimateSchema,
    archived: z.boolean(),
    note: z.string(),
    duration: z.string(),
    costRate: z.unknown().nullable(),
    timeEstimate: timeEstimateSchema,
    budgetEstimate: timeEstimateSchema.nullable(),
    public: z.boolean(),
    template: z.boolean(),
  })
  .strict();

export type ProjectDTO = z.infer<typeof projectSchema>;
