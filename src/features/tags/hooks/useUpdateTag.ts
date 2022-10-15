import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClientError } from 'common/utils/api-client';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { Tag, UpdateTagRequestData } from 'features/tags/models/tags';
import { updateTag } from 'features/tags/services/tags-api';

export function useUpdateTag(tagId: string) {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation<Tag, ApiClientError, UpdateTagRequestData>(
    data => {
      return updateTag(workspace.id, tagId, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tags']);
      },
    },
  );
}
