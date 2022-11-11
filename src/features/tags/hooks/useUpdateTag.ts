import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { TagDTO, tagSchema, UpdateTagDTO } from '../api/tag-dtos';

function updateTag(workspaceId: string, tagId: string, data: UpdateTagDTO) {
  return fetch<TagDTO>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}

export function useUpdateTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDTO, string, UpdateTagDTO>(
    data => updateTag(workspace.id, tagId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
