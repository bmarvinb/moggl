import { z } from 'zod';

export const statusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export type StatusDTO = z.infer<typeof statusSchema>;
