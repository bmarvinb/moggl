import { z } from 'zod';

export const timeEstimateSchema = z.object({
  estimate: z.string(),
  type: z.enum(['AUTO']),
  resetOption: z.unknown(),
  active: z.boolean(),
  includeNonBillable: z.boolean(),
});

export type TimeEstimateDto = z.infer<typeof timeEstimateSchema>;
