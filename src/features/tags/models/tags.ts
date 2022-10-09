import { z } from 'zod';

export const tagsRequestOptionsSchema = z.object({
  archived: z.string().optional(),
  name: z.string().optional(),
  page: z.string().optional(),
  'page-size': z.string().optional(),
});

export type TagsSearchCriteria = z.infer<typeof tagsRequestOptionsSchema>;

export type AddTagRequestData = {
  name: string;
};

export type UpdateTagRequestData = { name: string; archived?: boolean };

export const tagSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    workspaceId: z.string(),
    archived: z.boolean(),
  })
  .strict();

export const tagsSchema = z.array(tagSchema);

export type Tag = z.infer<typeof tagSchema>;

export type Tags = z.infer<typeof tagsSchema>;
