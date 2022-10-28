import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from 'shared/utils/api-client';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { AddTagRequestData, Tag } from 'features/tags/models/tags';
import { addTag } from 'features/tags/services/tags-api';

export function useAddTag() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<Tag, ApiClientError, AddTagRequestData>(
    data => addTag(workspace.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}