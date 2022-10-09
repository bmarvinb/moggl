import { client, createURLSearchParams } from 'common/utils/api-client';
import {
  AddTagRequestData,
  Tag,
  Tags,
  tagSchema,
  TagsRequestOptions,
  tagsSchema,
} from 'features/tags/models/tags';

export function getAllTags(
  workspaceId: string,
  options: TagsRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return client<Tags>(`workspaces/${workspaceId}/tags?${params}`, {
    schema: tagsSchema,
  });
}

export function addTag(workspaceId: string, data: AddTagRequestData) {
  return client<Tag>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

export function updateTag(
  workspaceId: string,
  tagId: string,
  data: AddTagRequestData,
) {
  return client<Tag>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}
