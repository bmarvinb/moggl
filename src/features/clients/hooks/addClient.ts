import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { AddClientRequestData } from 'features/clients/models/clients';
import { addClient } from 'features/clients/services/clients-api';

export function useAddClient() {
  const workspace = useWorkspace();
  return useMutation((data: AddClientRequestData) => {
    return addClient(workspace.id, data);
  });
}
