import { API_KEY, API_URL } from 'config';
import { z, ZodType } from 'zod';

type ClientConfig<Response> = {
  data?: unknown;
  token?: string;
  headers?: HeadersInit;
  schema?: ZodType<Response>;
} & RequestInit;

const httpErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export type HttpError = z.infer<typeof httpErrorSchema>;

export async function fetch<Response = unknown>(
  endpoint: string,
  {
    data,
    schema,
    headers: customHeaders,
    ...customConfig
  }: ClientConfig<Response> = {},
): Promise<Response> {
  const res = await window.fetch(`${API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      ...customHeaders,
    },
    ...customConfig,
  });
  if (!res.ok) {
    const error = await res.json();
    return Promise.reject(httpErrorSchema.parse(error));
  }
  const json = await res.json();
  if (!schema) {
    return Promise.resolve(json);
  }
  return Promise.resolve(schema.parse(json));
}
