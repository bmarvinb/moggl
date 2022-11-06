import { z } from 'zod';

export const tagsRequestOptionsSchema = z.object({
  archived: z.string().optional(),
  name: z.string().optional(),
  page: z.string().optional(),
  'page-size': z.string().optional(),
});

export type TagsSearchCriteria = z.infer<typeof tagsRequestOptionsSchema>;

export type AddTagDTO = {
  name: string;
};

export type UpdateTagDTO = { name: string; archived?: boolean };

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

export type TagsDTO = z.infer<typeof tagsSchema>;
