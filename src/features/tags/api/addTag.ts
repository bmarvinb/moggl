import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { fetch, HttpError } from 'lib/fetch';
import { TagDTO, tagSchema } from '../dtos';

export type AddTagDTO = {
  name: string;
};

function addTag(workspaceId: string, data: AddTagDTO) {
  return fetch<TagDTO>(`workspaces/${workspaceId}/tags`, {
    schema: tagSchema,
    data,
  });
}

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<TagDTO, HttpError, AddTagDTO>(
    data => addTag(workspace.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
