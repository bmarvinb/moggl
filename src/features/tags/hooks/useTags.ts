import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { TagsSearchCriteria } from 'features/tags/models/tags';
import { getAllTags } from 'features/tags/services/tags-api';

export function useTags(criteria: TagsSearchCriteria = {}) {
  const workspace = useWorkspace();
  return useQuery(
    ['tags', criteria],
    () => getAllTags(workspace.id, criteria),
    { keepPreviousData: true, staleTime: 5000 },
  );
}
