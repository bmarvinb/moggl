import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { AddProjectDTO, ProjectDTO, projectSchema } from './project-dtos';

export function addProject(workspaceId: string, data: AddProjectDTO) {
  return fetch<ProjectDTO>(`workspaces/${workspaceId}/projects`, {
    schema: projectSchema,
    data,
  });
}

export function useAddProject() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation((data: AddProjectDTO) => {
    return addProject(workspace.id, data).then(() => {
      queryClient.invalidateQueries(['projects']);
    });
  });
}
