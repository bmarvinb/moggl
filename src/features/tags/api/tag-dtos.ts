import { z } from 'zod';

export const tagSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    workspaceId: z.string(),
    archived: z.boolean(),
  })
  .strict();

export type TagDTO = z.infer<typeof tagSchema>;

export type UpdateTagDTO = { name: string; archived?: boolean };

export type AddTagDTO = {
  name: string;
};
