import { useQuery } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { getAllTags } from 'features/tags/services/tags-api';

export function useTags() {
  const userInfo = useAuthorizedUserInfo();
  return useQuery(['tags'], () => getAllTags(userInfo.workspace.id));
}
