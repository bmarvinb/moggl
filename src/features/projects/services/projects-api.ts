import { fetch } from 'lib/fetch';
import { createURLSearchParams } from 'utils/url-params';
import {
  AddProjectRequestData,
  Project,
  ProjectRequestOptions,
  Projects,
  projectSchema,
  projectsSchema,
} from '../models/projects';

export function getAllProjects(
  workspaceId: string,
  options: ProjectRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return fetch<Projects>(`workspaces/${workspaceId}/projects?${params}`, {
    schema: projectsSchema,
  });
}

export function addProject(workspaceId: string, data: AddProjectRequestData) {
  return fetch<Project>(`workspaces/${workspaceId}/projects`, {
    schema: projectSchema,
    data,
  });
}
