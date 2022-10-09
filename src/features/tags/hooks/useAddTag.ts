import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { AddTagRequestData } from 'features/tags/models/tags';
import { addTag } from 'features/tags/services/tags-api';

export function useAddTag() {
  const userInfo = useAuthorizedUserInfo();
  return useMutation((data: AddTagRequestData) => {
    return addTag(userInfo.workspace.id, data);
  });
}
