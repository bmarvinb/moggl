import { z } from 'zod';

export const membershipTypeScheme = z.enum(['PROJECT', 'WORKSPACE']);

export type MembershipTypeDto = z.infer<typeof membershipTypeScheme>;
