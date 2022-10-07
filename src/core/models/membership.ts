import { hourlyRateSchema } from 'core/models/hourly-rate';
import { membershipTypeScheme } from 'core/models/membership-type';
import { statusSchema } from 'core/models/status';
import { z } from 'zod';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});
