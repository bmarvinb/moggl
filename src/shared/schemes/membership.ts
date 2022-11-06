import { hourlyRateSchema } from 'shared/schemes/hourly-rate';
import { membershipTypeScheme } from 'shared/schemes/membership-type';
import { statusSchema } from 'shared/schemes/status';
import { z } from 'zod';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});
