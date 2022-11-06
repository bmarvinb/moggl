import { client } from 'utils/api-client';
import { User, userSchema } from 'features/auth/services/user';
import { Workspace, workspacesSchema } from 'features/auth/services/workspace';

export function user() {
  return client<User>('user', { schema: userSchema });
}

export function userWorkspaces() {
  return client<Workspace[]>('workspaces', {
    schema: workspacesSchema,
  });
}
