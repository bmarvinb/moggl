import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { UpdateTagRequestData } from 'features/tags/models/tags';
import { updateTag } from 'features/tags/services/tags-api';

export function useUpdateTag(tagId: string) {
  const workspace = useWorkspace();
  return useMutation((data: UpdateTagRequestData) => {
    return updateTag(workspace.id, tagId, data);
  });
}
