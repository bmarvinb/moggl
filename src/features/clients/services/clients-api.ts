import { client } from 'common/utils/api-client';
import { createURLSearchParams } from 'common/utils/url-params';
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
