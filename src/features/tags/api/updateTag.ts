import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClientResponseError, client } from 'utils/api-client';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { TagDTO, tagSchema } from 'features/tags/dtos';

type UpdateTagDTO = { name: string; archived?: boolean };

function updateTag(workspaceId: string, tagId: string, data: UpdateTagDTO) {
  return client<TagDTO>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}

export function useUpdateTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDTO, ApiClientResponseError, UpdateTagDTO>(
    data => updateTag(workspace.id, tagId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
