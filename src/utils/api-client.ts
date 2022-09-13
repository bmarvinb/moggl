import { env, isProduction } from 'utils/env'
import { ZodType } from 'zod'

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export async function client<Response>(
  endpoint: string,
  schema: ZodType<Response>,
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
        if (result.success) {
          return result.data
        }
        const { message } = result.error
        if (!isProduction()) {
          console.error(message)
        } else {
          // TODO: Production logger
        }
        return Promise.reject(message)
      }),
    )
  })
}

export function createURLSearchParams(options: {
  [key: string]: string | boolean | number
}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString())
  }
  return params
}
