import { client } from 'shared/utils/api-client';
import { createURLSearchParams } from 'shared/utils/url-params';
import {
  AddTagDTO,
  Tag,
  Tags,
  tagSchema,
  TagsSearchCriteria,
  tagsSchema,
  UpdateTagDTO,
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

export function addTag(workspaceId: string, data: AddTagDTO) {
  return client<Tag>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

export function updateTag(
  workspaceId: string,
  tagId: string,
  data: UpdateTagDTO,
) {
  return client<Tag>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}

export function deleteTag(workspaceId: string, tagId: string) {
  return client(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'DELETE',
  });
}
