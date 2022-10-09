import { client, createURLSearchParams } from 'common/utils/api-client';
import {
  AddClientRequestData,
  ClientRequestOptions,
  Clients,
  clientSchema,
  clientsSchema,
  NewClient,
} from 'features/clients/models/clients';

export function getAllClients(
  workspaceId: string,
  options: ClientRequestOptions = {},
) {
  const params = createURLSearchParams({ ...options });
  return client<Clients>(`workspaces/${workspaceId}/clients?${params}`, {
    schema: clientsSchema,
  });
}

export function addClient(workspaceId: string, data: AddClientRequestData) {
  return client<NewClient>(`workspaces/${workspaceId}/clients`, {
    schema: clientSchema,
    data,
  });
}
