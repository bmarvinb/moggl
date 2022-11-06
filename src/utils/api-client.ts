import { API_KEY, API_URL } from 'config';
import { isProduction } from 'utils/env';
import { SafeParseError, ZodError, ZodType } from 'zod';

type ClientConfig<Response> = {
  data?: unknown;
  token?: string;
  headers?: HeadersInit;
  schema?: ZodType<Response>;
} & RequestInit;

function apiError(message: string, code: number): ApiClientResponseError {
  return {
    type: 'HttpResponseError',
    message: message,
    code: code,
  };
}

function schemaError<T>(result: SafeParseError<T>): ApiClientResponseError {
  return {
    type: 'SchemaValidationError',
    message: result.error.message,
    errors: result.error,
  };
}

export type ApiClientResponseError =
  | { type: 'HttpResponseError'; message: string; code: number }
  | { type: 'SchemaValidationError'; message: string; errors: ZodError };

export async function client<Response = unknown>(
  endpoint: string,
  {
    data,
    schema,
    headers: customHeaders,
    ...customConfig
  }: ClientConfig<Response> = {},
): Promise<Response> {
  return fetch(`${API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      ...customHeaders,
    },
    ...customConfig,
  }).then(async res => {
    if (!res.ok) {
      const { message, code } = await res.json();
      return Promise.reject(apiError(message, code));
    }
    const text = await res.text();
    if (!text) {
      return {};
    }
    const json = JSON.parse(text);
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
      return Promise.reject(schemaError<Response>(result));
    });
  });
}
