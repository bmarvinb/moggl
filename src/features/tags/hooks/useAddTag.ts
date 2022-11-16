import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { addTag } from '../api';
import { AddTagDto, TagDto } from '../api/types';

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDto, string, AddTagDto>(
    data => addTag(workspace.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
