import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'utils/url-params';
import { z } from 'zod';
import { toTag } from '../utils';
import { TagDTO, tagSchema } from './tag-dtos';

type TagsSearchCriteria = {
  archived?: string;
  name?: string;
  page?: string;
  'page-size'?: string;
};

function getTags(workspaceId: string, criteria: TagsSearchCriteria = {}) {
  const params = createURLSearchParams({ ...criteria });
  return fetch<TagDTO[]>(`workspaces/${workspaceId}/tags?${params}`, {
    schema: z.array(tagSchema),
  });
}

export function useGetTags(criteria: TagsSearchCriteria = {}) {
  const workspace = useWorkspace();
  return useQuery(
    ['tags', criteria],
    () => getTags(workspace.id, criteria).then(data => data.map(toTag)),
    {
      keepPreviousData: true,
      staleTime: 5000,
    },
  );
}
