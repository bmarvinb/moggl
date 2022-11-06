import { fetch } from 'lib/fetch';
import { User, userSchema } from './user';
import { Workspace, workspacesSchema } from './workspace';

export function user() {
  return fetch<User>('user', { schema: userSchema });
}

export function userWorkspaces() {
  return fetch<Workspace[]>('workspaces', {
    schema: workspacesSchema,
  });
}
