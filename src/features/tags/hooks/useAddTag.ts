import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { addTag } from '../api/tag-api';
import { AddTagDTO, TagDTO } from '../api/tag-dtos';

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDTO, string, AddTagDTO>(
    data => addTag(workspace.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
