import { client } from 'common/utils/api-client';
import { createURLSearchParams } from 'common/utils/url-params';
import {
  AddTagRequestData,
  Tag,
  Tags,
  tagSchema,
  TagsSearchCriteria,
  tagsSchema,
  UpdateTagRequestData,
} from 'features/tags/models/tags';

export function getAllTags(
  workspaceId: string,
  criteria: TagsSearchCriteria = {},
) {
  const params = createURLSearchParams({ ...criteria });
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
  data: UpdateTagRequestData,
) {
  return client<Tag>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}