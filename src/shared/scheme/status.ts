import { z } from 'zod';

export const statusSchema = z.enum(['ACTIVE', 'INACTIVE']);
