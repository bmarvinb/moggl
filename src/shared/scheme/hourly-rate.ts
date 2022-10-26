import { z } from 'zod';

export const hourlyRateSchema = z.object({
  amount: z.number(),
  currency: z.string().nullable(),
});
