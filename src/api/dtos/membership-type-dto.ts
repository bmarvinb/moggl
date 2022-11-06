import { z } from 'zod';

export const membershipTypeScheme = z.enum(['PROJECT', 'WORKSPACE']);

export type MembershipTypeDTO = z.infer<typeof membershipTypeScheme>;
