import { z } from 'zod';

export type TagsRequestOptions = {
  archived?: boolean;
  name?: string;
  page?: number;
  'page-size'?: number;
};

export type AddTagRequestData = {
  name: string;
};

export type UpdateTagRequestData = AddTagRequestData & { archived?: boolean };

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
