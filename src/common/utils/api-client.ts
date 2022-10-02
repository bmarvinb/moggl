import { env, isProduction } from 'common/utils/env'
import { ZodType } from 'zod'

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export async function client<T>(
  endpoint: string,
  schema: ZodType<T>,
  { data, headers: customHeaders, ...customConfig }: ClientConfig = {},
) {
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
      console.error(res)
      return Promise.reject(res)
    }
    return res.json().then(data =>
      schema.safeParseAsync(data).then(result => {
        if (!result.success) {
          if (!isProduction()) {
            console.error(result.error.message)
          } else {
            // TODO: Production logger
          }
          return Promise.reject(result.error.message)
        }
        return result.data
      }),
    )
  })
}

export function createURLSearchParams(
  options: Record<string, string | boolean | number>,
) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString())
  }
  return params
}