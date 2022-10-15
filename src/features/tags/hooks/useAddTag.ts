import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { AddTagRequestData } from 'features/tags/models/tags';
import { addTag } from 'features/tags/services/tags-api';

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation(
    (data: AddTagRequestData) => {
      return addTag(workspace.id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
