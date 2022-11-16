import { createURLSearchParams } from 'common/utils/url-params';
import { fetch } from 'lib/fetch';
import { z } from 'zod';
import { TagsSearchCriteria } from '../types';
import { AddTagDto, TagDto, tagSchema } from './types';

export function addTag(workspaceId: string, data: AddTagDto) {
  return fetch<TagDto>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

export function deleteTag(workspaceId: string, tagId: string) {
  return fetch(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'DELETE',
  });
}

export function getTags(
  workspaceId: string,
  criteria: TagsSearchCriteria = {},
  signal?: AbortSignal,
) {
  const params = createURLSearchParams({ ...criteria });
  return fetch(`workspaces/${workspaceId}/tags?${params}`, {
    schema: z.array(tagSchema),
    signal,
    params: criteria,
  });
}
