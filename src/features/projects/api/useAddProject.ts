import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { AddProjectDto, ProjectDto, projectSchema } from './project-dtos';

export function addProject(workspaceId: string, data: AddProjectDto) {
  return fetch<ProjectDto>(`workspaces/${workspaceId}/projects`, {
    schema: projectSchema,
    data,
  });
}

export function useAddProject() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation((data: AddProjectDto) => {
    return addProject(workspace.id, data).then(() => {
      queryClient.invalidateQueries(['projects']);
    });
  });
}
