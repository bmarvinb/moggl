import { useQuery } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { getAllClients } from 'features/clients/services/clients-api';

export function useClients() {
  const userInfo = useAuthorizedUserInfo();
  return useQuery(['clients'], () => getAllClients(userInfo.workspace.id));
}
