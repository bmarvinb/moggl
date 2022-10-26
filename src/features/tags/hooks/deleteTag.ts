import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { deleteTag } from 'features/tags/services/tags-api';

export function useDeleteTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation(() => deleteTag(workspace.id, tagId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
  });
}
