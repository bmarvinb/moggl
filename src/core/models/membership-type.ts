import { z } from 'zod';

export const membershipTypeScheme = z.enum(['PROJECT', 'WORKSPACE']);
