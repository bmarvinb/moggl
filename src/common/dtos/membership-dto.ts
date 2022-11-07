import { hourlyRateSchema } from 'common/dtos/hourly-rate-dto';
import { membershipTypeScheme } from 'common/dtos/membership-type-dto';
import { statusSchema } from 'common/dtos/status-dto';
import { z } from 'zod';

export const membershipSchema = z.object({
  userId: z.string(),
  hourlyRate: hourlyRateSchema.nullable(),
  costRate: z.unknown(),
  targetId: z.string(),
  membershipType: membershipTypeScheme,
  membershipStatus: statusSchema,
});

export type MembershipDTO = z.infer<typeof membershipSchema>;
