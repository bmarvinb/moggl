import { hourlyRateSchema } from 'shared/dtos/hourly-rate-dto';
import { membershipTypeScheme } from 'shared/dtos/membership-type-dto';
import { statusSchema } from 'shared/dtos/status-dto';
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
