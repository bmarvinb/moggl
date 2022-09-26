import { User, userSchema } from 'auth/services/user'
import { Workspaces, workspacesSchema } from 'auth/services/workspace'
import { client } from 'utils/api-client'

export function user() {
  return client<User>('user', userSchema)
}

export function userWorkspaces() {
  return client<Workspaces>('workspaces', workspacesSchema)
}
