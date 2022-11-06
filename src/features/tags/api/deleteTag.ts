import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { client } from 'utils/api-client';

function deleteTag(workspaceId: string, tagId: string) {
  return client(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'DELETE',
  });
}

export function useDeleteTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation(() => deleteTag(workspace.id, tagId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
  });
}
