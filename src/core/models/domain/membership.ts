import { hourlyRateSchema } from 'core/models/domain/hourly-rate';
import { membershipTypeScheme } from 'core/models/domain/membership-type';
import { statusSchema } from 'core/models/domain/status';
import { z } from 'zod';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});
