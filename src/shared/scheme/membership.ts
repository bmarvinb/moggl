import { hourlyRateSchema } from 'shared/scheme/hourly-rate';
import { membershipTypeScheme } from 'shared/scheme/membership-type';
import { statusSchema } from 'shared/scheme/status';
import { z } from 'zod';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});
