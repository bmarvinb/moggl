import { useUserInfo } from 'features/auth/context/auth-context';
import { Workspace } from 'features/auth/services/workspace';

export function useWorkspace(): Workspace {
  const userInfo = useUserInfo();
  if (!userInfo) {
    throw new Error('Unauthorized user');
  }
  const workspace = userInfo.workspaces.find(
    workspace => workspace.id === userInfo.user.activeWorkspace,
  );
  if (!workspace) {
    throw new Error('Workspace must be provided');
  }
  return workspace;
}
