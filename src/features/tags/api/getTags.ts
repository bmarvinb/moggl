import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'utils/url-params';
import { z } from 'zod';
import { TagDTO, tagsSchema } from '../dtos';
import { toTag } from '../utils';

const tagsRequestOptionsSchema = z.object({
  archived: z.string().optional(),
  name: z.string().optional(),
  page: z.string().optional(),
  'page-size': z.string().optional(),
});

export type TagsSearchCriteria = z.infer<typeof tagsRequestOptionsSchema>;

function getTags(workspaceId: string, criteria: TagsSearchCriteria = {}) {
  const params = createURLSearchParams({ ...criteria });
  return fetch<TagDTO[]>(`workspaces/${workspaceId}/tags?${params}`, {
    schema: tagsSchema,
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
