import { z } from 'zod';

export type ClientRequestOptions = {
  archived?: boolean;
  name?: string;
  page?: number;
  'page-size'?: number;
  'sort-column'?: 'NAME';
  'sort-order'?: 'ASCENDING' | 'DESCENDING';
};

export type AddClientRequestData = {
  name: string;
  note: string;
};

export const clientSchema = z
  .object({
    id: z.string(),
    address: z.string().nullable(),
    name: z.string(),
    workspaceId: z.string(),
    note: z.string().nullable(),
    archived: z.boolean(),
  })
  .strict();

export const newClientSchema = clientSchema.omit({ archived: true });

export const clientsSchema = z.array(clientSchema);

export type Client = z.infer<typeof clientSchema>;

export type NewClient = z.infer<typeof newClientSchema>;

export type Clients = z.infer<typeof clientsSchema>;
