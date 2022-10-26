import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { AddProjectRequestData } from 'features/projects/models/projects';
import { addProject } from 'features/projects/services/projects-api';

export function useAddProject() {
  const workspace = useWorkspace();
  return useMutation((data: AddProjectRequestData) => {
    return addProject(workspace.id, data);
  });
}
