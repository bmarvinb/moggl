import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { getTags } from '../api/tag-api';
import { TagsSearchCriteria } from '../types';
import { toTag } from '../utils';

export function useGetTags(criteria: TagsSearchCriteria = {}) {
  const workspace = useWorkspace();
  return useQuery(
    ['tags', criteria],
    ({ signal }) =>
      getTags(workspace.id, criteria, signal).then(data => data.map(toTag)),
    {
      keepPreviousData: true,
    },
  );
}
