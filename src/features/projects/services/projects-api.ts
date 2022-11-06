import { client } from 'utils/api-client';
import { createURLSearchParams } from 'utils/url-params';
import {
  AddProjectRequestData,
  Project,
  ProjectRequestOptions,
  Projects,
  projectSchema,
  projectsSchema,
} from 'features/projects/models/projects';

export function getAllProjects(
  workspaceId: string,
  options: ProjectRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return client<Projects>(`workspaces/${workspaceId}/projects?${params}`, {
    schema: projectsSchema,
  });
}

export function addProject(workspaceId: string, data: AddProjectRequestData) {
  return client<Project>(`workspaces/${workspaceId}/projects`, {
    schema: projectSchema,
    data,
  });
}
