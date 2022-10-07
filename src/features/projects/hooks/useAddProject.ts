import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { AddProjectRequestData } from 'features/projects/models/projects';
import { addProject } from 'features/projects/services/projects-api';

export function useAddProject() {
  const userInfo = useAuthorizedUserInfo();
  return useMutation((data: AddProjectRequestData) => {
    return addProject(userInfo.workspace.id, data);
  });
}
