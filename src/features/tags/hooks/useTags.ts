import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { getTags } from '../api';
import { TagDto } from '../api/types';
import { Tag, TagsSearchCriteria } from '../types';
import { toTag } from '../utils';

export const tagsQueryKey = 'tags';

export function useTags(criteria: TagsSearchCriteria = {}) {
  const workspace = useWorkspace();
  return useQuery<TagDto[], string, Tag[]>(
    [tagsQueryKey, criteria],
    ({ signal }) => getTags(workspace.id, criteria, signal),
    {
      keepPreviousData: true,
      select: data => data.map(toTag),
    },
  );
}
