import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { getAllClients } from 'features/clients/services/clients-api';

export function useClients() {
  const workspace = useWorkspace();
  return useQuery(['clients'], () => getAllClients(workspace.id));
}
