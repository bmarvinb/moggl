import { useQuery } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { TagsSearchCriteria } from 'features/tags/models/tags';
import { getAllTags } from 'features/tags/services/tags-api';

export function useTags(criteria: TagsSearchCriteria = {}) {
  const userInfo = useAuthorizedUserInfo();
  return useQuery(
    ['tags', criteria],
    () => getAllTags(userInfo.workspace.id, criteria),
    { keepPreviousData: true, staleTime: 5000 },
  );
}
