import { User, userSchema } from 'auth/types/user'
import { Workspaces, workspacesSchema } from 'auth/types/workspace'
import { client } from 'utils/api-client'

export function user() {
  return client<User>('user', userSchema)
}

export function userWorkspaces() {
  return client<Workspaces>('workspaces', workspacesSchema)
}
