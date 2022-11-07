import { createURLSearchParams } from 'common/utils/url-params';
import { API_KEY, API_URL } from 'config';
import { z, ZodType } from 'zod';

type ClientConfig<Response> = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  token?: string;
  headers?: HeadersInit;
  schema?: ZodType<Response>;
  params?: Record<string, string | boolean | number>;
} & RequestInit;

const httpErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export async function fetch<Response = unknown>(
  endpoint: string,
  {
    data,
    schema,
    headers: customHeaders,
    ...customConfig
  }: ClientConfig<Response> = {},
): Promise<Response> {
  const config: ClientConfig<Response> = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      ...customHeaders,
    },
    ...customConfig,
  };
  const res = await window.fetch(`${API_URL}/${endpoint}`, config);
  if (!res.ok) {
    const error = await res.json();
    return Promise.reject(httpErrorSchema.parse(error).message);
  }
  const result = await res.json();
  return schema
    ? Promise.resolve(schema.parse(result))
    : Promise.resolve(result);
}
