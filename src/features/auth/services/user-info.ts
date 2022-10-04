import { User, userSchema } from 'features/auth/services/user';
import { Workspaces, workspacesSchema } from 'features/auth/services/workspace';
import { client } from 'common/utils/api-client';

export function user() {
  return client<User>('user', { schema: userSchema });
}

export function userWorkspaces() {
  return client<Workspaces>('workspaces', { schema: workspacesSchema });
}
