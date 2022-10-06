import { useQuery } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { getProjects } from 'features/projects/services/projects-api';

export function useProjects() {
  const userInfo = useAuthorizedUserInfo();
  return useQuery(['projects'], () =>
    getProjects(userInfo.workspace.id, { hydrated: false }),
  );
}
