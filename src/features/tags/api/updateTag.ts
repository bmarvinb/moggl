import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch, HttpError } from 'lib/fetch';
import { TagDTO, tagSchema } from '../dtos';

type UpdateTagDTO = { name: string; archived?: boolean };

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
  return useMutation<TagDTO, HttpError, UpdateTagDTO>(
    data => updateTag(workspace.id, tagId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
