import { estimateSchema } from 'shared/scheme/estimate';
import { hourlyRateSchema } from 'shared/scheme/hourly-rate';
import { membershipSchema } from 'shared/scheme/membership';
import { timeEstimateSchema } from 'shared/scheme/time-estimate';
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

export type Project = z.infer<typeof projectSchema>;

export const projectsSchema = z.array(projectSchema);

export type Projects = z.infer<typeof projectsSchema>;
