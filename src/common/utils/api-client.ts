import { env, isProduction } from 'common/utils/env';
import { SafeParseError, ZodError, ZodType } from 'zod';

type ClientConfig<Response> = {
  data?: unknown;
  token?: string;
  headers?: HeadersInit;
  schema?: ZodType<Response>;
} & RequestInit;

enum ApiClientErrorType {
  Api = 'Api',
  Schema = 'Schema',
}

function apiError(message: string, code: number): ApiClientError {
  return {
    type: ApiClientErrorType.Api,
    message: message,
    code: code,
  };
}

function schemaError<T>(result: SafeParseError<T>): ApiClientError {
  return {
    type: ApiClientErrorType.Schema,
    message: result.error.message,
    errors: result.error,
  };
}

export type ApiClientError =
  | { type: ApiClientErrorType.Api; message: string; code: number }
  | { type: ApiClientErrorType.Schema; message: string; errors: ZodError };

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
      'X-Api-Key': env.REACT_APP_API_KEY,
      ...customHeaders,
    },
    ...customConfig,
  }).then(async res => {
    if (!res.ok) {
      const { message, code } = await res.json();
      return Promise.reject(apiError(message, code));
    }
    const json = await res.json();
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
