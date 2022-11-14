import { z } from 'zod';

export const customFieldSchema = z.object({
  customFieldId: z.string(),
  name: z.string(),
  type: z.string(),
  value: z.string(),
  status: z.enum(['VISIBLE', 'INVISIBLE']),
});

export type CustomFieldDto = z.infer<typeof customFieldSchema>;
