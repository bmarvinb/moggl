import { client } from 'common/utils/api-client';
import { User, userSchema } from 'features/auth/services/user';
import { Workspace, workspacesSchema } from 'features/auth/services/workspace';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

export function user() {
  return client<User>('user', { schema: userSchema });
}

export function userWorkspaces() {
  return client<NonEmptyArray<Workspace>>('workspaces', {
    schema: workspacesSchema,
  });
}
