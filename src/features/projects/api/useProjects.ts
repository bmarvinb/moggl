import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'common/utils/url-params';
import { z } from 'zod';
import {
  ProjectDto,
  ProjectRequestOptions,
  projectSchema,
} from './project-dtos';

export const projectsQueryKey = 'projects';

export function getAllProjects(
  workspaceId: string,
  options: ProjectRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return fetch<ProjectDto[]>(`workspaces/${workspaceId}/projects?${params}`, {
    schema: z.array(projectSchema),
  });
}

export function useProjects() {
  const workspace = useWorkspace();
  return useQuery([projectsQueryKey], () =>
    getAllProjects(workspace.id, { hydrated: false }),
  );
}
