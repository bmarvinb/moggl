import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClientResponseError, client } from 'utils/api-client';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { TagDTO, tagSchema } from 'features/tags/models/tags';

export type AddTagDTO = {
  name: string;
};

function addTag(workspaceId: string, data: AddTagDTO) {
  return client<TagDTO>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDTO, ApiClientResponseError, AddTagDTO>(
    data => addTag(workspace.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
