import { z } from 'zod';

export const tagSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    workspaceId: z.string(),
    archived: z.boolean(),
  })
  .strict();

export const tagsSchema = z.array(tagSchema);

export type TagDTO = z.infer<typeof tagSchema>;
