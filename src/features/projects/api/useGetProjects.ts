import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'utils/url-params';
import { z } from 'zod';
import {
  ProjectDTO,
  ProjectRequestOptions,
  projectSchema,
} from './project-dtos';

export function getAllProjects(
  workspaceId: string,
  options: ProjectRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return fetch<ProjectDTO[]>(`workspaces/${workspaceId}/projects?${params}`, {
    schema: z.array(projectSchema),
  });
}

export function useGetProjects() {
  const workspace = useWorkspace();
  return useQuery(['projects'], () =>
    getAllProjects(workspace.id, { hydrated: false }),
  );
}
