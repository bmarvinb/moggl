import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { deleteTag } from '../api/tag-api';

export function useDeleteTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation(() => deleteTag(workspace.id, tagId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    },
  });
}
