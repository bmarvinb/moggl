import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { AddProjectDto, ProjectDto, projectSchema } from './types';

export function addProject(workspaceId: string, data: AddProjectDto) {
  return fetch<ProjectDto>(`workspaces/${workspaceId}/projects`, {
    schema: projectSchema,
    data,
  });
}

export function useAddProject() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<unknown, string, AddProjectDto>((data: AddProjectDto) => {
    return addProject(workspace.id, data).then(() => {
      queryClient.invalidateQueries(['projects']);
    });
  });
}
