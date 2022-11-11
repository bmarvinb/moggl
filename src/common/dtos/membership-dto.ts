import { z } from 'zod';
import { hourlyRateSchema } from './hourly-rate-dto';
import { membershipTypeScheme } from './membership-type-dto';
import { statusSchema } from './status-dto';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});

export type MembershipDTO = z.infer<typeof membershipSchema>;
