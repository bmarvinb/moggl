import { client, createURLSearchParams } from 'common/utils/api-client';
import { Projects, projectsSchema } from 'features/projects/models/projects';

export type ProjectRequestOptions = {
  hydrated?: boolean;
};

export function getProjects(
  workspaceId: string,
  options: ProjectRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return client<Projects>(`workspaces/${workspaceId}/projects?${params}`, {
    schema: projectsSchema,
  });
}
