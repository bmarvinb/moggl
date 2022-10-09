import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { AddClientRequestData } from 'features/clients/models/clients';
import { addClient } from 'features/clients/services/clients-api';

export function useAddClient() {
  const userInfo = useAuthorizedUserInfo();
  return useMutation((data: AddClientRequestData) => {
    return addClient(userInfo.workspace.id, data);
  });
}
