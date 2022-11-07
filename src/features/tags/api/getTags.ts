import { useQuery } from '@tanstack/react-query';
import { createURLSearchParams } from 'common/utils/url-params';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { z } from 'zod';
import { toTag } from '../utils';
import { tagSchema } from './tag-dtos';

type TagsSearchCriteria = {
  archived?: string;
  name?: string;
  page?: string;
  'page-size'?: string;
};

function getTags(
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

export function useGetTags(criteria: TagsSearchCriteria = {}) {
  console.log('criteria', criteria);

  const workspace = useWorkspace();
  return useQuery(
    ['tags'],
    ({ signal }) =>
      getTags(workspace.id, criteria, signal).then(data => data.map(toTag)),
    {
      keepPreviousData: true,
    },
  );
}
