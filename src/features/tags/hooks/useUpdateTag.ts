import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch } from 'lib/fetch';
import { TagDto, tagSchema, UpdateTagDto } from '../api/types';

function updateTag(workspaceId: string, tagId: string, data: UpdateTagDto) {
  return fetch<TagDto>(`workspaces/${workspaceId}/tags/${tagId}`, {
    method: 'PUT',
    schema: tagSchema,
    data,
  });
}

export function useUpdateTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDto, string, UpdateTagDto>(
    data => updateTag(workspace.id, tagId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
