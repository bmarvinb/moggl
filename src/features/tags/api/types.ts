import { z } from 'zod';

export const tagSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    workspaceId: z.string(),
    archived: z.boolean(),
  })
  .strict();

export type TagDto = z.infer<typeof tagSchema>;

export type UpdateTagDto = { name: string; archived?: boolean };

export type AddTagDto = {
  name: string;
};
