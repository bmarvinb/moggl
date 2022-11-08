import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { AddTagDTO, TagDTO, tagSchema } from './tag-dtos';

function addTag(workspaceId: string, data: AddTagDTO) {
  return fetch<TagDTO>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

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