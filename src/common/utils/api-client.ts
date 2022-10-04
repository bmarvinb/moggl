import { env, isProduction } from 'common/utils/env';
import { ZodType } from 'zod';

export type ClientConfig<Response> = {
  data?: unknown;
  token?: string;
  headers?: HeadersInit;
  schema?: ZodType<Response>;
} & RequestInit;

export async function client<Response = unknown>(
  endpoint: string,
  {
    data,
    schema,
    headers: customHeaders,
    ...customConfig
  }: ClientConfig<Response> = {},
): Promise<Response> {
  return fetch(`${env.REACT_APP_API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': env.REACT_APP_API_KEY || '',
      ...customHeaders,
    },
    ...customConfig,
  }).then(async res => {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json().then(json => {
      if (!schema) {
        return json;
      }
      return schema.safeParseAsync(json).then(result => {
        if (result.success) {
          return result.data;
        }
        if (!isProduction()) {
          console.error(result.error.message);
        }
        return Promise.reject(result.error.message);
      });
    });
  });
}

export function createURLSearchParams(
  options: Record<string, string | boolean | number>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString());
  }
  return params;
}
