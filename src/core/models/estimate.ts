import { z } from 'zod';

export const estimateSchema = z.object({
  estimate: z.string(),
  type: z.string(),
});
