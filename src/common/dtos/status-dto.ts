import { z } from 'zod';

export const statusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export type StatusDto = z.infer<typeof statusSchema>;
