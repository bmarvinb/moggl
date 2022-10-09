import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { UpdateTagRequestData } from 'features/tags/models/tags';
import { updateTag } from 'features/tags/services/tags-api';

export function useUpdateTag(tagId: string) {
  const userInfo = useAuthorizedUserInfo();
  return useMutation((data: UpdateTagRequestData) => {
    return updateTag(userInfo.workspace.id, tagId, data);
  });
}
